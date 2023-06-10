import axios, { AxiosError } from "axios";
import { DependencyList, useCallback, useEffect, useState } from "react";
import { useUser } from "./user/user.application";

/** API 호출을 위한 기본 설정 초기화 */
export function initApiFetcher() {
  axios.defaults.baseURL = "http://localhost:8080";
}

/** API 호출에 사용되는 헤더 설정 (JWToken) */
export function setDefaultHeader({ accessToken }: { accessToken: string }) {
  axios.defaults.headers.common.Authorization = `${accessToken}`;
}

export enum SortDirection {
  asc = "ASC",
  desc = "DESC",
}
export type PagableRequest = {
  page?: number;
  size?: number;
};
export type SortableRequest<SORT_BY> = {
  sortBy?: SORT_BY;
  sortDir?: SortDirection;
};

function useFetchApi<T, E, ARGS extends Array<unknown>>(fetchAction: (...args: ARGS) => Promise<T>) {
  /** Header Update */
  const currentUser = useUser();

  if (currentUser) {
    setDefaultHeader({ accessToken: currentUser.accessToken });
  }

  /** States */
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<E | null>(null);

  /** 값을 무효화하고 다시 Fetching */
  const invalidate: typeof fetchAction = useCallback(
    (...args) => {
      setLoading(true);
      setError(null);
      setData(undefined);

      const promised = fetchAction(...args);

      promised
        .then((d) => {
          setData(d);
          return d;
        })
        .catch((e: E) => {
          console.error(e);
          setData(undefined);
          setError(e);
        })
        .finally(() => {
          setLoading(false);
        });

      return promised;
    },
    [fetchAction]
  );

  return { data, loading, error, invalidate } as const;
}

export interface UseGetApiOptions {
  enabled?: any;
}

/* -------------------------------------------------------------------------- */
/*                                   GETTER                                   */
/* -------------------------------------------------------------------------- */

/** Single Object or Single Page */
export function useGetApi<T, E = AxiosError>(
  fetchAction: () => Promise<T>,
  deps: DependencyList = [],
  { enabled = true }: UseGetApiOptions = {}
) {
  const fetched = useFetchApi<T, E, []>(fetchAction);

  useEffect(() => {
    if (enabled) {
      fetched.invalidate();
    }
  }, deps);

  return {
    ...fetched,
  };
}

/** With Pagination */
export function useGetApiWithPagination<T, E = AxiosError>(
  fetchAction: (page: number, size: number) => Promise<T>,
  options: {
    initialPage: number;
    pageSize: number;
  },
  deps?: DependencyList,
  apiOptions?: UseGetApiOptions
) {
  const [page, setPage] = useState<number>(options.initialPage);
  const fetched = useGetApi<T, E>(() => fetchAction(page, options.pageSize), deps, apiOptions);

  useEffect(() => {
    fetched.invalidate();
  }, [page]);

  return {
    ...fetched,
    page,
    setPage,
  } as const;
}

/* -------------------------------------------------------------------------- */
/*                                   SETTER                                   */
/* -------------------------------------------------------------------------- */

export function useSetApi<T, ARGS extends unknown[], E = AxiosError>(fetchAction: (...args: ARGS) => Promise<T>) {
  const { invalidate: apiAction, ...fetched } = useFetchApi<T, E, ARGS>(fetchAction);

  return {
    apiAction,
    ...fetched,
  } as const;
}

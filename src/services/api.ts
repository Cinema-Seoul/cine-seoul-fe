import { DependencyList, useCallback, useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponseTransformer } from "axios";
import { useLocation, useSearchParams } from "react-router-dom";

export function initApiFetcher() {
  // axios.defaults.baseURL = 'http://localhost:8080';
  axios.defaults.baseURL = "/api";
  // axios.defaults.withCredentials = true;
  // axios.defaults.headers.common['Accept'] = '*';
  // axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
}

export function setDefaultHeader({ accessToken }: { accessToken: string }) {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
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

function useFetchApi<T, E>(fetchAction: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<E | null>(null);
  const invalidate = useCallback(() => {
    if (loading) {
      return;
    }
    console.log("API call is now invalidated!");
    setLoading(true);
    setError(null);
    setData(undefined);
    fetchAction()
      ?.then((d) => {
        setData(d);
        return d;
      })
      .catch((e: E) => {
        console.error(e);
        setData(undefined);
        setError(e);
      })
      .finally(() => {
        console.log("HHH");
        setLoading(false);
      });
  }, [fetchAction]);

  return { data, loading, error, invalidate } as const;
}

export interface UseGetApiOptions {
  enabled?: any;
}

export function useGetApi<T, E = AxiosError>(
  fetchAction: () => Promise<T>,
  deps: DependencyList = [],
  { enabled = true }: UseGetApiOptions = {}
) {
  const fetched = useFetchApi<T, E>(fetchAction);

  useEffect(() => {
    if (enabled) {
      fetched.invalidate();
    }
  }, deps);

  return {
    ...fetched,
  };
}

export function useGetApiWithPagination<T, E = AxiosError>(
  fetchAction: (page: number, size: number) => Promise<T>,
  options: {
    initialPage: number;
    pageSize: number;
  },
  deps?: DependencyList,
  apiOptions?: UseGetApiOptions,
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

export function useSetApi<T, E = AxiosError>(fetchAction: () => Promise<T>) {
  const { invalidate: apiAction, ...fetched } = useFetchApi<T, E>(fetchAction);

  return {
    apiAction,
    ...fetched,
  } as const;
}

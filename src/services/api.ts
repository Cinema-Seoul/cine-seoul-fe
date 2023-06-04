import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
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

export function useFetchApi<T, E = AxiosError>(fetchAction: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<E|null>(null);

  const invalidate = useCallback(() => {
    setLoading(true);
    setError(null);
    setData(undefined);
    fetchAction()
      .then((d) => {
        setData(d);
        return d;
      })
      .catch((e: E) => {
        setData(undefined);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchAction]);

  useEffect(() => {
    invalidate();
  }, []);

  return { data, loading, invalidate, error } as const;
}

export function useFetchApiWithPagination<T>(
  fetchAction: (page: number, size: number) => Promise<T>,
  options: {
    initialPage: number;
    pageSize: number;
  }
) {
  const [page, setPage] = useState<number>(options.initialPage);
  const fetched = useFetchApi(() =>
    fetchAction(page, options.pageSize)
  );

  useEffect(() => {
    fetched.invalidate();
  }, [page]);

  return {
    ...fetched,
    page,
    setPage,
  } as const;
}

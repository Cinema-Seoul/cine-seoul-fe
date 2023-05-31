import { useEffect, useState } from "react";
import axios from 'axios';

export function initApiFetcher() {
  // axios.defaults.baseURL = 'http://localhost:8080';
  axios.defaults.baseURL = '/api';
  // axios.defaults.withCredentials = true;
  // axios.defaults.headers.common['Accept'] = '*';
  // axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
}

export function setDefaultHeader({
  accessToken
}: {
  accessToken: string;
}) {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

//

export async function fakeApiFetch<T extends object>(
  res: T,
  willReject = false
): Promise<T> {
  const fetch = new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (willReject) {
        reject();
        return;
      } else {
        resolve(res);
        return;
      }
    }, 1000);
  });

  return fetch;
}

type FetchStatus = "pending" | "success" | "error";

export const wrapPromise = <T>(promise: Promise<T>) => {
  let status: FetchStatus = "pending";
  let result: T;

  const suspend = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspend;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result as T;
      }
    },
  };
};

//

export function useFetchApi<T>(promise: Promise<T>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);

  const invalidate = () => {
    setLoading(true);
    promise
      .then((d) => setData(d))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    invalidate();
  }, []);

  return [data, loading, invalidate] as const;
}

export function useFetchApiWithPagination<T>(fetchAction: ((page: number) => Promise<T>)) {
  const [page, setPage] = useState<number>(1);
  const [data ,loading, invalidate] = useFetchApi(fetchAction(page));

  return {
    data, 
    loading, 
    invalidate,
    page,
    setPage,
  } as const;
}
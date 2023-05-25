import { useEffect, useState } from "react";

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

export function useFetchApi<T>(promise: Promise<T>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    promise
      .then((d) => setData(d))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [data, loading] as const;
}

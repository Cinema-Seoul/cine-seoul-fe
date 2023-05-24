export async function fakeApiFetch<T extends object>(res: T, willReject = false): Promise<T> {
  return new Promise<T>((resolve, reject) => {
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
}
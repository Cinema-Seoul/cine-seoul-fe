const STORAGE_KEY = 'auth-user';

export type AuthUser = {
  userId: string;
  name: string;
};

export async function signIn(userId: string, password: string): Promise<AuthUser> {
  //TODO: JWT
  return new Promise<AuthUser>((resolve, reject) => {
    if (userId === "cinemaseoul") {
      resolve({
        userId: "testId",
        name: "홍길동",
      });
    } else {
      reject();
    }
  }).then(user => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  });
}

export function signOut() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function useCurrentUser(): AuthUser | null {
  const currentUser = sessionStorage.getItem(STORAGE_KEY);

  // TODO: Validation 필요?
  return currentUser ? JSON.parse(currentUser) : null;
}

export function asAuthHeader(accessToken: string) {
  // TODO: Validation 필요?
  return {
    'x-access-token': accessToken
  };
}
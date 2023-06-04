import { useUserStore } from "@/stores/user.store";
import { UserRole } from "@/domains/user";

import type { User } from "@/domains/user";
import type { SignInApiResponse } from "./auth.api";

const JWT_TOKEN_STORAGE_KEY = "access-token";

export interface AuthService {
  signIn: typeof signIn;
  signOut: typeof signOut;
}

export function useAuthService(): AuthService {
  const userStore = useUserStore();

  return {
    signIn: (userId, password) =>
      signIn(userId, password).then((res) => {
        userStore.setCurrentUser(res.user);
        if (res.accessToken) {
          sessionStorage.setItem(JWT_TOKEN_STORAGE_KEY, res.accessToken);
        }
        return res;
      }),
    signOut: () =>
      signOut().then(() => {
        userStore.setCurrentUser(null);
        sessionStorage.removeItem(JWT_TOKEN_STORAGE_KEY);
      }),
  };
}

async function signIn(
  userId: string,
  password: string
): Promise<SignInApiResponse> {
  const fakeUser: User = {
    userNum: 1,
    id: userId,
    name: "홍길동",
    phoneNum: "010-1234-5678",
    role: UserRole.customer,
    point: null,
  };

  const fakeToken = "this_is_fake_jwt";

  return new Promise((res) => {
    res({
      user: fakeUser,
      accessToken: fakeToken,
    });
  });
}

async function signOut(): Promise<void> {
  return new Promise((res) => {
    res();
  });
}

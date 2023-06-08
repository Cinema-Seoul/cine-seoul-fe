import { useUserStore } from "@/stores/user.store";
import axios from "axios";
import { requestSignInUser } from "./user.service";
import { useCallback, useState } from "react";

type SignInAction = (isMember: boolean, id: string, pw: string, phoneNum?: string) => Promise<string>;

export function useUser() {
  return useUserStore((s) => s.currentUser);
}

export function useUserActions() {
  const { currentUser, clearCurrentUser, setCurrentUser } = useUserStore();

  const [loading, setLoading] = useState<boolean>(false);

  const signIn = useCallback<SignInAction>(
    async (isMember, id, pw, phoneNum) => {
      setLoading(true);
      return requestSignInUser({ id, pw, phoneNum }, { isMember })
        .then((token) => {
          setCurrentUser({
            accessToken: token,
            isMember,
            userId: id,
            userNum: 0,
            name: undefined,
          });
          return token;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setCurrentUser]
  );

  return {
    loading,
    currentUser,
    signIn,
    signOut: clearCurrentUser,
  };
}

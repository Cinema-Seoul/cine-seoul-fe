import { useUserStore } from "@/stores/user.store";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import jwt_decode from "jwt-decode";
import { requestSignInMember, requestSignInNonmember, signUpNonmember } from "./user.service";
import { User, UserRole } from "@/types";
import { useNavigate } from "react-router-dom";

export function useUser() {
  return useUserStore((s) => s.currentUser);
}

export const NeedSignError = new Error("로그인이 필요합니다.");

export function useAuthGuard(needAdmin = false) {
  const currentUser = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (needAdmin && currentUser?.userRole !== UserRole.admin) {
      throw Error("권한이 없습니다!");
    }
  }, [currentUser]);

  if (!currentUser) throw NeedSignError;

  return currentUser;
}

function decodeToken(token: string) {
  return jwt_decode(token) as {
    sub: string;
    iss: string;
    num: number;
    id: string;
    roles: UserRole[];
    iat: number;
    exp: number;
  };
}

export function useUserActions() {
  const navigate = useNavigate();
  const { currentUser, clearCurrentUser, setCurrentUser } = useUserStore();

  const [loading, setLoading] = useState<boolean>(false);

  const signIn = useCallback(
    (token: string) => {
      const decoded = decodeToken(token);
      setCurrentUser({
        accessToken: token,
        userRole: decoded.roles[0],
        userId: decoded.id,
        userNum: decoded.num,
        name: undefined,
      });
      return token;
    },
    [setCurrentUser]
  );

  const signInMember = useCallback(
    async (id: string, pw: string) => {
      setLoading(true);
      return requestSignInMember({ id, pw })
        .then(signIn)
        .finally(() => {
          setLoading(false);
        });
    },
    [signIn]
  );

  const signInUpNonmember = useCallback(
    async (name: string, pw: string, phoneNum: string) => {
      setLoading(true);
      await signUpNonmember({ name, pw, phoneNum });
      return requestSignInNonmember({ name, pw, phoneNum })
        .then(signIn)
        .finally(() => {
          setLoading(false);
        });
    },
    [signIn]
  );

  const signOut = useCallback(() => {
    clearCurrentUser();
    navigate("/");
  }, [clearCurrentUser, navigate]);

  return {
    loading,
    currentUser,
    signInMember,
    signInUpNonmember,
    signOut,
  };
}

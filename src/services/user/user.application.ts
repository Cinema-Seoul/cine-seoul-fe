import { useUserStore } from "@/stores/user.store";
import axios from "axios";
import { useCallback, useState } from "react";
import jwt_decode from "jwt-decode";
import { requestSignInMember, requestSignInNonmember } from "./user.service";
import { UserRole } from "@/types";
import { useNavigate } from "react-router-dom";

export function useUser() {
  return useUserStore((s) => s.currentUser);
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

  const signInNonmember = useCallback(
    async (id: string, pw: string, phoneNum: string) => {
      setLoading(true);
      return requestSignInNonmember({ id, pw, phoneNum })
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
    signInNonmember,
    signOut,
  };
}

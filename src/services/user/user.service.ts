import { useUserStore } from "@/stores/user.store";

import type { User } from "@/domains/user";

export interface UserService {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export default function useUserService (): UserService {
  const { currentUser, setCurrentUser } = useUserStore();

  return {
    currentUser,
    setCurrentUser,
  };
}
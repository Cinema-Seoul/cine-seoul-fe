import { setDefaultHeader } from "@/services/api";
import { UserRole } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SignedUser = {
  userNum: number;
  userId: string;
  name?: string;
  userRole: UserRole;
  accessToken: string;
};

export type UserStore = {
  currentUser: SignedUser | null;
  setCurrentUser: (user: SignedUser) => void;
  clearCurrentUser: () => void;
};

export const useUserStore = create<UserStore>()(
  persist((set) => ({
    currentUser: null,
    setCurrentUser: (user) => {
      set({ currentUser: user });
      setDefaultHeader({ accessToken: user.accessToken });
    },
    clearCurrentUser: () => {
      set({ currentUser: null });
    },
  }), {
    name: 'cs-user',
    storage: createJSONStorage(() => sessionStorage),
  })
);

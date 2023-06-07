import { setDefaultHeader } from "@/services/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SignedUser = {
  userNum: number;
  userId: string;
  name?: string;
  isMember: boolean;
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

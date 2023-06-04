import { create } from "zustand";

type SignedUser = {
  userNum: number;
  userId: string;
  name?: string;
  isMember: boolean;
  accessToken: string;
};

export type UserStore = {
  currentUser: SignedUser | null;
  setCurrentUser: (user: SignedUser | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
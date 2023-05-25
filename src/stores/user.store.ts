import { create } from "zustand";

import type { User } from '@/domains/user';

export type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
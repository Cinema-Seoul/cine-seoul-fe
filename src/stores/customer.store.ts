import { create } from "zustand";

export type CustomerStore = {
  test: string;
};

export const useCustomerStore = create<CustomerStore>(set => ({
  test: "helloworld",
}));
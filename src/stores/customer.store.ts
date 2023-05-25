import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type CustomerStore = {
  
};

export const useCustomerStore = devtools(
  create<CustomerStore>((set) => ({
  }))
);

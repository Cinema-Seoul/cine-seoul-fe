import { YNC } from "api:domain";

export type PaymentMethod = `${"A" | "C" | "P"}${string}`;
export type PaymentState = YNC;

export type PaymentDetail = {
  approvalNum: string;
  createdAt: Date;
  paymentMethod: PaymentMethod;
  paymentNum: number;
  price: number;
  state: PaymentState;
  ticketNum: number;
};

export type PaymentListEntry = {
  approvalNum: string;
  createdAt: Date;
  paymentMethod: PaymentMethod;
  paymentNum: number;
  price: number;
  state: PaymentState;
  ticketNum: number;
};

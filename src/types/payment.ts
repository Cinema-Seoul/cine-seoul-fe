export enum PaymentMethod {
  Account = "A",
  Card = "C",
  Point = "P",
}
export type PaymentMethodValue = `${PaymentMethod}${string}`;
export enum PaymentState {
  True = "Y",
  False = "N",
  Cancel = "C",
}

export type PaymentDetail = {
  approvalNum: string;
  createdAt: Date;
  paymentMethod: PaymentMethodValue;
  paymentNum: number;
  price: number;
  state: PaymentState;
  ticketNum: number;
};

export type PaymentListEntry = {
  approvalNum: string;
  createdAt: Date;
  paymentMethod: PaymentMethodValue;
  paymentNum: number;
  price: number;
  state: PaymentState;
  ticketNum: number;
};

export type PaymentCreation = {
  accountNum?: string;
  cardNum?: string;
  payedPoint: number;
  paymentMethod: PaymentMethodValue;
  price: number;
  ticketNum: number;
};

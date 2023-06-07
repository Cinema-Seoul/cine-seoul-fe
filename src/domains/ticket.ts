import { ScheduleSeat, User } from ".";

export enum TicketState {
  True = 'Y',
  False = 'N',
  Canceled = 'C',
}

export type TicketListEntry = {
  createdAt: Date;
  salePrice: number;
  scheduleSeat: ScheduleSeat;
  stdPrice: number;
  ticketNum: number;
  ticketState: TicketState;
  user: User;
};

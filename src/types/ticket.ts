import { ScheduleListEntry, ScheduleSeat, Seat, User } from ".";

export enum TicketState {
  Issued = "I",
  Payed = "P",
  Pending = "N",
  Canceled = "C",
}

export type TicketListEntry = {
  createdAt: Date;
  stdPrice: number;
  salePrice: number;
  ticketSeats: ScheduleSeat[];
  ticketNum: number;
  ticketState: TicketState;
  user: User;
  schedule: ScheduleListEntry;
  audienceTypes: {
    audienceType: string;
    count: number;
    displayName: string;
  }[];
};

export type TicketDetail = {
  // audienceTypes: [
  //   {
  //     audienceType: "D";
  //     count: 0;
  //     displayName: "string";
  //   }
  // ];
  createdAt: Date;
  salePrice: number;
  schedule: ScheduleListEntry;
  stdPrice: number;
  ticketNum: number;
  ticketSeats: Omit<ScheduleSeat, 'isOccupied'>[];
  ticketState: TicketState;
  user: User;
};

export enum TicketAudienceType {
  Disabled = "D",
}

export type TicketCreation = {
  audienceTypeDTOList: { audienceType: TicketAudienceType; count: number }[];
  schedNum: number;
  seatNumList: number[];
  stdPrice: number;
};

export type TicketUpdating = {
  salePrice: number;
  ticketNum: number;
  ticketState: TicketState;
};

export type TicketReset = {
  createTicketAudienceDTOList: { audienceType: TicketAudienceType; count: number }[];
  schedNum: number;
  seatNumList: number[];
  stdPrice: number;
  ticketNum: number;
};

import { ScheduleSeat, User } from ".";

export enum TicketState {
  True = "Y",
  False = "N",
  Canceled = "C",
}

export type TicketListEntry = {
  createdAt: Date;
  salePrice: number;
  scheduleSeat: ScheduleSeat;
  stdPrice: number;
  ticketNum: number;
  ticketState: TicketState;
  user: User;

  // audienceTypes: [
  //   {
  //     audienceType: "D";
  //     count: 0;
  //     displayName: "string";
  //   }
  // ];
  // createdAt: "2023-06-08T16:04:48.809Z";
  // reservationSeats: [
  //   {
  //     seat: {
  //       col: "string";
  //       row: "string";
  //       screenNum: 0;
  //       seatGrade: "A";
  //       seatNum: 0;
  //       seatPrice: 0;
  //     };
  //   }
  // ];
  // salePrice: 0;
  // schedule: {
  //   emptySeat: 0;
  //   movie: {
  //     distName: "string";
  //     genreList: [
  //       {
  //         genreCode: "string";
  //         name: "string";
  //       }
  //     ];
  //     gradeName: "string";
  //     info: "string";
  //     isShowing: "N";
  //     movieNum: 0;
  //     poster: "string";
  //     releaseDate: "string";
  //     runningTime: 0;
  //     ticketCount: 0;
  //     title: "string";
  //   };
  //   order: 0;
  //   schedNum: 0;
  //   schedTime: "2023-06-08T16:04:48.810Z";
  //   screen: {
  //     name: "string";
  //     screenNum: 0;
  //     totalSeat: 0;
  //   };
  // };
  // stdPrice: 0;
  // ticketNum: 0;
  // ticketState: "C";
  // user: {
  //   createdAt: "2023-06-08T16:04:48.810Z";
  //   id: "string";
  //   name: "string";
  //   phoneNum: "string";
  //   point: 0;
  //   pw: "string";
  //   residentNum: "string";
  //   role: "A";
  //   userNum: 0;
  // };
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

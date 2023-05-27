export enum SeatGrade {
  TOP = 50,
  MIDDLE = 30,
  LOW = 10,
}

export type Seat = {
  seatNum: number;
  row: string;
  col: string;
  seatGrade: SeatGrade;
  seatPrice: number;
  screenNum: number;
}
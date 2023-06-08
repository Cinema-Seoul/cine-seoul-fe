export enum SeatGrade {
  A = 'A',
  B = 'B',
  C = 'C',
}

export type Seat = {
  seatNum: number;
  row: string;
  col: string;
  seatGrade: SeatGrade;
  seatPrice: number;
  screenNum: number;
}
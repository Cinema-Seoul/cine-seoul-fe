export type SeatGrade = 'A' | 'B' | 'C';

export type Seat = {
  seatNum: number;
  row: string;
  col: string;
  seatGrade: SeatGrade;
  seatPrice: number;
  screenNum: number;
}
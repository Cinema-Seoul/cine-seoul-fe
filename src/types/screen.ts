import { Seat } from ".";

export type Screen = {
  screenNum: number;
  name: string;
  totalSeat: number;
  seats: Seat[];
};
import type { Seat } from "./seat";

export type Screen = {
  screenNum: number;
  name: string;
  totalSeat: number;
  seats: Seat[];
};
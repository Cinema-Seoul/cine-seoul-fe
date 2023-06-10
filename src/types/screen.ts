import { Seat } from ".";

export type Screen = {
  screenNum: number;
  name: string;
  totalSeat: number;
  seats: Seat[];
};

export type ScreenCreation = {
  name: string;
  totalSeat: number;
};

export type ScreenEditing = ScreenCreation;


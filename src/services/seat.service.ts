import { Seat, SeatCreation } from "@/types";
import axios from "axios";

/** GET /seat/admin */

export interface GetSeatsOptions {
  screenNum?: number;
}

export async function getSeats({ screenNum }: GetSeatsOptions): Promise<Seat[]> {
  return axios.get('/seat/admin', { params: { screenNum } }).then(res => res.data);
}

/** POST /seat/admin */

export async function createSeat(body: SeatCreation): Promise<unknown> {
  return axios.post('/seat/admin', { ...body }).then(res => res.data);
}

/** PUT /seat/admin */

export async function editSeat(seatNum: number, body: Partial<SeatCreation>): Promise<unknown> {
  return axios.put('/seat/admin', { seatNum, ...body }).then(res => res.data);
}

/** DELETE /seat/admin */

export interface RemoveSeatByPositionOptions {
  col: string;
  row: string;
  screenNum: string;
}

export async function removeSeatByPosition({ col, row, screenNum: screen_num }: RemoveSeatByPositionOptions): Promise<unknown> {
  return axios.delete('/seat/admin', { params: { col, row, screen_num } }).then(res => res.data);
}

/** GET /seat/admin/{num} */

export async function getSeat(seatNum: number): Promise<Seat> {
  return axios.get(`/seat/admin/${seatNum}`).then(res => res.data);
}

/** DELETE /seat/admin/{num} */

export async function removeSeatByNum(seatNum: number): Promise<unknown> {
  return axios.delete(`/seat/admin/${seatNum}`).then(res => res.data);
}

import { ListResponse, TicketCreation, TicketDetail, TicketListEntry } from "@/types";
import { PagableRequest, SortableRequest } from "../api";
import axios from "axios";

/* -------------------------------------------------------------------------- */
/*                                   Ticket                                   */
/* -------------------------------------------------------------------------- */

/** GET /ticket/auth */

export enum GetTicketsSortBy {
  createdDate = "created_date",
}

export interface GetTicketsOptions extends PagableRequest, SortableRequest<GetTicketsSortBy> {
  userNum?: number;
}

export async function getTickets({
  userNum,
  page = 0,
  size = 12,
  sortBy,
  sortDir: sort_dir,
}: GetTicketsOptions): Promise<ListResponse<TicketListEntry>> {
  return axios
    .get("/ticket/auth", {
      params: {
        userNum,
        page,
        size,
        sort_created_date: sortBy === GetTicketsSortBy.createdDate,
        sort_dir,
      },
    })
    .then((res) => res.data);
}

/** POST /ticket/auth */

export async function createTicket(body: TicketCreation): Promise<TicketListEntry> {
  return axios.post("/ticket/auth", { ...body }).then((res) => res.data.data);
}

/** PUT /ticket/auth */

/** GET /ticket/auth/{num} */

export async function getTicketDetail(ticketNum: number): Promise<TicketDetail> {
  return axios.get(`/ticket/auth/${ticketNum}`).then((res) => res.data);
}

/** DELETE /ticket/auth/{num} */

export async function deleteTicket(ticketNum: number): Promise<unknown> {
  return axios.delete(`/ticket/auth/${ticketNum}`).then((res) => res.data);
}

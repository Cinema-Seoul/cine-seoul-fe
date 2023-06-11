import { EventCreation, EventCurrentListEntry, EventDetail, EventListEntry, EventUpdating } from "@/types/event";
import axios from "axios";
import { PagableRequest } from "./api";
import { ListResponse } from "@/types";

/** GET /event */

export async function getCurrentEvents(): Promise<EventCurrentListEntry[]> {
  return axios.get("/event").then((res) => res.data);
}

/** POST /event */

export async function createEvent(body: EventCreation): Promise<number> {
  return axios
    .post("/event", { ...body, startAt: body.startAt.toISOString(), endAt: body.endAt.toISOString() })
    .then((res) => res.data);
}

/** PUT /event */

export async function editEvent(body: EventUpdating): Promise<number> {
  return axios
    .put("/event", {
      ...body,
      startAt: body.startAt instanceof Date ? body.startAt?.toISOString() : undefined,
      endAt: body.endAt instanceof Date ? body.endAt?.toISOString() : undefined,
      })
    .then((res) => res.data);
}

/** GET /event/{num} */

export async function getEventDetail(eventNum: number): Promise<EventDetail> {
  return axios.get(`/event/${eventNum}`).then((res) => res.data);
}

/** GET /event/list */

export async function getEvents({ page, size }: PagableRequest): Promise<ListResponse<EventListEntry>> {
  return axios.get("/event/list", { params: { page, size } }).then((res) => res.data);
}

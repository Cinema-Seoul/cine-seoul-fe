import { EventCreation, EventCurrentListEntry, EventDetail, EventListEntry, EventUpdating } from "@/types/event";
import axios from "axios";
import { PagableRequest } from "./api";
import { ListResponse } from "@/types";
import { toLocalISOString } from "@/utils/date";

/** GET /event */

export async function getCurrentEvents(): Promise<EventCurrentListEntry[]> {
  return axios.get("/event").then((res) => res.data);
}

/** POST /event */

export async function createEvent(body: EventCreation): Promise<number> {
  return axios
    .post("/event", {
      ...body,
      startAt: body.startAt instanceof Date ? toLocalISOString(body.startAt) : body.startAt,
      endAt: body.endAt instanceof Date ? toLocalISOString(body.endAt) : body.endAt,
    })
    .then((res) => res.data);
}

/** PUT /event */

export async function editEvent(body: EventUpdating): Promise<number> {
  const data = {
    ...body,
    startAt: body.startAt instanceof Date ? toLocalISOString(body.startAt) : body.startAt,
    endAt: body.endAt instanceof Date ? toLocalISOString(body.endAt) : body.endAt,
  };
  console.log(data);
  return axios.put("/event", data).then((res) => res.data);
}

/** GET /event/{num} */

export async function getEventDetail(eventNum: number): Promise<EventDetail> {
  return axios.get(`/event/${eventNum}`).then((res) => res.data);
}

/** GET /event/list */

export async function getEvents({ page, size }: PagableRequest): Promise<ListResponse<EventListEntry>> {
  return axios.get("/event/list", { params: { page, size } }).then((res) => res.data);
}

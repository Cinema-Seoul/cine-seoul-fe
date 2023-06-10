import { EventCreation, EventCurrentListEntry, EventDetail, EventListEntry, EventUpdating } from "@/types/event";
import axios from "axios";
import { PagableRequest } from "./api";
import { ListResponse } from "@/types";

export async function getCurrentEvents(): Promise<EventCurrentListEntry[]> {
  return axios.get("/event").then((res) => res.data);
}

export async function createEvent(body: EventCreation): Promise<number> {
  return axios.post("/event", { ...body }).then((res) => res.data);
}

export async function editEvent(body: EventUpdating): Promise<number> {
  return axios.put("/event", { ...body }).then((res) => res.data);
}

export async function getEventDetail(eventNum: number): Promise<EventDetail> {
  return axios.put(`/event/${eventNum}`).then((res) => res.data);
}

export async function getEvents({ page, size }: PagableRequest): Promise<ListResponse<EventListEntry>> {
  return axios.get("/event/list", { params: { page, size } }).then((res) => res.data);
}

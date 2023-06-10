import axios from "axios";
import { PagableRequest, SortableRequest } from "../api";
import { fmt } from "@/utils/date";
import {
  EntResponse,
  ListResponse,
  ScheduleCreation,
  ScheduleDetail,
  ScheduleListEntry,
  ScheduleUpdating,
} from "@/types";

/* -------------------------------------------------------------------------- */
/*                                  Schedule                                  */
/* -------------------------------------------------------------------------- */

/** GET /schedule */

export enum GetSchedulesSortBy {
  order = "order",
}

export interface GetSchedulesOptions extends PagableRequest, SortableRequest<GetSchedulesSortBy> {
  date?: Date;
  movieNum?: number;
}

export async function getSchedules({
  page = 0,
  size = 12,
  sortBy,
  sortDir: sort_dir,
  date: dateRaw,
  movieNum,
}: GetSchedulesOptions): Promise<ListResponse<ScheduleListEntry>> {
  const date = dateRaw && fmt(dateRaw, "yyyy-MM-dd");

  return axios
    .get<ListResponse<ScheduleListEntry>>("/schedule", {
      params: {
        page,
        size,
        sort_order: sortBy === GetSchedulesSortBy.order,
        sort_dir,
        date,
        movieNum,
      },
    })
    .then((res) => res.data);
}

/** GET /schedule/{num} */

export async function getScheduleDetail(scheduleNum: number): Promise<ScheduleDetail> {
  return axios.get<ScheduleDetail>(`/schedule/${scheduleNum}`, {}).then((res) => res.data);
}

/* -------------------------------------------------------------------------- */
/*                              Schedule (Admin)                              */
/* -------------------------------------------------------------------------- */

/** DELETE /schedule/admin/{num} */

export async function deleteSchedule(scheduleNum: number): Promise<EntResponse> {
  return axios.delete<EntResponse>(`/schedule/admin/${scheduleNum}`, {}).then((res) => res.data);
}

/** POST /schedule/admin */

export async function createSchedule(sched: ScheduleCreation): Promise<unknown> {
  return axios.post<unknown>("/schedule/admin", { ...sched }).then((res) => res.data);
}

/** PUT /schedule/admin */

export async function updateSchedule(sched: Partial<ScheduleUpdating>): Promise<unknown> {
  return axios.put<unknown>("/schedule/admin", { ...sched }).then((res) => res.data);
}

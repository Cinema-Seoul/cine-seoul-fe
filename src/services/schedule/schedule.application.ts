import { useGetApi, useGetApiWithPagination } from "../api";
import { getSchedules } from "./schedule.service";

export function useGetSchedules() {
  return useGetApiWithPagination(() => getSchedules())
}

export function useGetScheduleDetail() {

}
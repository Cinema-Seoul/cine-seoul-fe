import { SortDirection } from "@/services/api";
import { GetSchedulesSortBy } from "@/services/schedule/schedule.service";
import { createContext, useContext } from "react";

type _ScheduleListContext = {
  sortBy?: GetSchedulesSortBy;
  setSortBy: (s: GetSchedulesSortBy) => void;
  sortDir?: SortDirection;
  setSortDir: (s: SortDirection) => void;
};

export const ScheduleListContext = createContext<_ScheduleListContext>({
  setSortBy: () => undefined,
  setSortDir: () => undefined,
});
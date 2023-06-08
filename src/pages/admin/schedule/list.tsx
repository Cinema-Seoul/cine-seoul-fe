import { SortDirection, useGetApiWithPagination } from "@/services/api";
import { GetSchedulesSortBy, getSchedules } from "@/services/schedule/schedule.service";
import { useEffect, useState } from "react";
import { ScheduleListContext } from "./context";

export default function AdminScheduleListPage() {
  const [sortBy, setSortBy] = useState<GetSchedulesSortBy>();
  const [sortDir, setSortDir] = useState<SortDirection>();

  const schedules = useGetApiWithPagination((p, s) => getSchedules({ page: p, size: s, sortBy, sortDir }), {
    initialPage: 0,
    pageSize: 20,
  });

  useEffect(() => {
    schedules.setPage(0);
    schedules.invalidate();
  }, [sortBy, sortDir]);

  return (
    <ScheduleListContext.Provider
      value={{
        sortBy,
        setSortBy,
        sortDir,
        setSortDir,
      }}
    >
      <table className="hq-data-table table-auto w-full">
        <thead className="sticky top-0 bg-neutral-9 text-neutral-1">
          <tr>
            <th>고유번호</th>
            <th>상영시각</th>
            <th>상영영화</th>
            <th>상영관</th>
            <th>남은자리</th>
          </tr>
        </thead>
        <tbody>
          {schedules.data?.list.map((item, index) => (
            <tr key={item.schedNum}>
              <th>{item.schedNum}</th>
              <td>{item.schedTime.toTimeString()}</td>
              <td className="text-center">{item.movie.title}</td>
              <td className="text-center">{item.screen.name}</td>
              <td className="text-right">{item.emptySeat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScheduleListContext.Provider>
  );
}

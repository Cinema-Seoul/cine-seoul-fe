import { StepSection } from "@/components/ticketing";
import { Loader } from "@/components/ui";
import { useGetApi } from "@/services/api";
import { GetSchedulesSortBy, getSchedules } from "@/services/schedule/schedule.service";
import { useTicketingStore } from "@/stores/client";
import type { ScheduleListEntry } from "@/types";
import { date, fmt } from "@/utils/date";
import clsx from "clsx";
import { ComponentPropsWithoutRef, MouseEventHandler, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export interface ScheduleRadioProps extends ComponentPropsWithoutRef<"a"> {
  id?: string;
  data: {
    schedule: ScheduleListEntry;
  };
  onClick?: MouseEventHandler;
}

const ScheduleRadio = ({ className, data, id = `${data.schedule.schedNum}`, ...restProps }: ScheduleRadioProps) => {
  const dateString: string = fmt(data.schedule.schedTime, "a p") ?? "";

  return (
    <a
      className={clsx(
        className,
        "block rounded out-1 outline-neutral-7",
        "transition cursor-pointer bg-neutral-3 hover:(bg-neutral-4) active:(bg-neutral-5) focus:(outline-neutral-8)",
        "p-2"
      )}
      {...restProps}
    >
      <>
        <div className="text-left font-bold">{dateString}</div>
        <div className="text-right font-inherit">
          {data.schedule.emptySeat} / {data.schedule.screen.totalSeat}
        </div>
      </>
    </a>
  );
};

export default function ScheduleSelectSubpage({ className }: BaseProps) {
  const navigate = useNavigate();

  const { selectedDate, selectedMovie, selectedSchedule, updateSelectedSchedule } = useTicketingStore();

  // 최대 99개의 결과만 보여주자.
  // TODO: Movie 다중선택을 API에 맞춰서 단일 선택으로 바꾸자.
  const schedules = useGetApi(
    () =>
      getSchedules({
        page: 0,
        size: 99,
        movieNum: selectedMovie?.movieNum,
        date: selectedDate,
        sortBy: GetSchedulesSortBy.order,
      }),
    [selectedDate, selectedMovie]
  );

  const schedulesByScreenAndMovie: {
    screen: ScheduleListEntry["screen"];
    movie: ScheduleListEntry["movie"];
    schedules: ScheduleListEntry[];
  }[] = useMemo(() => {
    const ret: typeof schedulesByScreenAndMovie = [];

    schedules.data?.list?.forEach((sched) => {
      //Date 타입으로
      sched.schedTime = date(sched.schedTime) ?? new Date(0);

      const filtered = ret.filter(
        (e) => e.movie.movieNum === sched.movie.movieNum && e.screen.screenNum === sched.screen.screenNum
      );
      if (filtered.length > 0) {
        filtered[0].schedules.push(sched);
      } else {
        ret.push({
          screen: sched.screen,
          movie: sched.movie,
          schedules: [sched],
        });
      }
    });

    return ret;
  }, [schedules.data]);

  return (
    <StepSection
      title="관람 일정 고르기"
      className={clsx(className, "flex flex-col")}
      bodyClass="flex-1 overflow-y-auto"
    >
      <div className="p-4 h-full">
        {schedules.loading ? (
          <div className="flex h-full justify-center items-center">
            <Loader className="w-16 h-16" />
          </div>
        ) : schedulesByScreenAndMovie.length ? (
          schedulesByScreenAndMovie.map(({ movie, screen, schedules }) => (
            <div className="">
              <div className="py-2 mt-4">
                <span className="text-lg font-bold">{movie.title}</span>
                <span className={clsx("text-lg font-normal", ":uno: before:(content-['|'] w-1px text-neutral-7 mx-2)")}>
                  {screen.name}
                </span>
              </div>
              <ul className="row px-2">
                {schedules.map((schedule) => (
                  <li key={schedule.schedNum} className="col-4">
                    <ScheduleRadio
                      data={{ schedule }}
                      onClick={() => {
                        navigate("/ticketing/seat");
                        updateSelectedSchedule(schedule);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="flex h-full justify-center items-center">
            <div>해당하는 상영일정이 없어요</div>
          </div>
        )}
      </div>
    </StepSection>
  );
}

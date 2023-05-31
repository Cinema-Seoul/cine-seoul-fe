import { fakeSchedules } from "@/_fake";
import type { Movie, Schedule, Screen } from "@/domains";
import { useTicketingStore } from "@/stores/client";
import { StepSection } from "@/ui/components/ticketing";
import { Button } from "@/ui/components/ui";
import clsx from "clsx";

export interface ScheduleRadioProps extends BaseProps {
  id?: string;
  data: {
    schedule: Schedule;
  };
}

const ScheduleRadio = ({
  className,
  data,
  id = `${data.schedule.schedNum}`,
  ...restProps
}: ScheduleRadioProps) => {
  return (
    <>
      <input
        type="radio"
        className={clsx(className, "peer hidden")}
        name="movie-schedule-selection"
        id={id}
        {...restProps}
      />
      <Button
        as="label"
        variant="tonal"
        htmlFor={id}
        className={clsx(
          "block rounded out-1 outline-neutral-7",
          "peer-checked:(bg-primary-6 text-primary-12 font-bold outline-primary-9 outline-2px group/a)",
          ":uno: before:(content-none block rounded border-2px border-solid w-4 h-4 border-primary-9 flex-1) peer-checked:before:(bg-primary-9)"
        )}
      >
        <div className="border-t border-solid border-neutral-12 border-opacity-10">

        <div className="font-inherit">
          {data.schedule.emptySeat} / {data.schedule.screen.totalSeat}
        </div>
        <div className="font-inherit">
          {data.schedule.emptySeat} / {data.schedule.screen.totalSeat}
        </div>
        </div>
      </Button>
    </>
  );
};

export default function ScheduleSelectSubpage({ className }: BaseProps) {
  const [selectedSchedule] = useTicketingStore((s) => [s.selectedSchedule]);

  const schedulesByScreenAndMovie: {
    screen: Screen;
    movie: Movie;
    schedules: Schedule[];
  }[] = [];

  fakeSchedules.forEach((sched) => {
    const filtered = schedulesByScreenAndMovie.filter(
      (e) =>
        e.movie.movieNum === sched.movie.movieNum &&
        e.screen.screenNum === sched.screen.screenNum
    );
    if (filtered.length > 0) {
      filtered[0].schedules.push(sched);
    } else {
      schedulesByScreenAndMovie.push({
        screen: sched.screen,
        movie: sched.movie,
        schedules: [sched],
      });
    }
  });

  return (
    <StepSection title="관람 일정 고르기" className={className}>
      <div className="p-4">
        <form>
          {schedulesByScreenAndMovie.map(({ movie, screen, schedules }) => (
            <>
              <div className="space-x-2 py-2 mt-4">
                <span className="text-lg font-bold">{movie.title}</span>
                <span className="text-lg font-normal">{screen.name}</span>
              </div>
              <ul className="row px-2">
                {schedules.map((schedule) => (
                  <li key={schedule.schedNum} className="col-4">
                    <ScheduleRadio data={{ schedule }} />
                  </li>
                ))}
              </ul>
            </>
          ))}
        </form>
      </div>
    </StepSection>
  );
}

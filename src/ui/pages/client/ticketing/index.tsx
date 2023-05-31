import { Button } from "@/ui/components/ui";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useBeforeUnload, useNavigate } from "react-router-dom";
import {
  IoCalendar,
  IoChevronBack,
  IoChevronForward,
  IoClose,
} from "react-icons/io5";
import { addDays, format, isPast, isToday } from "date-fns";
import { ko } from "date-fns/locale";

import { StepIndicator } from "@/ui/components/ticketing";

import MovieSelectSubpage from "./movie-select";
import ScheduleSelectSubpage from "./schedule-select";

export interface DateSelectSectionProps extends BaseProps {
  initialDate?: Date;
  onSelect?: (date: Date) => void;
}

const calcDates = (centre: Date) => {
  const dates: Date[] = [];
  for (let i = -1; i < 4; i++) {
    dates.push(addDays(centre, i));
  }
  return dates;
};

const DateSelectSection = ({
  className,
  initialDate = new Date(),
  onSelect,
}: DateSelectSectionProps) => {
  const [centreDate, setCentreDate] = useState<Date>(initialDate);
  const [dates, setDates] = useState<Date[]>(calcDates(initialDate));

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  const doDateBackward = useCallback(() => {
    setCentreDate((o) => addDays(o, -1));
  }, []);
  const doDateForward = useCallback(() => {
    setCentreDate((o) => addDays(o, 1));
  }, []);

  const doDateToday = useCallback(() => {
    const today = new Date();
    setCentreDate(today);
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    setDates(calcDates(centreDate));
  }, [centreDate]);

  useEffect(() => {
    // setCentreDate(selectedDate);
  }, [selectedDate]);

  return (
    <div className={className}>
      <div className="flex flex-row justify-center items-center space-x-4">
        <Button
          className="flex-none"
          variant="text"
          iconStart={<IoChevronBack />}
          onClick={doDateBackward}
        />
        <div className="flex flex-row flex-1 overflow-hidden space-x-4 py-1 justify-center">
          {dates.map((date) => (
            <a
              className={clsx(
                "flex-none px-4 py-2 rounded-full text-center bg-neutral-3 out-1 outline-neutral-6 cursor-pointer",
                selectedDate.toDateString() === date.toDateString() &&
                  "outline-primary-7 font-bold bg-primary-5",
                isPast(date) && !isToday(date) && "opacity-50"
              )}
              onClick={() => {
                setSelectedDate(date);
              }}
            >
              {format(date, "MMM do (E)", { locale: ko })}
            </a>
          ))}
        </div>
        <Button
          className="flex-none"
          variant="text"
          iconStart={<IoChevronForward />}
          onClick={doDateForward}
        />
        <Button
          className="flex-none"
          variant="text"
          tint="primary"
          onClick={doDateToday}
        >
          오늘
        </Button>
        <Button
          className="flex-none"
          variant="contained"
          tint="primary"
          iconStart={<IoCalendar />}
        />
      </div>
    </div>
  );
};

export default function TicketingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <>
      <header className="bg-primary-3 sticky top-0">
        <div className="container relative h-16">
          <div className="relative flex justify-between items-center h-full w-full">
            <h2 className="text-center text-2xl font-bold text-primary-12 justify-self-center">
              예매하기
            </h2>
            <Button
              variant="text"
              tint="primary"
              className="justify-self-end"
              iconStart={<IoClose />}
              onClick={() => {
                navigate(-1);
              }}
            >
              모두 취소
            </Button>
          </div>
        </div>
      </header>
      <motion.main
        initial={{ y: "-24px" }}
        animate={{ y: 0 }}
        exit={{ y: "-24px" }}
      >
        <aside className="bg-primary-2">
          <div className="container w-full h-full">
            <StepIndicator
              steps={["영화 선택", "관람 일정 선택!", "결제", "완료"]}
              currentStep={0}
            />
          </div>
        </aside>
        <div className="container pt-6">
          <DateSelectSection className="w-full mb-4" />
          <div className="flex flex-row">
            <MovieSelectSubpage className="flex-0 w-96 mr-4" />
            <ScheduleSelectSubpage className="flex-1" />
          </div>
          <div className="mt-6 flex justify-between">
            <Button
              variant="tonal"
              tint="primary"
              iconStart={<IoChevronBack />}
            >
              이전 단계로
            </Button>
            <Button
              variant="contained"
              tint="primary"
              iconEnd={<IoChevronForward />}
            >
              다음 단계로
            </Button>
          </div>
        </div>
        <div style={{ height: "1000vh" }} />
      </motion.main>
    </>
  );
}

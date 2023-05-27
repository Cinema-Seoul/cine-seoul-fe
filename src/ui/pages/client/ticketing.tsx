import {
  IoCheckmarkDone,
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoExit,
} from "react-icons/io5";
import { Button } from "@/ui/components/ui";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, type Variants, motion } from "framer-motion";
import clsx from "clsx";

import type { Movie } from "@/domains";
import type { Schedule } from "@/domains/schedule";
import { fakeSchedules } from "@/_fake";

/** Sections */

const sectionAnimVariants: Variants = {
  forward: {
    opacity: 0,
    x: "24px",
  },
  backward: {
    opacity: 0,
    x: "-24px",
  },
  centre: {
    opacity: 1,
    x: 0,
  },
};

// 1. 영화 선택
const Section_MovieSelect = () => (
  <motion.section
    initial="backward"
    animate="centre"
    exit="forward"
    variants={sectionAnimVariants}
    className="out-1 outline-neutral-6 rounded p-4"
  >
    <h2 className="text-lg font-bold">1. 영화 고르기</h2>
  </motion.section>
);

// 2. 일정 선택
export interface ScheduleRadioProps extends BaseProps {
  id: string;
  data: {
    schedule: Schedule;
  };
}
function ScheduleRadio({
  id,
  className,
  data,
  ...restProps
}: ScheduleRadioProps) {
  return (
    <>
      <input
        type="radio"
        className={clsx(className, "peer hidden")}
        name={__radiogroup_schedules}
        id={id}
        {...restProps}
      />
      <Button
        as="label"
        variant="tonal"
        htmlFor={id}
        className={clsx(
          "block peer-checked:(bg-primary-6 text-primary-12 font-bold outline-primary-9 outline-2px group/a) rounded out-1 outline-neutral-7",
          ":uno: before:(content-none block rounded border-2px border-solid w-4 h-4 border-primary-9 flex-1) peer-checked:before:(bg-primary-9)"
        )}
      >
        <div className="font-inherit">
          {data.schedule.emptySeat} / {data.schedule.screen.totalSeat}
        </div>
        <div className="font-inherit">
          {data.schedule.emptySeat} / {data.schedule.screen.totalSeat}
        </div>
      </Button>
    </>
  );
}

const __radiogroup_schedules = "screen-schedule";
const Section_ScheduleSelect = () => (
  <motion.section
    initial={{ opacity: 0, x: "-24px" }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: "24px" }}
    className="out-1 outline-neutral-6 rounded"
  >
    <div className="p-4 border-b border-solid border-neutral-6">
      <h2 className="text-lg font-bold">2. 관람 일정 고르기</h2>
    </div>
    <div className="p-4">
      <form>
        <ul className="row gy-6">
          {fakeSchedules.map((schedule, i) => (
            <li key={i} className="col-3">
              <ScheduleRadio id={`${i}`} data={{ schedule }} />
            </li>
          ))}
        </ul>
      </form>
    </div>
  </motion.section>
);

// 3. 결제
const Section_Pay = () => (
  <motion.section
    initial={{ opacity: 0, x: "-24px" }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: "24px" }}
    className="out-1 outline-neutral-6 rounded p-4"
  >
    <h2 className="text-lg font-bold">3. 결제</h2>
  </motion.section>
);

const Sections = [Section_MovieSelect, Section_ScheduleSelect, Section_Pay];

const isFirstSection = (current: number) => current <= 0;
const isLastSection = (current: number) => current >= Sections.length - 1;

export default function TicketingPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const doIncStep = useCallback(
    () => setCurrentStep((old) => (isLastSection(old) ? old : old + 1)),
    [setCurrentStep]
  );
  const doDecStep = useCallback(
    () => setCurrentStep((old) => (isFirstSection(old) ? old : old - 1)),
    [setCurrentStep]
  );

  const CurSection = Sections[currentStep];

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
            >
              모두 취소
            </Button>
          </div>
        </div>
      </header>
      <motion.main initial={{ size: "50%" }}>
        <aside className="bg-primary-2">
          <div className="container w-full h-full">
            <ul className="row h-full items-center">
              <li className="col py-4 text-center" aria-checked>
                영화 선택
              </li>
              <li className="col py-4 text-center">관람 일정 선택</li>
              <li className="col py-4 text-center">결제</li>
              <li className="col py-4 text-center">완료</li>
            </ul>
          </div>
        </aside>
        <div className="container pt-6">
          <AnimatePresence mode="wait">
            <CurSection key={currentStep} />
          </AnimatePresence>
          <div className="mt-6 flex justify-between">
            <Button
              variant="tonal"
              tint="primary"
              iconStart={<IoChevronBack />}
              disabled={isFirstSection(currentStep)}
              onClick={doDecStep}
            >
              이전 단계로
            </Button>
            <Button
              variant="contained"
              tint="primary"
              iconEnd={<IoChevronForward />}
              disabled={isLastSection(currentStep)}
              onClick={doIncStep}
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

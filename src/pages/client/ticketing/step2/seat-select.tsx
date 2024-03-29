import ScreenSeats from "@/components/screen/screen-seats";
import { StepSection } from "@/components/ticketing";
import { Button, Loader } from "@/components/ui";
import { useAlertDialog } from "@/components/ui/modal/dialog-alert";
import { useLoadingDialog } from "@/components/ui/modal/dialog-loading";
import { useGetApi, useSetApi } from "@/services/api";
import { getScheduleDetail } from "@/services/schedule/schedule.service";
import { cancelAndRegisterTicket, createTicket } from "@/services/ticket/ticket.service";
import { useTicketingStore } from "@/stores/client";
import { Is, ScheduleDetail, ScheduleSeat, Seat, TicketAudienceType, TicketCreation } from "@/types";
import { fmt } from "@/utils/date";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo } from "react";
import { IoChevronForward, IoRemove } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SeatSelectSubpage({ className }: BaseProps) {
  const navigate = useNavigate();

  const showLoading = useLoadingDialog();
  const alertDialog = useAlertDialog();

  const {
    selectedSchedule,
    clearSelectedSchedule,
    selectedSeats,
    toggleSelectedSeat,
    removeSelectedSeat,
    setTicket,
    ticketNum,
  } = useTicketingStore();

  const schedule = useGetApi(() => getScheduleDetail(selectedSchedule?.schedNum as any), [selectedSchedule], {
    enabled: !!selectedSchedule,
  });

  const stdPrice: number = useMemo(
    () => selectedSeats.reduce<number>((acc, seat) => acc + seat.seatPrice, 0),
    [selectedSeats]
  );

  // const refinedSeats = useMemo(() => {
  //   if (!ticket) {
  //     return schedule.data?.scheduleSeats;
  //   } else {
  //     return schedule.data?.scheduleSeats.map<ScheduleSeat>(({ isOccupied, seat }) =>
  //       ticket.ticketSeats.some(({ seat: ticketSeat }) => seat.seatNum === ticketSeat.seatNum)
  //         ? { isOccupied: Is.False, seat }
  //         : { isOccupied, seat }
  //     );
  //   }
  // }, [schedule.data, ticket]);

  const doOnClickSeat = useCallback(
    (seat: Seat) => {
      toggleSelectedSeat(seat);
    },
    [toggleSelectedSeat]
  );

  const NewTicket = useSetApi(createTicket);

  const doOnClickNext = useCallback(() => {
    if (schedule.data) {
      const closeLoading = showLoading();
      NewTicket.apiAction({
        audienceTypeDTOList: [
          {
            audienceType: TicketAudienceType.Disabled,
            count: selectedSeats?.length,
          },
        ],
        schedNum: schedule.data.schedNum,
        seatNumList: selectedSeats.map((s) => s.seatNum),
        stdPrice: stdPrice,
      })
        .then((ticket) => {
          setTicket(ticket.ticketNum);
          navigate("/ticketing/payment", { replace: true });
        })
        .finally(() => {
          closeLoading();
        })
        .catch((e) => {
          alertDialog(
            <>
              오류가 발생했습니다.
              <br />
              {e.response?.data?.message}
            </>
          );
        });
    }
  }, [NewTicket, alertDialog, navigate, schedule.data, selectedSeats, setTicket, showLoading, stdPrice]);

  return (
    <StepSection
      title="자리 고르기"
      className={clsx(className, "flex flex-col")}
      bodyClass="flex flex-row flex-1 items-stretch"
      onClickBack={(e) => {
        navigate(-1);
        clearSelectedSchedule();
      }}
    >
      {schedule.loading || !selectedSchedule ? (
        <div className="flex flex-1 justify-center items-center">
          <Loader className="w-16 h-16" />
        </div>
      ) : (
        <>
          <div className="flex flex-col flex-0 justify-between bg-neutral-2 border-r border-solid border-neutral-6">
            <div className="space-y-2">
              <div className="p-4 bg-neutral-3 text-neutral-12">
                <div>
                  <div className="mr-8">
                    <h6 className="font-bold text-primary-11 mb-2">상영 영화</h6>
                    <img
                      className="object-cover rounded max-w-32"
                      src={selectedSchedule.movie.poster}
                      onError={(e) => (e.currentTarget.src = "")}
                    />
                    <div className="font-bold mt-2">{selectedSchedule.movie.title}</div>
                    <div className="text-sm space-x-2">
                      <span>{selectedSchedule.movie.runningTime}분</span>
                      <span>{selectedSchedule.movie.gradeName}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-neutral-3 text-neutral-12 text-left">
                <h6 className="font-bold text-primary-11 mb-2">상영 날짜 및 시각</h6>
                <div className="">{fmt(selectedSchedule.schedTime, "PPP")}</div>
                <div className="">{fmt(selectedSchedule.schedTime, "a p")}</div>
              </div>
              <div className="p-4 bg-neutral-3 text-neutral-12 text-left">
                <h6 className="font-bold text-primary-11 mb-2">상영관</h6>
                <div className="">{selectedSchedule.screen.name}</div>
              </div>
            </div>
            <div>
              <div className="p-4 text-left">
                {[
                  ["text-amber-400", "예매 가능, A등급 좌석"],
                  ["text-red-400", "예매 가능, B등급 좌석"],
                  ["text-gray-400", "예매 가능, C등급 좌석"],
                ].map(([c, text]) => (
                  <p className="space-x-1">
                    <span className={c}>■</span>
                    <span className="">{text}</span>
                  </p>
                ))}
                {[["text-gray-400", "예매 불가 좌석"]].map(([c, text]) => (
                  <p className="space-x-1">
                    <span className={c}>▩</span>
                    <span className="">{text}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="relative flex-1 p-4 overflow-hidden">
            <div className="absolute top-0 bottom-0 left-0 right-0 overflow-auto">
              <ScreenSeats
                className="p-4 pb-1/2"
                seats={schedule.data?.scheduleSeats}
                onClickSeat={doOnClickSeat}
                selectedSeats={selectedSeats}
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="out-1 outline-neutral-6 bg-neutral-3 bg-opacity-50 backdrop-blur rounded p-4 flex flex-row">
                <ul className="flex flex-row flex-wrap items-end flex-1 gap-2">
                  <AnimatePresence mode="popLayout">
                    {selectedSeats.map((seat) => (
                      <motion.li
                        layout
                        key={seat.seatNum}
                        className="relative rounded out-1 outline-primary-6 bg-primary-3 leading-16 w-16 h-16 text-center"
                        initial={{ scale: 0.6, opacity: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          duration: 0.5,
                        }}
                      >
                        <span>
                          {seat.row}
                          {seat.col}
                        </span>
                        <a
                          className="absolute top--1 right--1 text-4 rounded-full bg-red-900 text-white cursor-pointer pressable-opacity"
                          onClick={() => removeSelectedSeat(seat.seatNum)}
                        >
                          <IoRemove />
                        </a>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="flex-0 flex flex-col justify-end border-l border-solid border-neutral-7 pl-4 ml-4">
                  <div className="text-right py-2">
                    <span className="text-sm mr-2">예상 금액</span>
                    <span className="font-bold">{stdPrice?.toLocaleString("ko-KR")}원</span>
                  </div>
                  <Button
                    className=""
                    variant="contained"
                    tint="primary"
                    iconEnd={<IoChevronForward />}
                    disabled={selectedSeats?.length <= 0}
                    onClick={doOnClickNext}
                  >
                    확인
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </StepSection>
  );
}

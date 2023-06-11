import { Link } from "react-router-dom";
import MainLayout from "../../../_layouts/main-layout";
import { useGetApi, useGetApiWithPagination } from "@/services/api";
import PaginationBar from "@/components/pagination/pagination-bar";
import { DialogBody, DialogFooter, DialogLayout, DialogSheet, useDialog } from "@/components/ui/modal/dialog";
import { useCallback } from "react";
import { Button, Loader } from "@/components/ui";
import { TicketListEntry, displayTicketState } from "@/types";
import clsx from "clsx";
import { getTicketDetail, getTickets } from "@/services/ticket/ticket.service";
import { useAuthGuard } from "@/services/user/user.application";
import { date, fmt } from "@/utils/date";

function TicketDetailDialog({ ticketNum }: { ticketNum: number }) {
  const TicketDetail = useGetApi(() => getTicketDetail(ticketNum));

  if (TicketDetail.loading) {
    return <Loader className="w-16 h-16 m-16 mx-a" />;
  }

  return (
    <DialogSheet>
      <DialogLayout>
        {TicketDetail.data && (
          <>
            <DialogBody className="p-6">
              <h4 className="text-2xl font-bold text-center">{TicketDetail.data.schedule.movie.title}</h4>
              <table className="mt-4 mx-16">
                <tr>
                  <th className="text-right pr-2">예매일자</th>
                  <td>{fmt(date(TicketDetail.data.createdAt), "PPpp")}</td>
                </tr>
                <tr>
                  <th className="text-right pr-2">결제상태</th>
                  <td>{displayTicketState[TicketDetail.data.ticketState]}</td>
                </tr>
                <tr>
                  <th className="text-right pr-2">영화</th>
                  <td>{`${TicketDetail.data.schedule.movie.title} (${TicketDetail.data.schedule.movie.gradeName})`}</td>
                </tr>
                <tr>
                  <th className="text-right pr-2">상영일자</th>
                  <td>{fmt(date(TicketDetail.data.schedule.schedTime), "PPpp")}</td>
                </tr>
                <tr>
                  <th className="text-right pr-2">상영관</th>
                  <td>{TicketDetail.data.schedule.screen.name}</td>
                </tr>
                <tr>
                  <th className="text-right pr-2">예매 좌석</th>
                  <td>{TicketDetail.data.ticketSeats.map(({ seat: { col, row } }) => `${row}${col}`).join(", ")}</td>
                </tr>
              </table>
            </DialogBody>
            {/* <DialogFooter>
              <div className="flex flex-row">
                <Button className="flex-1" variant="text">
                  예매 변경
                </Button>
                <Button className="flex-1" variant="text">
                  예매 취소
                </Button>
              </div>
            </DialogFooter> */}
          </>
        )}
      </DialogLayout>
    </DialogSheet>
  );
}

function TicketItem({ ticket, className }: { ticket: TicketListEntry } & BaseProps) {
  const { showDialog } = useDialog();

  const doOnClickItem = useCallback(() => {
    showDialog(<TicketDetailDialog ticketNum={ticket.ticketNum} />);
  }, [showDialog]);

  if (!ticket.schedule) {
    return null;
  }

  return (
    <a className={clsx(className, "card card-pressable block p-4")} onClick={doOnClickItem}>
      <div className="text-lg font-bold">{ticket.schedule.movie.title}</div>
      <div className="flex flex-row">
        <div className="flex-1 space-x-2">
          <span>{"상영시각"}</span>
          <span>{fmt(date(ticket.schedule.schedTime), "Pp")}</span>
        </div>
        <div className="flex-1 space-x-2">
          <span>{"상영관"}</span>
          <span>{ticket.schedule.screen.name}</span>
        </div>
        <div className="flex-1 space-x-2">
          <span>{"좌석"}</span>
          <span>{ticket.ticketSeats.map(({ seat: { col, row } }) => `${row}${col}`).join(", ")}</span>
        </div>
      </div>
    </a>
  );
}

function TicketsList() {
  const currentUser = useAuthGuard(false);

  const tickets = useGetApiWithPagination((page, size) => getTickets({ page, size, userNum: currentUser.userNum }), {
    initialPage: 0,
    pageSize: 12,
  });

  if (tickets.loading) {
    return <Loader className="w-24 h-24 m-16" />;
  }

  return tickets.data ? (
    <>
      <p className="text-sm text-center">결제되지 않은 티켓은 시간이 지나면 자동으로 취소된 후 목록에서 삭제됩니다.</p>
      <ul className="space-y-2">
        {tickets.data.list.map((ticket) => (
          <li key={ticket.ticketNum}>
            <TicketItem ticket={ticket} />
          </li>
        ))}
      </ul>

      {tickets.data.list.length === 0 && <div className="m-8 text-center">티켓이 없습니다.</div>}

      <PaginationBar className="my-4" pageCount={tickets.data?.totalPages} currentPageIndex={tickets.page} />
    </>
  ) : null;
}

export default function MyTicketsPage() {
  return (
    <MainLayout>
      <header className="bg-neutral-2">
        <div className="container pt-32">
          <div className="py-6">
            <h2 className="font-bold text-2xl text-primary-11">나의 티켓</h2>
          </div>
        </div>
      </header>
      <main className="bg-neutral-1 py-6 border-t border-solid border-neutral-6">
        <div className="container">
          <TicketsList />
        </div>
      </main>
    </MainLayout>
  );
}

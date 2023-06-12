import { Link } from "react-router-dom";
import MainLayout from "../../../_layouts/main-layout";
import { SortDirection, useGetApi, useGetApiWithPagination } from "@/services/api";
import PaginationBar from "@/components/pagination/pagination-bar";
import { DialogBody, DialogFooter, DialogLayout, DialogSheet, useDialog } from "@/components/ui/modal/dialog";
import { useCallback } from "react";
import { Button, Loader } from "@/components/ui";
import { TicketListEntry, TicketState, displayTicketState } from "@/types";
import clsx from "clsx";
import { GetTicketsSortBy, getTicketDetail, getTickets } from "@/services/ticket/ticket.service";
import { useAuthGuard } from "@/services/user/user.application";
import { date, fmt } from "@/utils/date";

const styleTicketStateChip: Record<TicketState, string> = {
  [TicketState.Issued]: "bg-blue-2 outline-blue-4",
  [TicketState.Payed]: "bg-green-2 outline-green-4",
  [TicketState.Pending]: "bg-gray-2 outline-gray-4",
  [TicketState.Canceled]: "bg-red-2 outline-red-4",
};

function TicketItem({ ticket, className }: { ticket: TicketListEntry } & BaseProps) {
  const { showDialog } = useDialog();

  if (!ticket.schedule) {
    return null;
  }

  return (
    <Link to={`/my/ticket/d/${ticket.ticketNum}`} className={clsx(className, "card card-pressable block p-4")}>
      <div className="">
        <span className="text-lg font-bold">{ticket.schedule.movie.title}</span>
        <span className={clsx("ml-2 px-2 font-bold out-1 rounded-full", styleTicketStateChip[ticket.ticketState])}>
          {displayTicketState[ticket.ticketState]}
        </span>
      </div>
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
    </Link>
  );
}

function TicketsList() {
  const currentUser = useAuthGuard(false);

  const tickets = useGetApiWithPagination(
    (page, size) =>
      getTickets({
        page,
        size,
        userNum: currentUser.userNum,
        sortBy: GetTicketsSortBy.createdDate,
        sortDir: SortDirection.desc,
      }),
    {
      initialPage: 0,
      pageSize: 12,
    }
  );

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

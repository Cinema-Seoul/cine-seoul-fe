import AdminDataComplex, { ListHeadEntry } from "@/components/admin-data-complex";
import { getTickets } from "@/services/ticket/ticket.service";
import { TicketListEntry, TicketState } from "@/types";
import { date, fmt } from "@/utils/date";

const LIST_HEADS: ListHeadEntry<TicketListEntry>[] = [
  {
    key: "ticketNum",
    label: "티켓 번호",
  },
  {
    key: "createdAt",
    label: "예매 일시",
    value: (item) => fmt(date(item.createdAt), "Pp"),
  },
  {
    key: "salePrice",
    label: "판매 가격",
  },
  {
    key: "stdPrice",
    label: "표준 가격",
  },
  {
    key: "ticketState",
    label: "티켓 상태",
  },
  {
    key: "scheduleSeats",
    label: "좌석",
    value: ({ scheduleSeats }) => scheduleSeats.map(({ seat }) => `${seat.row}${seat.col}`).join(", "),
  },
];

function DataBody() {
  return <AdminDataComplex listHead={LIST_HEADS} onGetList={(page, size) => getTickets({ page, size })} />;
}

export default function AdminTicketListPage() {
  return (
    <>
      <DataBody />
    </>
  );
}

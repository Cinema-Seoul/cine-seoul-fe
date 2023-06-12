import { CreationHeadEntry, DetailHeadEntry, EditHeadEntry, ListHeadEntry } from "@/components/admin-data-complex";
import { ScheduleCreation, TicketListEntry, TicketState, TicketUpdating, displayTicketState } from "@/types";
import { date, fmt } from "@/utils/date";

export const listHead: ListHeadEntry<TicketListEntry>[] = [
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
    value: ({ ticketState }) => displayTicketState[ticketState],
  },
  {
    key: "ticketSeats",
    label: "좌석",
    value: ({ ticketSeats }) => ticketSeats.map(({ seat }) => `${seat.row}${seat.col}`).join(", "),
  },
];

export const detailHead: DetailHeadEntry<TicketListEntry>[] = [
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
    key: "ticketState",
    label: "티켓 상태",
  },
  {
    key: "ticketSeats",
    label: "좌석",
    value: ({ ticketSeats }) => ticketSeats.map(({ seat }) => `${seat.row}${seat.col}`).join(", "),
  },
];

export const editHead: EditHeadEntry<TicketUpdating>[] = [
  {
    key: 'ticketState',
    label: '티켓 상태',
    editType: [
      { display: '발권됨', value: TicketState.Issued },
      { display: '결제됨', value: TicketState.Payed },
      { display: '결제 대기 중', value: TicketState.Pending },
      { display: '취소', value: TicketState.Canceled },
    ],
  },
];

export const createHead: CreationHeadEntry<ScheduleCreation>[] = [
  {
    key: 'order',
    label: '상영회차',
    editType: 'number',
  },
  {
    key: 'schedTime',
    label: '상영시각',
    editType: 'datetime',
  },
  {
    key: 'screenNum',
    label: '상영관 번호',
    editType: 'number',
  },
  {
    key: 'movieNum',
    label: '영화번호',
    editType: 'number',
  },
];



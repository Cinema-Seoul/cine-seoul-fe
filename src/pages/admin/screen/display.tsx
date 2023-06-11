import { CreationHeadEntry, DetailHeadEntry, EditHeadEntry, ListHeadEntry } from "@/components/admin-data-complex";
import ScreenSeats from "@/components/screen/screen-seats";
import { Is, Screen } from "@/types";

export const listHead: ListHeadEntry<Screen>[] = [
  {
    key: "screenNum",
    label: "상영관 번호",
  },
  {
    key: "name",
    label: "상영관 이름",
  },
  {
    key: "totalSeat",
    label: "총 좌석 수",
  },
];

export const detailHead: DetailHeadEntry<Screen>[] = [
  ({ seats }) => (
    <div className="overflow-x-auto w-full">
      <ScreenSeats className="" seats={seats.map((seat) => ({ isOccupied: Is.False, seat }))} />
    </div>
  ),
  {
    key: "screenNum",
    label: "상영관 번호",
  },
  {
    key: "name",
    label: "상영관 이름",
  },
  {
    key: "totalSeat",
    label: "총 좌석 수",
  },
];

export const editHead: EditHeadEntry<Screen>[] = [
  {
    key: "screenNum",
    label: "번호",
    editType: 'inherit',
  },
  {
    key: "name",
    label: "상영관 이름",
    editType: "text",
  },
  {
    key: "totalSeat",
    label: "총 좌석 수",
    editType: "number",
  },
];

export const creationHead: CreationHeadEntry<Screen>[] = [
  {
    key: "name",
    label: "상영관 이름",
    editType: "text",
  },
  {
    key: "totalSeat",
    label: "총 좌석 수",
    editType: "number",
  },
];

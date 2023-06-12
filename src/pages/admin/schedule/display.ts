import { CreationHeadEntry, DetailHeadEntry, EditHeadEntry, ListHeadEntry } from "@/components/admin-data-complex";
import { ScheduleCreation, ScheduleDetail, ScheduleListEntry, ScheduleUpdating } from "@/types";
import { date, fmt } from "@/utils/date";

export const listHead: ListHeadEntry<ScheduleListEntry>[] = [
  {
    key: "schedNum",
    label: "번호",
  },
  {
    key: "schedTime",
    label: "상영시각",
    value: ({ schedTime }) => fmt(date(schedTime), "PPPp"),
  },
  {
    key: "movie",
    label: "영화",
    value: ({ movie: { title } }) => title,
  },
  {
    key: "screen",
    label: "상영관",
    value: ({ screen: { name } }) => name,
  },
  {
    key: "emptySeat",
    label: "잔여석 수",
    value: ({ emptySeat, screen: { totalSeat } }) => `${emptySeat} / ${totalSeat}`,
  },
];

export const detailHead: DetailHeadEntry<ScheduleDetail>[] = [
  {
    key: "schedNum",
    label: "번호",
  },
  {
    key: "schedTime",
    label: "상영시각",
    value: ({ schedTime }) => fmt(date(schedTime), "PPPp"),
  },
  {
    key: "movie",
    label: "영화",
    value: ({ movie: { title } }) => title,
  },
  {
    key: "screen",
    label: "상영관",
    value: ({ screen: { name } }) => name,
  },
  {
    key: "emptySeat",
    label: "잔여석 수",
    value: ({ emptySeat, screen: { totalSeat } }) => `${emptySeat} / ${totalSeat}`,
  },
];

export const editHead: EditHeadEntry<ScheduleUpdating>[] = [
  {
    key: "schedNum",
    label: "번호",
    editType: "inherit",
  },
  {
    key: "order",
    label: "상영회차",
    editType: "number",
  },
  {
    key: "schedTime",
    label: "상영시각",
    editType: "datetime",
  },
  {
    key: "screenNum",
    label: "상영관 번호",
    editType: "number",
  },
];

export const createHead: CreationHeadEntry<ScheduleCreation>[] = [
  {
    key: "order",
    label: "상영회차",
    editType: "number",
  },
  {
    key: "schedTime",
    label: "상영시각",
    editType: "datetime",
  },
  {
    key: "screenNum",
    label: "상영관 번호",
    editType: "number",
  },
  {
    key: "movieNum",
    label: "영화번호",
    editType: "number",
  },
];

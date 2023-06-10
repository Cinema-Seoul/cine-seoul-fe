import { CreationHeadEntry, DetailHeadEntry, EditHeadEntry, ListHeadEntry } from "@/components/admin-data-complex";
import { MovieCreation, MovieDetail, MovieListEntry, MovieUpdating } from "@/types";
import { fmt } from "@/utils/date";

export const listHead: ListHeadEntry<MovieListEntry>[] = [
  {
    key: "movieNum",
    label: "영화 번호",
  },
  {
    key: "title",
    label: "제목",
  },
  {
    key: "gradeName",
    label: "등급",
  },
  {
    key: "isShowing",
    label: "상영여부",
  },
  {
    key: "ticketCount",
    label: "판매량",
  },
];

export const detailhead: DetailHeadEntry<MovieDetail>[] = [
  {
    key: "movieNum",
    label: "영화번호",
  },
  {
    key: "title",
    label: "제목",
  },
  {
    key: "poster",
    label: "포스터",
    value: ({ poster }) => (
      <div className="w-32">
        <img src={poster} />
        <span>{poster}</span>
      </div>
    ),
  },

  {
    key: "releaseDate",
    label: "개봉일",
  },
  {
    key: "title",
    label: "제목",
  },
  {
    key: "title",
    label: "제목",
  },
  {
    key: "title",
    label: "제목",
  },
  {
    key: "title",
    label: "제목",
  },
  {
    key: "title",
    label: "제목",
  },
];

export const editHead: EditHeadEntry<MovieUpdating>[] = [
  {
    key: "movieNum",
    label: "영화 번호",
  },
  {
    key: "title",
    label: "제목",
    editType: "text",
  },
  {
    key: "poster",
    label: "포스터",
    editType: "text",
  },
  {
    key: "releaseDate",
    label: "개봉일",
    editType: "date",
    setValue: (value: Date) => fmt(value, "yyyyMMdd") ?? "",
  },
  {
    key: "info",
    label: "설명글",
    editType: "text",
  },
  {
    key: "actorNumList",
    label: "배우번호 목록 (,로 구분)",
    editType: "text",
    setValue: (value: string) => value.split(/\s*,\s*/),
  },
];

export const createHead: CreationHeadEntry<MovieCreation>[] = [];

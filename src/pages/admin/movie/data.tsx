import { CreationHeadEntry, DetailHeadEntry, EditHeadEntry, ListHeadEntry } from "@/components/admin-data-complex";
import { Is, MovieCreation, MovieDetail, MovieListEntry, MovieUpdating } from "@/types";
import { date, fmt, parse8DigitDateString } from "@/utils/date";

/* -------------------------------------------------------------------------- */
/*                                    LIST                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                   DETAIL                                   */
/* -------------------------------------------------------------------------- */

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
      <>
        <img src={poster} className="max-h-96" />
        <span>{poster}</span>
      </>
    ),
  },
  {
    key: "releaseDate",
    label: "개봉일",
  },
  {
    key: "isShowing",
    label: "상영 여부",
  },
  {
    key: "info",
    label: "정보글",
  },
  {
    key: "runningTime",
    label: "상영 시간",
  },
  {
    key: "gradeName",
    label: "관람등급",
    value: ({ gradeName }) => gradeName.name,
  },
  {
    key: "countryList",
    label: "국가",
    value: ({ countryList }) => countryList.map(({ name }) => name).join(", "),
  },
  {
    key: "genreList",
    label: "장르",
    value: ({ genreList }) => genreList.map(({ name }) => name).join(", "),
  },
  {
    key: "actorList",
    label: "주요 출연진",
    value: ({ actorList }) => actorList.map(({ name }) => name).join(", "),
  },
  {
    key: "directorList",
    label: "감독",
    value: ({ directorList }) => directorList.map(({ name }) => name).join(", "),
  },
  {
    key: "distName",
    label: "배급사",
  },
];

export const editHead: EditHeadEntry<MovieUpdating, MovieDetail>[] = [
  {
    key: "movieNum",
    label: "영화번호",
    editType: "inherit",
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
    editType: "text",
  },
  {
    key: "isShowing",
    label: "상영 여부",
    editType: [
      { display: "상영 중", value: Is.True },
      { display: "아님", value: Is.False },
    ],
  },
  {
    key: "info",
    label: "정보글",
    editType: "text",
  },
  {
    key: "runningTime",
    label: "상영 시간",
    editType: "number",
  },
  {
    key: "gradeCode",
    label: "관람등급",
    editType: "text",
  },
  {
    key: "countryList",
    label: "국가",
    editType: "text",
    initialValue: (detail) => detail?.countryList?.map(({ countryCode }) => countryCode).join(","),
    setValue: (value: string) => value?.split(","),
  },
  {
    key: "genreCodeList",
    label: "장르",
    editType: "text",
    initialValue: (detail) => detail?.genreList?.map(({ genreCode }) => genreCode).join(","),
    setValue: (value: string) => value?.split(","),
  },
  {
    key: "actorNumList",
    label: "주요 출연진",
    editType: "text",
    initialValue: (detail) => detail?.actorList?.map(({ actNum }) => actNum).join(","),
    setValue: (value: string) => value?.split(","),
  },
  {
    key: "directorNumList",
    label: "감독",
    editType: "text",
    initialValue: (detail) => detail?.directorList?.map(({ dirNum }) => dirNum).join(","),
    setValue: (value: string) => value?.split(","),
  },
  {
    key: "distNum",
    label: "배급사",
    editType: "text",
    // initialValue: (detail) => detail?.,
  },
];

export const createHead: CreationHeadEntry<MovieCreation>[] = [
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
    setValue: (value: Date) => value?.toISOString().slice(0, 10).replaceAll("-", ""),
  },
  {
    key: "isShowing",
    label: "상영 여부",
    editType: [
      { display: "상영 중", value: Is.True },
      { display: "아님", value: Is.False },
    ],
  },
  {
    key: "info",
    label: "정보글",
    editType: "text",
  },
  {
    key: "runningTime",
    label: "상영 시간",
    editType: "number",
  },
  {
    key: "gradeCode",
    label: "관람등급",
    editType: "text",
  },
  {
    key: "countryList",
    label: "국가",
    editType: "text",
    setValue: (value: string) => value?.split(","),
  },
  {
    key: "genreCodeList",
    label: "장르",
    editType: "text",
    setValue: (value: string) => value?.split(","),
  },
  {
    key: "actorNumList",
    label: "주요 출연진",
    editType: "text",
    setValue: (value: string) => value?.split(","),
  },
  {
    key: "directorNumList",
    label: "감독",
    editType: "text",
    setValue: (value: string) => value?.split(","),
  },
  {
    key: "distNum",
    label: "배급사",
    editType: "text",
    // initialValue: (detail) => detail?.,
  },
];

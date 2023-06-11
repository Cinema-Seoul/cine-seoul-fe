import { CreationHeadEntry, DetailHeadEntry, EditHeadEntry, ListHeadEntry } from "@/components/admin-data-complex";
import { EventCreation, EventDetail, EventListEntry, EventUpdating } from "@/types/event";
import { date, fmt } from "@/utils/date";

/* -------------------------------------------------------------------------- */
/*                                    LIST                                    */
/* -------------------------------------------------------------------------- */

export const listHead: ListHeadEntry<EventListEntry>[] = [
  {
    key: "eventNum",
    label: "번호",
  },
  {
    key: "title",
    label: "제목",
  },
  {
    key: "startAt",
    label: "시작일",
    value: ({ startAt }) => fmt(date(startAt), "Pp"),
  },
  {
    key: "endAt",
    label: "종료일",
    value: ({ endAt }) => fmt(date(endAt), "Pp"),
  },
  {
    key: "views",
    label: "조회수",
  },
];

/* -------------------------------------------------------------------------- */
/*                                   DETAIL                                   */
/* -------------------------------------------------------------------------- */

export const detailHead: DetailHeadEntry<EventDetail>[] = [
  {
    key: "eventNum",
    label: "번호",
  },
  {
    key: "title",
    label: "제목",
  },
  {
    key: "startAt",
    label: "시작일",
    value: ({ startAt }) => fmt(date(startAt), "Pp"),
  },
  {
    key: "endAt",
    label: "종료일",
    value: ({ endAt }) => fmt(date(endAt), "Pp"),
  },
  {
    key: "views",
    label: "조회수",
  },
  {
    key: "createdAt",
    label: "작성일",
    value: ({ createdAt }) => fmt(date(createdAt), "Pp"),
  },
  {
    key: "banner",
    label: "배너이미지",
    value: ({ banner }) => (
      <>
        <img src={banner} className="max-h-96" />
        <div>{banner}</div>
      </>
    ),
  },
  {
    key: "contents",
    label: "본문",
  },
  {
    key: "image",
    label: "본문이미지",
    value: ({ image }) => (
      <>
        <img src={image} className="max-h-192" />
        <div>{image}</div>
      </>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*                                    EDIT                                    */
/* -------------------------------------------------------------------------- */

export const editHead: EditHeadEntry<EventUpdating>[] = [
  {
    key: 'eventNum',
    label: '',
    editType: 'inherit',
  },
  {
    key: 'title',
    label: '제목',
    editType: 'text',
  },
  {
    key: 'startAt',
    label: '시작일',
    editType: 'datetime',
  },
  {
    key: 'endAt',
    label: '종료일',
    editType: 'datetime',
  },
  {
    key: 'banner',
    label: '배너이미지',
    editType: 'text',
  },
  {
    key: 'contents',
    label: '본문',
    editType: 'text',
  },
  {
    key: 'image',
    label: '본문이미지',
    editType: 'text',
  },
];

/* -------------------------------------------------------------------------- */
/*                                   CREATE                                   */
/* -------------------------------------------------------------------------- */

export const createHead: CreationHeadEntry<EventCreation>[] = [
  {
    key: 'title',
    label: '제목',
    editType: 'text',
  },
  {
    key: 'startAt',
    label: '시작일',
    editType: 'datetime',
  },
  {
    key: 'endAt',
    label: '종료일',
    editType: 'datetime',
  },
  {
    key: 'banner',
    label: '배너이미지',
    editType: 'text',
  },
  {
    key: 'contents',
    label: '본문',
    editType: 'text',
  },
  {
    key: 'image',
    label: '본문이미지',
    editType: 'text',
  },
];

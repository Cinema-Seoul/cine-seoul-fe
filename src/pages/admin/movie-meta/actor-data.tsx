import { CreationHeadEntry, DetailHeadEntry, EditHeadEntry, ListHeadEntry } from "@/components/admin-data-complex";
import { ActorCreation, ActorDetail, ActorListEntry, ActorUpdating } from "@/types";

/* -------------------------------------------------------------------------- */
/*                                    LIST                                    */
/* -------------------------------------------------------------------------- */

export const listHead: ListHeadEntry<ActorListEntry>[] = [
  {
    key: 'actNum',
    label: '번호',
  },
  {
    key: 'name',
    label: '이름',
  },
];

/* -------------------------------------------------------------------------- */
/*                                   DETAIL                                   */
/* -
------------------------------------------------------------------------- */
export const detailHead: DetailHeadEntry<ActorDetail>[] = [
  {
    key: 'actNum',
    label: '번호',
  },
  {
    key: 'imgUrl',
    label: '이미지',
    value: ({ imgUrl }) => <img src={imgUrl} className="max-h-64" />
  },
  {
    key: 'name',
    label: '이름',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    EDIT                                    */
/* -------------------------------------------------------------------------- */

export const editHead: EditHeadEntry<ActorUpdating>[] = [
  {
    key: 'actNum',
    label: '번호',
    editType: 'inherit',
  },
  {
    key: 'imgUrl',
    label: '이미지',
    editType: 'text',
  },
  {
    key: 'name',
    label: '이름',
    editType: 'text',
  },
];

/* -------------------------------------------------------------------------- */
/*                                   CREATE                                   */
/* -------------------------------------------------------------------------- */

export const createHead: CreationHeadEntry<ActorCreation>[] = [
  {
    key: 'imgUrl',
    label: '이미지',
    editType: 'text',
  },
  {
    key: 'name',
    label: '이름',
    editType: 'text',
  },
];

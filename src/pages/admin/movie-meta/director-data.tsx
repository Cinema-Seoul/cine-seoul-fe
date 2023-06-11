import { CreationHeadEntry, DetailHeadEntry, EditHeadEntry, ListHeadEntry } from "@/components/admin-data-complex";
import { DirectorCreation, DirectorDetail, DirectorListEntry } from "@/types";

/* -------------------------------------------------------------------------- */
/*                                    LIST                                    */
/* -------------------------------------------------------------------------- */

export const listHead: ListHeadEntry<DirectorListEntry>[] = [
  {
    key: 'dirNum',
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
export const detailHead: DetailHeadEntry<DirectorDetail>[] = [
  {
    key: 'dirNum',
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

// export const editHead: EditHeadEntry<DirectorUpdating>[] = [
//   {
//     key: 'dirNum',
//     label: '번호',
//     editType: 'inherit',
//   },
//   {
//     key: 'imgUrl',
//     label: '이미지',
//     editType: 'text',
//   },
//   {
//     key: 'name',
//     label: '이름',
//     editType: 'text',
//   },
// ];

/* -------------------------------------------------------------------------- */
/*                                   CREATE                                   */
/* -------------------------------------------------------------------------- */

export const createHead: CreationHeadEntry<DirectorCreation>[] = [
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

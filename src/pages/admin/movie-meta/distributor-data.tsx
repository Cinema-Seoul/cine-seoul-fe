import { CreationHeadEntry, DetailHeadEntry, EditHeadEntry, ListHeadEntry } from "@/components/admin-data-complex";
import { DistributorCreation, DistributorDetail, DistributorListEntry } from "@/types";

/* -------------------------------------------------------------------------- */
/*                                    LIST                                    */
/* -------------------------------------------------------------------------- */

export const listHead: ListHeadEntry<DistributorListEntry>[] = [
  {
    key: 'distNum',
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
export const detailHead: DetailHeadEntry<DistributorDetail>[] = [
  {
    key: 'distNum',
    label: '번호',
  },
  {
    key: 'name',
    label: '이름',
  },
];

/* -------------------------------------------------------------------------- */
/*                                    EDIT                                    */
/* -------------------------------------------------------------------------- */

// export const editHead: EditHeadEntry<DistributorUpdating>[] = [
//   {
//     key: 'distNum',
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

export const createHead: CreationHeadEntry<DistributorCreation>[] = [
  {
    key: 'name',
    label: '이름',
    editType: 'text',
  },
];

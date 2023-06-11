import { DetailHeadEntry, EditHeadEntry, ListHeadEntry } from "@/components/admin-data-complex";
import { UserDetail, UserEditing, UserListEntry, nameUserRole } from "@/types";
import { date, fmt } from "@/utils/date";

/* -------------------------------------------------------------------------- */
/*                                    LIST                                    */
/* -------------------------------------------------------------------------- */

export const listHead: ListHeadEntry<UserListEntry>[] = [
  {
    key: "userNum",
    label: "사용자 번호",
  },
  {
    key: "id",
    label: "아이디",
  },
  {
    key: "name",
    label: "이름",
  },
  {
    key: "point",
    label: "포인트",
  },
  {
    key: "phoneNum",
    label: "전화 번호",
  },
  {
    key: "createdAt",
    label: "가입일시",
    value: ({ createdAt }) => fmt(date(createdAt), "Pp"),
  },
];

/* -------------------------------------------------------------------------- */
/*                                   DETAIL                                   */
/* -------------------------------------------------------------------------- */

export const detailHead: DetailHeadEntry<UserDetail>[] = [
  {
    key: "userNum",
    label: "사용자 번호",
  },
  {
    key: "id",
    label: "아이디",
  },
  {
    key: "name",
    label: "이름",
  },
  {
    key: "point",
    label: "포인트",
  },
  {
    key: "phoneNum",
    label: "전화 번호",
  },
  {
    key: "createdAt",
    label: "가입일시",
    value: ({ createdAt }) => fmt(date(createdAt), "Pp"),
  },
  {
    key: "role",
    label: "역할",
    value: ({ role }) => nameUserRole[role],
  },
];

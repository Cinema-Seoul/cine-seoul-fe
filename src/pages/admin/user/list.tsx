import AdminDataComplex, { ListHeadEntry } from "@/components/admin-data-complex";
import { getPayments } from "@/services/payment.service";
import { getUsers } from "@/services/user/user.service";
import { PaymentListEntry, User, UserListEntry } from "@/types";
import { date, fmt } from "@/utils/date";

const LIST_HEADS: ListHeadEntry<UserListEntry>[] = [
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

function DataBody() {
  return <AdminDataComplex listHead={LIST_HEADS} onGetList={(page, size) => getUsers({ page, size })} />;
}

export default function AdminUserListPage() {
  return (
    <>
      <DataBody />
    </>
  );
}

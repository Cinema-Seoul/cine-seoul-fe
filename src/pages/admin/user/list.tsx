import AdminDataComplex from "@/components/admin-data-complex";
import { getUserDetail, getUsers } from "@/services/user/user.service";
import { detailHead, listHead } from "./data";

function DataBody() {
  return (
    <AdminDataComplex
      listHead={listHead}
      onGetList={(page, size) => getUsers({ page, size })}
      detailHead={detailHead}
      onGetDetail={({ userNum }) => getUserDetail(userNum)}
    />
  );
}

export default function AdminUserListPage() {
  return (
    <>
      <DataBody />
    </>
  );
}

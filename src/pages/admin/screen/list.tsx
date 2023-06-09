import AdminDataComplex, { ListHeadEntry } from "@/components/admin-data-complex";
import { getScreens } from "@/services/screen.service";
import { Screen } from "@/types";

const LIST_HEADS: ListHeadEntry<keyof Screen>[] = [
  {
    key: "screenNum",
    label: "상영관 번호",
  },
  {
    key: "name",
    label: "상영관 이름",
  },
  {
    key: "totalSeat",
    label: "총 좌석 수",
  },
];

function DataBody() {
  return (
    <AdminDataComplex
      listHead={LIST_HEADS}
      onGetList={() => getScreens().then((screens) => ({ list: screens, totalPages: 0 }))}
    />
  );
}

export default function AdminScreenListPage() {
  return <>
    <DataBody />
  </>;
}

import AdminDataComplex, { ListHeadEntry } from "@/components/admin-data-complex";
import { getDistributors } from "@/services/movie-meta/distributor.service";
import { DistributorListEntry } from "@/types";

const LIST_HEADS: ListHeadEntry<DistributorListEntry>[] = [
  {
    key: "distNum",
    label: "배급사 번호",
  },
  {
    key: "name",
    label: "이름",
  },
];

function DataBody() {
  return <AdminDataComplex listHead={LIST_HEADS} onGetList={(page, size) => getDistributors({ page, size })} />;
}

export default function AdminDistributorListPage() {
  return (
    <>
      <DataBody />
    </>
  );
}

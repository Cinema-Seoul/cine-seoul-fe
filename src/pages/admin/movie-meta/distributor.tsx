import AdminDataComplex, { ListHeadEntry } from "@/components/admin-data-complex";
import { createDistributor, getDistributorDetail, getDistributors } from "@/services/movie-meta/distributor.service";
import { DistributorListEntry } from "@/types";
import { createHead, detailHead, listHead } from "./distributor-data";

function DataBody() {
  return (
    <AdminDataComplex
      listHead={listHead}
      onGetList={(page, size) => getDistributors({ page, size })}
      detailHead={detailHead}
      onGetDetail={({ distNum }) => getDistributorDetail(distNum)}
      creationHead={createHead}
      onSubmitCreate={(result) => createDistributor(result)}
    />
  );
}

export default function AdminDistributorListPage() {
  return (
    <>
      <DataBody />
    </>
  );
}

import AdminDataComplex from "@/components/admin-data-complex";
import { createDirector, getDirectorDetail, getDirectors } from "@/services/movie-meta/director.service";
import { createHead, detailHead, listHead } from "./director-data";

function DataBody() {
  return (
    <AdminDataComplex
      listHead={listHead}
      onGetList={(page, size) => getDirectors({ page, size })}
      detailHead={detailHead}
      onGetDetail={({ dirNum }) => getDirectorDetail(dirNum)}
      creationHead={createHead}
      onSubmitCreate={(result) => createDirector(result)}
    />
  );
}

export default function AdminDirectorListPage() {
  return (
    <>
      <DataBody />
    </>
  );
}

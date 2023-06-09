import AdminDataComplex, { ListHeadEntry } from "@/components/admin-data-complex";
import { getActors } from "@/services/movie-meta/actor.service";
import { getDirectors } from "@/services/movie-meta/director.service";
import { getScreens } from "@/services/screen.service";
import { ActorListEntry, DirectorListEntry, Screen } from "@/types";

const LIST_HEADS: ListHeadEntry<DirectorListEntry>[] = [
  {
    key: "dirNum",
    label: "감독 번호",
  },
  {
    key: "name",
    label: "이름",
  },
];

function DataBody() {
  return <AdminDataComplex listHead={LIST_HEADS} onGetList={(page, size) => getDirectors({ page, size })} />;
}

export default function AdminDirectorListPage() {
  return (
    <>
      <DataBody />
    </>
  );
}

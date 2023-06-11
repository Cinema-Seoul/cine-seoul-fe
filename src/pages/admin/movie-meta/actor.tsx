import AdminDataComplex, {
  OnSetCreated
} from "@/components/admin-data-complex";
import { createActor, getActorDetail, getActors } from "@/services/movie-meta/actor.service";
import { ActorCreation } from "@/types";
import { createHead, detailHead, editHead, listHead } from "./actor-data";

function DataBody() {
  return (
    <AdminDataComplex
      //L
      listHead={listHead}
      onGetList={(page, size) => getActors({ page, size })}
      //D
      detailHead={detailHead}
      onGetDetail={({ actNum }) => getActorDetail(actNum)}
      //C
      creationHead={createHead}
      onSubmitCreate={((result) => createActor(result)) as OnSetCreated<ActorCreation>}
    />
  );
}

export default function AdminActorListPage() {
  return (
    <>
      <DataBody />
    </>
  );
}

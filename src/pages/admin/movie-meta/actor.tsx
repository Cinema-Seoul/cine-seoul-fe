import AdminDataComplex, {
  CreationHeadEntry,
  DetailHeadEntry,
  ListHeadEntry,
  OnSetCreated,
} from "@/components/admin-data-complex";
import { createActor, getActorDetail, getActors } from "@/services/movie-meta/actor.service";
import { getScreens } from "@/services/screen.service";
import { ActorCreation, ActorDetail, ActorListEntry, Screen } from "@/types";

const LIST_HEADS: ListHeadEntry<ActorListEntry>[] = [
  {
    key: "actNum",
    label: "배우 번호",
  },
  {
    key: "name",
    label: "이름",
  },
];

const DETAIL_HEADS: DetailHeadEntry<ActorDetail>[] = [
  {
    key: "imgUrl",
    label: "이미지",
    value: ({ imgUrl }) => (
      <>
        <img src={imgUrl} />
        <span>{imgUrl}</span>
      </>
    ),
  },
  {
    key: "actNum",
    label: "배우 번호",
  },
  {
    key: "name",
    label: "이름",
  },
];

const CREATION_HEADS: CreationHeadEntry<ActorCreation>[] = [
  {
    key: "imgUrl",
    label: "이미지",
    editable: true,
    editType: "image_url",
  },
  {
    key: "name",
    label: "이름",
    editable: true,
    editType: "text",
  },
];

function DataBody() {
  return (
    <AdminDataComplex
      listHead={LIST_HEADS}
      onGetList={(page, size) => getActors({ page, size })}
      detailHead={DETAIL_HEADS}
      onGetDetail={({ actNum }) => getActorDetail(actNum)}
      creationHead={CREATION_HEADS}
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

export type ActorDetail = {
  actNum: number;
  imgUrl?: string;
  name: string;
};

export type ActorListEntry = {
  actNum: number;
  imgUrl?: string;
  name: string;
}

export type ActorUpdating = {
  actNum: number;
  imgUrl?: string;
  name?: string;
}
export type ActorCreation = {
  imgUrl?: string;
  name: string;
}
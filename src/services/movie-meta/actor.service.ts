import axios from "axios";
import { PagableRequest, SortableRequest } from "../api";
import { ActorCreation, ActorDetail, ActorListEntry, ListResponse } from "@/types";

/* -------------------------------------------------------------------------- */
/*                                    Actor                                   */
/* -------------------------------------------------------------------------- */

/** GET /actor */

export enum GetActorsSortBy {
  name = "name",
}

export interface GetActorsOptions extends PagableRequest, SortableRequest<GetActorsSortBy> {}

export function getActors({
  page = 0,
  size = 12,
  sortBy,
  sortDir: sort_dir,
}: GetActorsOptions): Promise<ListResponse<ActorListEntry>> {
  return axios
    .get<ListResponse<ActorListEntry>>("/actor", {
      params: { page, size, sort_name: sortBy === GetActorsSortBy.name, sort_dir },
    })
    .then((res) => res.data);
}

/** POST /actor */

export function createActor(body: ActorCreation): Promise<unknown> {
  return axios.post("/actor", { ...body }).then((res) => res.data);
}

/** GET /actor/{num} */

export function getActorDetail(actorNum: number): Promise<ActorDetail> {
  return axios.get<ActorDetail>(`/actor/${actorNum}`).then(res => res.data);
}

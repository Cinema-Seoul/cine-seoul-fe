import axios from "axios";
import { PagableRequest, SortableRequest } from "../api";
import { DirectorCreation, DirectorDetail, DirectorListEntry, ListResponse } from "@/types";

/* -------------------------------------------------------------------------- */
/*                                  Director                                  */
/* -------------------------------------------------------------------------- */

/** GET /director */

export enum GetDirectorsSortBy {
  name = "name",
}

export interface GetDirectorsOptions extends PagableRequest, SortableRequest<GetDirectorsSortBy> {}

export function getDirectors({
  page = 0,
  size = 12,
  sortBy,
  sortDir: sort_dir,
}: GetDirectorsOptions): Promise<ListResponse<DirectorListEntry>> {
  return axios
    .get<ListResponse<DirectorListEntry>>("/director", {
      params: { page, size, sort_name: sortBy === GetDirectorsSortBy.name, sort_dir },
    })
    .then((res) => res.data);
}

/** POST /director */

export function createDirector(body: DirectorCreation): Promise<unknown> {
  return axios.post("/director", { ...body }).then((res) => res.data);
}

/** GET /director/{num} */

export function getDirectorDetail(directorNum: number): Promise<DirectorDetail> {
  return axios.get<DirectorDetail>(`/director/${directorNum}`).then(res => res.data);
}

import axios from "axios";
import { PagableRequest, SortableRequest } from "../api";
import { DistributorCreation, DistributorDetail, DistributorListEntry, ListResponse } from "@/types";

/* -------------------------------------------------------------------------- */
/*                                 Distributor                                */
/* -------------------------------------------------------------------------- */

/** GET /distributor */

export enum GetDistributorsSortBy {
  name = "name",
}

export interface GetDistributorsOptions extends PagableRequest, SortableRequest<GetDistributorsSortBy> {}

export function getDistributors({
  page = 0,
  size = 12,
  sortBy,
  sortDir: sort_dir,
}: GetDistributorsOptions): Promise<ListResponse<DistributorListEntry>> {
  return axios
    .get<ListResponse<DistributorListEntry>>("/distributor", {
      params: { page, size, sort_name: sortBy === GetDistributorsSortBy.name, sort_dir },
    })
    .then((res) => res.data);
}

/** POST /distributor */

export function createDistributor(body: DistributorCreation): Promise<unknown> {
  return axios.post("/distributor", { ...body }).then((res) => res.data);
}

/** GET /distributor/{num} */

export function getDistributorDetail(distributorNum: number): Promise<DistributorDetail> {
  return axios.get<DistributorDetail>(`/distributor/${distributorNum}`).then(res => res.data);
}

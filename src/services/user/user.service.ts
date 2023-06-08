/* -------------------------------------------------------------------------- */
/*                                    User                                    */
/* -------------------------------------------------------------------------- */

import { ListResponse, User, UserEditing, UserSignInMember, UserSignInNonmember } from "@/types";
import axios from "axios";
import { PagableRequest, SortableRequest } from "../api";

/** POST /user */

/** GET /user/admin */

export enum GetUsersSortBy {
  Name = "name",
}

export interface GetUsersOptions extends PagableRequest, SortableRequest<GetUsersSortBy> {}

export async function getUsers({
  page,
  size,
  sortBy,
  sortDir: sort_dir,
}: GetUsersOptions): Promise<ListResponse<User>> {
  return axios
    .get("/user/admin", { params: { page, size, sort_name: sortBy === GetUsersSortBy.Name, sort_dir } })
    .then((res) => res.data);
}

/** PUT /user/auth */

export async function editUserDetail(body: UserEditing): Promise<User> {
  return axios.put("/user/auth", { ...body }).then((res) => res.data);
}

/** GET /user/auth/{num} */

export async function getUserDetail(userNum: number): Promise<User> {
  return axios.get(`/user/auth/${userNum}`).then((res) => res.data);
}

/** POST /user/login */

export async function requestSignInMember(body: UserSignInMember): Promise<string> {
  return axios.post("/user/login", { ...body }).then((res) => res.data.data);
}

export async function requestSignInNonmember(body: UserSignInNonmember): Promise<string> {
  return axios.post("/user/login/notmember", { ...body }).then((res) => res.data.data);
}

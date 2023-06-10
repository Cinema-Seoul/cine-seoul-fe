/* -------------------------------------------------------------------------- */
/*                                    User                                    */
/* -------------------------------------------------------------------------- */

import { ListResponse, User, UserCreation, UserEditing, UserRole, UserSignInMember, UserSignInNonmember } from "@/types";
import axios from "axios";
import { PagableRequest, SortableRequest } from "../api";

/** POST /user */

export async function signUpMember(body: Omit<UserCreation, 'role'>): Promise<unknown> {
  return axios.post('/user', { ...body, role: UserRole.member } as UserCreation).then(res => res.data); 
}
export async function signUpNonmember(body: UserSignInNonmember): Promise<unknown> {
  return axios.post('/user', { ...body, role: UserRole.nonmember  }).then(res => res.data); 
}
export async function signUpAdmin(body: Omit<UserCreation, 'role'>): Promise<unknown> {
  return axios.post('/user', { ...body, role: UserRole.admin } as UserCreation).then(res => res.data); 
}

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

/** GET /user/admin/{num} */

export async function getUserDetail(userNum: number): Promise<User> {
  return axios.get(`/user/admin/${userNum}`).then((res) => res.data);
}

/** GET /user/auth */

export async function getMe(): Promise<User> {
  return axios.get("/user/auth").then((res) => res.data);
}

/** PUT /user/auth */

export async function editMyDetail(body: UserEditing): Promise<User> {
  return axios.put("/user/auth", { ...body }).then((res) => res.data);
}

/** POST /user/login */

export async function requestSignInMember(body: UserSignInMember): Promise<string> {
  return axios.post("/user/login", { ...body }).then((res) => res.data.data);
}

export async function requestSignInNonmember(body: UserSignInNonmember): Promise<string> {
  return axios.post("/user/login/notMember", { ...body }).then((res) => res.data.data);
}

/* -------------------------------------------------------------------------- */
/*                                    User                                    */
/* -------------------------------------------------------------------------- */

import { UserSignInMember, UserSignInNonmember } from "@/types";
import axios from "axios";

/** POST /user/login */

export interface RequestSignInUserOptions {
  isMember?: boolean;
}

export async function requestSignInUser(
  body: UserSignInMember | UserSignInNonmember,
  { isMember }: RequestSignInUserOptions
): Promise<string> { // 토큰 반환
  return axios.post("/user/login", { ...body }, { params: { isMember } }).then((res) => res.data);
}

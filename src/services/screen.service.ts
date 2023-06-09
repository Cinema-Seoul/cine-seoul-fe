import { Screen } from "@/types";
import axios from "axios";

/* -------------------------------------------------------------------------- */
/*                                   Screen                                   */
/* -------------------------------------------------------------------------- */

/** GET /screen/auth */

export async function getScreens(): Promise<Screen[]> {
  return axios.get("/screen/auth").then((res) => res.data);
}

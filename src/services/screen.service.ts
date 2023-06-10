import { Screen, ScreenCreation, ScreenEditing } from "@/types";
import axios from "axios";

/* -------------------------------------------------------------------------- */
/*                                   Screen                                   */
/* -------------------------------------------------------------------------- */

/** GET /screen/admin */

export async function getScreens(): Promise<Screen[]> {
  return axios.get("/screen/admin").then((res) => res.data);
}

/** POST /screen/admin */

export async function createScreen(body: ScreenCreation): Promise<unknown> {
  return axios.post("/screen/admin", { ...body }).then((res) => res.data);
}

/** PUT /screen/admin */

export async function editScreen(body: ScreenEditing): Promise<unknown> {
  return axios.put("/screen/admin", { ...body }).then((res) => res.data);
}

/** GET /screen/admin/{num} */

export async function getScreenDetail(screenNum: number): Promise<Screen> {
  return axios.get(`/screen/admin/${screenNum}`).then((res) => res.data);
}

/* -------------------------------------------------------------------------- */
/*                                   Payment                                  */
/* -------------------------------------------------------------------------- */

import axios from "axios";
import { PagableRequest, SortableRequest } from "./api";
import { ListResponse, PaymentCreation, PaymentDetail, PaymentListEntry } from "@/types";

/** GET /payment/auth */

export enum GetPaymentsSortBy {
  CreatedDate = "created_date",
}

export interface GetPaymentsOptions extends PagableRequest, SortableRequest<GetPaymentsSortBy> {
  userNum?: number;
}

export async function getPayments({
  page,
  size,
  sortBy,
  sortDir: sort_dir,
  userNum,
}: GetPaymentsOptions): Promise<ListResponse<PaymentListEntry>> {
  return axios
    .get("/payment/auth", {
      params: {
        page,
        size,
        sort_dir,
        sort_created_date: sortBy === GetPaymentsSortBy.CreatedDate,
        userNum,
      },
    })
    .then((res) => res.data);
}

/** POST /payment/auth */

export async function createPayment(body: PaymentCreation): Promise<unknown> {
  return axios.post("/payment/auth", { ...body }).then((res) => res.data);
}

/** GET /payment/auth/{num} */

export async function getPayment(paymentNum: number): Promise<PaymentDetail> {
  return axios.get(`/payment/auth/${paymentNum}`).then((res) => res.data);
}

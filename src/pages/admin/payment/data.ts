import { DetailHeadEntry, ListHeadEntry } from "@/components/admin-data-complex";
import { PaymentDetail, PaymentListEntry } from "@/types";
import { date, fmt } from "@/utils/date";

/* -------------------------------------------------------------------------- */
/*                                    LIST                                    */
/* -------------------------------------------------------------------------- */

export const listHead: ListHeadEntry<PaymentListEntry>[] = [
  {
    key: "ticketNum",
    label: "번호",
  },
  {
    key: "createdAt",
    label: "일시",
    value: ({ createdAt }) => fmt(date(createdAt), "Pp"),
  },
  {
    key: "price",
    label: "가격",
  },
  {
    key: "paymentMethod",
    label: "결제방법",
    value: ({ paymentMethod }) =>
      `${
        paymentMethod.startsWith("C") ? "카드결제" : paymentMethod.startsWith("A") ? "계좌결제" : "기타"
      } (${paymentMethod})`,
  },
  {
    key: "ticketNum",
    label: "결제 티켓",
  },
  {
    key: "approvalNum",
    label: "승인번호",
  },
];

/* -------------------------------------------------------------------------- */
/*                                   DETAIL                                   */
/* -------------------------------------------------------------------------- */

export const detailHead: DetailHeadEntry<PaymentDetail>[] = [
  {
    key: "ticketNum",
    label: "번호",
  },
  {
    key: "createdAt",
    label: "일시",
    value: ({ createdAt }) => fmt(date(createdAt), "Pp"),
  },
  {
    key: "price",
    label: "가격",
  },
  {
    key: "paymentMethod",
    label: "결제방법",
    value: ({ paymentMethod }) =>
      `${
        paymentMethod.startsWith("C") ? "카드결제" : paymentMethod.startsWith("A") ? "계좌결제" : "기타"
      } (${paymentMethod})`,
  },
  {
    key: "ticketNum",
    label: "결제 티켓",
  },
  {
    key: "approvalNum",
    label: "승인번호",
  },
];

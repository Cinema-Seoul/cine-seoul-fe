import AdminDataComplex, { ListHeadEntry } from "@/components/admin-data-complex";
import { getPayments } from "@/services/payment.service";
import { PaymentListEntry } from "@/types";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const LIST_HEADS: ListHeadEntry<PaymentListEntry>[] = [
  {
    key: "paymentNum",
    label: "결제 번호",
  },
  {
    key: "createdAt",
    label: "결제 일시",
  },
  {
    key: "price",
    label: "결제 가격",
  },
  {
    key: "paymentMethod",
    label: "결제 방법",
  },
  {
    key: "ticketNum",
    label: "결제 티켓 번호",
  },
  {
    key: "state",
    label: "결제 상태",
  },
  {
    key: "approvalNum",
    label: "승인번호",
  },
];

function DataBody() {
  const [, setSearchParams] = useSearchParams();

  const doOnClickListItem = useCallback(
    ({ paymentNum }: PaymentListEntry) => {
      setSearchParams((o) => ({ ...o, detail: paymentNum }));
    },
    [setSearchParams]
  );

  return (
    <AdminDataComplex
      listHead={LIST_HEADS}
      onGetList={(page, size) => getPayments({ page, size })}
      onClickListItem={doOnClickListItem}
    />
  );
}

export default function AdminPaymentListPage() {
  return (
    <>
      <DataBody />
    </>
  );
}

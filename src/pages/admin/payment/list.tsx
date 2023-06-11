import AdminDataComplex from "@/components/admin-data-complex";
import { getPayment, getPayments } from "@/services/payment.service";
import { detailHead, listHead } from "./data";

function DataBody() {
  return (
    <AdminDataComplex
      listHead={listHead}
      onGetList={(page, size) => getPayments({ page, size })}
      detailHead={detailHead}
      onGetDetail={({ paymentNum }) => getPayment(paymentNum)}
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

import AdminDataComplex, { ListHeadEntry } from "@/components/admin-data-complex";
import { getTickets } from "@/services/ticket/ticket.service";
import { TicketListEntry, TicketState } from "@/types";
import { date, fmt } from "@/utils/date";
import { detailHead, listHead } from "./display";

function DataBody() {
  return <AdminDataComplex listHead={listHead}
   onGetList={(page, size) => getTickets({ page, size })}
   detailHead={detailHead}
   onGetDetail={({  }) => getTicket}
    />;
}

export default function AdminTicketListPage() {
  return (
    <>
      <DataBody />
    </>
  );
}

import AdminDataComplex from "@/components/admin-data-complex";
import { createHead, detailHead, editHead, listHead } from "./data";
import { createEvent, editEvent, getEventDetail, getEvents } from "@/services/event.service";

export default function AdminEventListPage() {
  return (
    <AdminDataComplex
      //L
      listHead={listHead}
      onGetList={(page, size) => getEvents({ page, size })}
      //D
      detailHead={detailHead}
      onGetDetail={({ eventNum }) => getEventDetail(eventNum)}
      // E
      editHead={editHead}
      onSubmitEdit={(result) => editEvent(result)}
      //C
      creationHead={createHead}
      onSubmitCreate={(result) => createEvent(result)}
    />
  );
}

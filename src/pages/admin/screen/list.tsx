import AdminDataComplex from "@/components/admin-data-complex";
import ScreenSeats from "@/components/screen/screen-seats";
import { useAlertDialog } from "@/components/ui/modal/dialog-alert";
import { createScreen, editScreen, getScreenDetail, getScreens } from "@/services/screen.service";
import { Is, Screen } from "@/types";
import { useCallback } from "react";
import { creationHead, detailHead, editHead, listHead } from "./display";

function DataBody() {
  const alertDialog = useAlertDialog();

  const doOnClickListItem = useCallback(
    (item: Screen) => {
      alertDialog(
        <>
          <ScreenSeats seats={item.seats.map((seat) => ({ isOccupied: Is.False, seat }))} />
        </>
      );
    },
    [alertDialog]
  );

  return (
    <AdminDataComplex
      listHead={listHead}
      onGetList={() => getScreens().then((screens) => ({ list: screens, totalPages: 0 }))}
      onClickListItem={doOnClickListItem}
      //D
      detailHead={detailHead}
      onGetDetail={({ screenNum }) => getScreenDetail(screenNum)}
      //E
      editHead={editHead}
      onSubmitEdit={(result) => editScreen(result as any)}
      //C
      creationHead={creationHead}
      onSubmitCreate={(result) => createScreen(result)}
    />
  );
}

export default function AdminScreenListPage() {
  return (
    <>
      <DataBody />
    </>
  );
}

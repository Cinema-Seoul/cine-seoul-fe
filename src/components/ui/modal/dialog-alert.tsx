import { useCallback } from "react";
import { DialogBody, DialogFooter, DialogHeader, DialogSheet, useDialog } from "./dialog";
import { Button } from "..";

export function useAlertDialog() {
  const { showDialog, closeDialog } = useDialog();

  const alertDialog = useCallback((message: string, title?: string) => {
    showDialog(
      <DialogSheet>
        {title && <DialogHeader title={title} />}
        <DialogBody>{message}</DialogBody>
        <DialogFooter>
          <Button onClick={closeDialog}>확인</Button>
        </DialogFooter>
      </DialogSheet>
    )
  }, [showDialog, closeDialog]);

  return alertDialog;
}
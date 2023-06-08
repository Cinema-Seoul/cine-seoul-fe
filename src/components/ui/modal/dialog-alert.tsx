import { ReactNode, useCallback, useEffect } from "react";
import { DialogBody, DialogFooter, DialogHeader, DialogSheet, useDialog } from "./dialog";
import { Button } from "..";

export function useAlertDialog() {
  const { showDialog, closeDialog } = useDialog();

  const alertDialog = useCallback(
    (message?: ReactNode, title?: string) => {
      showDialog(
        <DialogSheet>
          {title && <DialogHeader title={title} />}
          <DialogBody>{message}</DialogBody>
          <DialogFooter className="flex flex-row justify-end space-x-2">
            <Button variant="text" tint="primary" onClick={closeDialog}>
              확인
            </Button>
          </DialogFooter>
        </DialogSheet>
      );

      return closeDialog;
    },
    [showDialog, closeDialog]
  );

  return alertDialog;
}

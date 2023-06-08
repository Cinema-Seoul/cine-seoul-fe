import { ReactNode, useCallback, useEffect } from "react";
import { DialogBody, DialogFooter, DialogHeader, DialogSheet, useDialog } from "./dialog";
import { Button, Loader } from "..";

export function useLoadingDialog() {
  const { showDialog, closeDialog } = useDialog({ closeWhenOutsideClick: false });

  const showLoading = useCallback(() => {
    showDialog(
      <DialogSheet>
        <DialogHeader title="로딩 중" />
        <DialogBody className="flex justify-center items-center">
          <Loader className="w-16 h-16" />
        </DialogBody>
      </DialogSheet>
    );

    return closeDialog;
  }, [showDialog, closeDialog]);

  return showLoading;
}

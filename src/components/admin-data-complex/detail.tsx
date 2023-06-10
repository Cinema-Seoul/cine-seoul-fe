import { ReactNode, useCallback } from "react";
import { DialogBody, DialogFooter, DialogHeader, DialogLayout, DialogSheet, useDialog } from "../ui/modal/dialog";
import { DetailHeadEntry, ListHeadEntry, OnGetDetailFunc } from ".";
import { useGetApi } from "@/services/api";
import { Button, Loader } from "../ui";
import { IoClose, IoPencil } from "react-icons/io5";

type DetailDialogContentProps<L extends object, D extends object> = {
  item: L;

  onClose?: () => void;
  onClickEdit?: (item: D) => void;

  title?: string;
  subtitle?: string;

  detailHead: DetailHeadEntry<D>[];
  onGetDetail: OnGetDetailFunc<L, D>;
};

function DetailDialogContent<L extends object, D extends object>({
  item,
  onClose,
  onClickEdit: onClickEditRaw,
  title,
  subtitle,
  detailHead,
  onGetDetail,
}: DetailDialogContentProps<L, D>) {
  const { data, error, loading } = useGetApi(() => onGetDetail(item));

  const onClickEdit = useCallback(() => {
    if (onClickEditRaw && data) {
      onClickEditRaw(data);
    }
  }, [data, onClickEditRaw]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader className="w-8 h-8" />
      </div>
    );
  } else if (error) {
    return (
      <div className="text-center p-8">
        <p>오류가 발생했어요</p>
        <p>{(error.response?.data as any)?.message ?? ""}</p>
      </div>
    );
  }

  return (
    <DialogSheet>
      <DialogLayout>
        <DialogHeader title={title} subtitle={subtitle} />
        <DialogBody className="flex">
          <table className="hq-form-table">
            {data &&
              detailHead.map((entry) =>
                typeof entry === "function" ? (
                  <tr key={entry.name}>
                    <td colSpan={2}>{entry(data)}</td>
                  </tr>
                ) : (
                  <tr key={entry.key.toString()}>
                    <th>{entry.label}</th>
                    <td>{entry.value ? entry.value(data) : `${data[entry.key]}`}</td>
                  </tr>
                )
              )}
          </table>
        </DialogBody>
        <DialogFooter className="flex flex-row justify-end space-x-2">
          {onClickEditRaw && (
            <Button onClick={onClickEdit} variant="contained" tint="primary" iconStart={<IoPencil />}>
              편집
            </Button>
          )}
          <Button onClick={onClose} iconStart={<IoClose />}>
            닫기
          </Button>
        </DialogFooter>
      </DialogLayout>
    </DialogSheet>
  );
}

export function useDetailDialog<L extends object, D extends object>(onClickEdit?: (item: D) => void) {
  const { showDialog, closeDialog } = useDialog();

  const showDetail = useCallback(
    (
      item: L,
      detailHead: DetailHeadEntry<D>[],
      onGetDetail: OnGetDetailFunc<L, D>,
      title?: string,
      subtitle?: string
    ) => {
      showDialog(
        <DetailDialogContent
          item={item}
          onClose={closeDialog}
          onClickEdit={onClickEdit}
          title={title}
          subtitle={subtitle}
          detailHead={detailHead}
          onGetDetail={onGetDetail}
        />
      );
    },
    [closeDialog, onClickEdit, showDialog]
  );

  return showDetail;
}

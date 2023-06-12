import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DialogBody, DialogFooter, DialogHeader, DialogLayout, DialogSheet, useDialog } from "../ui/modal/dialog";
import { DetailHeadEntry, EditHeadEntry, ListHeadEntry, OnGetDetailFunc, OnSetEdited } from ".";
import { useGetApi, useSetApi } from "@/services/api";
import { Button, Loader } from "../ui";
import { IoClose, IoPencil } from "react-icons/io5";
import { useAlertDialog } from "../ui/modal/dialog-alert";
import { date, fmt } from "@/utils/date";

type EditDialogContentProps<E extends object, D extends object = object> = {
  initialValues: { [key in keyof E]: string | string[] | number | undefined };
  onClose: () => void;

  title?: string;
  subtitle?: string;

  editHead: EditHeadEntry<E, D>[];
  onSetEdited: OnSetEdited<E>;
};

function EditDialogContent<E extends object, D extends object = object>({
  initialValues,
  editHead,
  title,
  subtitle,
  onClose,
  onSetEdited,
}: EditDialogContentProps<E, D>) {
  const alertDialog = useAlertDialog();

  const { apiAction, data, error, loading } = useSetApi(onSetEdited);

  const [values, setValues] = useState<E>({} as any);

  const handleChangeValue: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = useCallback(
    (e) => {
      const name = e.currentTarget.name;
      const v = e.currentTarget.value;
      setValues((o) => ({ ...o, [name]: v }));
    },
    []
  );

  const doOnSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      const par = { ...values };
      console.log("PAR", par);
      
      editHead.forEach(({ setValue, key, editType }) => {
        if (editType === 'date' || editType === 'datetime') {
          par[key] = new Date(par[key] as string) as any;
          console.log("PAR", par);
        }
        if (setValue) {
          par[key] = setValue(par[key]) as any;
        }
      });

      console.log("PAR", par);

      apiAction(par)
        ?.then(() => {
          alertDialog("성공적으로 작업을 마무리했어요");
          onClose();
        })
        .catch((e) => {
          // alertDialog(
          //   <>
          //     오류가 발생했습니다.
          //     <br />
          //     {e.response?.data?.message ?? e.toString()}
          //   </>
          // );
          alert(e.response?.data?.message ?? e.toString());
        });
    },
    [alertDialog, apiAction, editHead, onClose, values]
  );

  const defaultVals = useMemo(
    () =>
      editHead.reduce((acc, { key, initialValue, editType }) => {
        const d = initialValue ? initialValue(initialValues as any) : initialValues[key];
        acc[key] = d;
        if (editType === "inherit") {
          setValues((o) => ({ ...o, [key]: d }));
        }
        return acc;
      }, {} as Partial<E>),
    [editHead, initialValues]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader className="w-8 h-8" />
      </div>
    );
  }

  return (
    <DialogSheet>
      <DialogLayout>
        <DialogHeader title={title} subtitle={subtitle} />
        <form onSubmit={doOnSubmit} className="overflow-y-auto">
          <DialogBody className="">
            <table className="hq-form-table">
              {editHead.map(({ key, label, editType }) => {
                let defaultVal = defaultVals[key] as any;

                if (editType === 'date' || editType === 'datetime') {
                  defaultVal = date(defaultVal);
                }

                if (defaultVal instanceof Date) {
                  defaultVal = defaultVal.toISOString().replace(/\..*[zZ]$/, "");
                }

                return (
                  <tr key={key.toString()}>
                    <th>
                      <label htmlFor={key.toString()}>{label}</label>
                    </th>
                    <td>
                      {editType === "inherit" ? (
                        // <input onChange={handleChangeValue} name={key.toString()} value={initialValues[key]} type="hidden" />
                        <input name={key.toString()} value={defaultVal} disabled />
                      ) : editType === "number" ? (
                        <input
                          type="number"
                          onChange={handleChangeValue}
                          name={key.toString()}
                          defaultValue={defaultVal}
                        />
                      ) : editType === "image_url" ? (
                        <input
                          type="text"
                          onChange={handleChangeValue}
                          name={key.toString()}
                          defaultValue={defaultVal}
                        />
                      ) : editType === "date" ? (
                        <input
                          type="date"
                          onChange={handleChangeValue}
                          name={key.toString()}
                          defaultValue={defaultVal}
                        />
                      ) : editType === "datetime" ? (
                        <input
                          type="datetime-local"
                          onChange={handleChangeValue}
                          name={key.toString()}
                          defaultValue={defaultVal}
                        />
                      ) : Array.isArray(editType) ? (
                        <select
                          key={key.toString()}
                          onChange={handleChangeValue}
                          name={key.toString()}
                          defaultValue={defaultVal}
                        >
                          {!defaultVal && <option disabled>선택해주세요</option>}
                          {editType.map(({ value, display }) => (
                            <option key={value} value={value}>
                              {display}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          onChange={handleChangeValue}
                          name={key.toString()}
                          defaultValue={defaultVal}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </table>
          </DialogBody>
          <DialogFooter className="flex flex-row justify-end space-x-2">
            <Button type="button" onClick={onClose} iconStart={<IoClose />}>
              취소
            </Button>
            <Button type="submit" disabled={loading} variant="contained" tint="primary" iconStart={<IoPencil />}>
              완료
            </Button>
          </DialogFooter>
        </form>
      </DialogLayout>
    </DialogSheet>
  );
}

export function useEditDialog<E extends object, D extends object = object>() {
  const { showDialog, closeDialog } = useDialog();

  const showEdit = useCallback(
    (
      editHead: EditHeadEntry<E, D>[],
      onSetEdited: OnSetEdited<E>,
      initialValues: { [key in keyof E]: string | string[] | number | undefined }
    ) => {
      showDialog(
        <EditDialogContent
          editHead={editHead}
          onSetEdited={onSetEdited}
          title="수정 또는 생성"
          onClose={closeDialog}
          initialValues={initialValues}
        />
      );
    },
    [closeDialog, showDialog]
  );

  return showEdit;
}

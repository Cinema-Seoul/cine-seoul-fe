import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useCallback, useState } from "react";
import { DialogBody, DialogFooter, DialogHeader, DialogLayout, DialogSheet, useDialog } from "../ui/modal/dialog";
import { DetailHeadEntry, EditHeadEntry, ListHeadEntry, OnGetDetailFunc, OnSetEdited } from ".";
import { useGetApi, useSetApi } from "@/services/api";
import { Button, Loader } from "../ui";
import { IoClose, IoPencil } from "react-icons/io5";
import { useAlertDialog } from "../ui/modal/dialog-alert";
import { date } from "@/utils/date";

type EditDialogContentProps<E extends object> = {
  initialValues: { [key in keyof E]: string | string[] | number | undefined };
  onClose: () => void;

  title?: string;
  subtitle?: string;

  editHead: EditHeadEntry<E>[];
  onSetEdited: OnSetEdited<E>;
};

function EditDialogContent<E extends object>({
  initialValues,
  editHead,
  title,
  subtitle,
  onClose,
  onSetEdited,
}: EditDialogContentProps<E>) {
  const alertDialog = useAlertDialog();

  const { apiAction, data, error, loading } = useSetApi(onSetEdited);

  console.log(initialValues);

  const [values, setValues] = useState<E>({} as any);

  const handleChangeValue: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = useCallback((e) => {
    const name = e.currentTarget.name;
    const v = e.currentTarget.value;
    console.log(name, v);
    setValues((o) => ({ ...o, [name]: v }));
    console.log(values);
  }, [values]);

  const doOnSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      apiAction(values)
        ?.then(() => {
          alertDialog("성공적으로 작업을 마무리했어요");
          onClose();
        })
        .catch((e) => {
          alertDialog(
            <>
              오류가 발생했습니다.
              <br />
              {e.response?.data?.message ?? e.toString()}
            </>
          );
        });
    },
    [alertDialog, apiAction, onClose, values]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader className="w-8 h-8" />
      </div>
    );
  } else if (error) {
    // throw error;
    return null;
  }

  return (
    <DialogSheet>
      <DialogLayout>
        <DialogHeader title={title} subtitle={subtitle} />
        <form onSubmit={doOnSubmit}>
          <DialogBody className="">
            <table className="hq-form-table">
              {editHead.map(({ key, label, editType }) => {
                if (editType === "inherit") {
                  if (!values[key] && values[key] !== initialValues[key]) {
                    setValues((o) => ({ ...o, [key]: initialValues[key] }));
                  }
                  return null;
                }

                return (
                  <tr key={key.toString()}>
                    <th>
                      <label htmlFor={key.toString()}>{label}</label>
                    </th>
                    <td>
                      {
                        // editType === 'inherit' ? (
                        // <input onChange={handleChangeValue} name={key.toString()} value={initialValues[key]} type="hidden" />
                        // ) :
                        editType === "number" ? (
                          <input
                            type="number"
                            onChange={handleChangeValue}
                            name={key.toString()}
                            defaultValue={initialValues[key]}
                          />
                        ) : editType === "image_url" ? (
                          <input
                            type="text"
                            onChange={handleChangeValue}
                            name={key.toString()}
                            defaultValue={initialValues[key]}
                          />
                        ) : editType === "date" ? (
                          <input
                            type="date"
                            onChange={handleChangeValue}
                            name={key.toString()}
                            defaultValue={date(initialValues[key]).toISOString()}
                          />
                        ) : editType === "datetime" ? (
                          <input
                            type="datetime-local"
                            onChange={handleChangeValue}
                            name={key.toString()}
                            defaultValue={date(initialValues[key]).toISOString()}
                          />
                        ) : Array.isArray(editType) ? (
                          <select onChange={handleChangeValue} name={key.toString()}>
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
                            defaultValue={initialValues[key]}
                          />
                        )
                      }
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

export function useEditDialog<E extends object>() {
  const { showDialog, closeDialog } = useDialog();

  const showEdit = useCallback(
    (
      editHead: EditHeadEntry<E>[],
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

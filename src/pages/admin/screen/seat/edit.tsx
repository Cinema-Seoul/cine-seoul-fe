import ScreenSeats from "@/components/screen/screen-seats";
import { Button } from "@/components/ui";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogLayout,
  DialogSheet,
  useDialog,
} from "@/components/ui/modal/dialog";
import { useAlertDialog } from "@/components/ui/modal/dialog-alert";
import { useGetApi, useSetApi } from "@/services/api";
import { editSeat, getSeats, removeSeatByNum } from "@/services/seat.service";
import { Is, ScheduleSeat, Seat, SeatCreation, SeatGrade } from "@/types";
import { ChangeEventHandler, FormEventHandler, useCallback, useMemo, useState } from "react";
import { IoClose, IoPencil, IoRemove, IoTrash } from "react-icons/io5";

function SeatCard({
  seat: { col, row, screenNum, seatGrade, seatNum, seatPrice },
  onComplete,
}: {
  seat: Seat;
  onComplete?: () => void;
}) {
  const [editMode, setEditMode] = useState<boolean>(false);

  const [values, setValues] = useState<Partial<SeatCreation>>({});

  const EditSeat = useSetApi(() => editSeat(seatNum, values));

  const handleInput: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = useCallback((e) => {
    const k = e.currentTarget.name;
    const v = e.currentTarget.value;
    setValues((o) => ({ ...o, [k]: v }));
  }, []);

  const doOnSubmitEditForm: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      EditSeat.apiAction()
        .then(() => {
          setEditMode(false);
          onComplete && onComplete();
        })
        .catch((e) => {
          alert(`오류가 발생하였습니다.\n${e.reponse?.data?.message ?? e.toString()}`);
        });
    },
    [EditSeat]
  );

  if (editMode) {
    return (
      <form className="card p-2" key={seatNum} onSubmit={doOnSubmitEditForm}>
        <table className="table-fixed w-48 border-spacing-2 border-separate [&_th]:(text-right)">
          <tr>
            <th>좌석 번호</th>
            <td>{seatNum}</td>
          </tr>
          <tr>
            <th>행</th>
            <td>
              <input name="row" className="w-full" type="text" defaultValue={row} onChange={handleInput} />
            </td>
          </tr>
          <tr>
            <th>열</th>
            <td>
              <input name="col" className="w-full" type="text" defaultValue={col} onChange={handleInput} />
            </td>
          </tr>
          <tr>
            <th>좌석 가격</th>
            <td>
              <input
                name="seatPrice"
                className="w-full"
                type="number"
                defaultValue={seatPrice}
                onChange={handleInput}
              />
            </td>
          </tr>
          <tr>
            <th>좌석 등급</th>
            <td>
              <select name="seatGrade" className="w-full" defaultValue={seatGrade} onChange={handleInput}>
                <option value={SeatGrade.A}>A</option>
                <option value={SeatGrade.B}>B</option>
                <option value={SeatGrade.C}>C</option>
              </select>
            </td>
          </tr>
        </table>
        <div>
          <Button
            type="submit"
            className="ml-a"
            variant="contained"
            tint="primary"
            iconStart={<IoPencil />}
            disabled={EditSeat.loading}
          >
            완료
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="card p-2" key={seatNum}>
      <table className="table-fixed w-48 border-spacing-2 border-separate [&_th]:(text-right)">
        <tr>
          <th>좌석 번호</th>
          <td>{seatNum}</td>
        </tr>
        <tr>
          <th>행</th>
          <td>{row}</td>
        </tr>
        <tr>
          <th>열</th>
          <td>{col}</td>
        </tr>
        <tr>
          <th>좌석 가격</th>
          <td>{seatPrice}</td>
        </tr>
        <tr>
          <th>좌석 등급</th>
          <td>{seatGrade}</td>
        </tr>
      </table>
      <div>
        <Button className="ml-a" variant="text" iconStart={<IoPencil />} onClick={() => setEditMode((o) => !o)}>
          수정
        </Button>
      </div>
    </div>
  );
}

interface ScreenSeatsEditDialogContentsProps {
  title?: string;
  subtitle?: string;
  screenNum: number;
  onClose?: () => void;
}

function ScreenSeatsEditDialogContents({ title, subtitle, onClose, screenNum }: ScreenSeatsEditDialogContentsProps) {
  const GetSeats = useGetApi(() => getSeats({ screenNum }));
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>();

  const seats: ScheduleSeat[] | undefined = useMemo(
    () => GetSeats.data?.map((seat) => ({ isOccupied: Is.False, seat })),
    [GetSeats.data]
  );

  const doOnClickSeatItem = useCallback(
    (seat: Seat) => {
      if (selectedSeats?.some(({ seatNum }) => seat.seatNum === seatNum)) {
        setSelectedSeats((o) => o?.filter((s) => s.seatNum !== seat.seatNum));
      } else {
        setSelectedSeats((o) => (o ? [...o, seat] : [seat]));
      }
    },
    [selectedSeats]
  );

  // REMOVE
  const RemoveSeat = useSetApi(async () => {
    const promiseQueue = selectedSeats?.map(({ seatNum }) =>
      removeSeatByNum(seatNum).then(() => {
        setSelectedSeats((o) => o?.filter((s) => s.seatNum !== seatNum));
      })
    );
    return (
      promiseQueue &&
      Promise.all(promiseQueue)
        .catch((e) => {
          alert(`오류가 발생하였습니다. ${e.response?.data?.message ?? e.toString()}`);
        })
        .then(GetSeats.invalidate)
    );
  });

  // EDIT

  return (
    <DialogSheet>
      <DialogLayout>
        <DialogHeader title={title} subtitle={subtitle} />
        <DialogBody className="flex flex-col">
          <div>
            {GetSeats.data && (
              <ScreenSeats seats={seats} onClickSeat={doOnClickSeatItem} selectedSeats={selectedSeats} />
            )}
          </div>
          <div className="mt-4 border-t border-neutral-6">
            <h6 className="text-lg font-bold py-4">선택 좌석 정보</h6>
            <div className="flex flex-row flex-nowrap overflow-x-auto space-x-2 py-2">
              {selectedSeats?.map((seat) => (
                <SeatCard seat={seat} onComplete={GetSeats.invalidate} />
              ))}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex flex-row justify-end space-x-2">
          <Button
            tint="primary"
            iconStart={<IoTrash />}
            disabled={!selectedSeats?.length || RemoveSeat.loading}
            onClick={RemoveSeat.apiAction}
          >
            선택한 좌석 모두 삭제
          </Button>
          {/* <Button tint="primary" iconStart={<IoPencil />} disabled={!(selectedSeats?.length === 1)}>
            선택한 좌석 정보 수정
          </Button> */}
          <Button onClick={onClose} iconStart={<IoClose />}>
            닫기
          </Button>
        </DialogFooter>
      </DialogLayout>
    </DialogSheet>
  );
}

export default function useScreenSeatsEditDialog(screenNum: number) {
  const { closeDialog, showDialog } = useDialog();

  const showScreenSeatsEditDialog = useCallback(() => {
    showDialog(<ScreenSeatsEditDialogContents title="좌석 편집" onClose={closeDialog} screenNum={screenNum} />);
  }, [closeDialog, screenNum, showDialog]);

  return showScreenSeatsEditDialog;
}

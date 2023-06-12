import { Button, Loader } from "@/components/ui";
import { DialogBody, DialogFooter, DialogHeader, DialogSheet, useDialog } from "@/components/ui/modal/dialog";
import { useAlertDialog } from "@/components/ui/modal/dialog-alert";
import MainLayout from "@/pages/_layouts/main-layout";
import { useGetApi, useSetApi } from "@/services/api";
import { cancelTicket, getTicketDetail } from "@/services/ticket/ticket.service";
import { useTicketingStore } from "@/stores/client";
import { TicketState, displayTicketState } from "@/types";
import { date, fmt } from "@/utils/date";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ConfirmDialog = ({ no, ok }: { ok?: () => void; no?: () => void }) => {
  return (
    <DialogSheet>
      <DialogHeader title="경고" />
      <DialogBody>정말 취소하실 건가요? 이 작업은 되돌릴 수 없어요.</DialogBody>
      <DialogFooter className="flex flex-row justify-end space-x-2">
        <Button variant="text" tint="primary" onClick={no}>
          아니요
        </Button>
        <Button variant="text" tint="primary" onClick={ok}>
          네, 취소할게요
        </Button>
      </DialogFooter>
    </DialogSheet>
  );
};

type TicketDetailPageParams = {
  ticketNum: string;
};

export default function TicketDetailPage() {
  const params = useParams<TicketDetailPageParams>();
  const { showDialog, closeDialog } = useDialog();
  const alertDialog = useAlertDialog();
  const navigate = useNavigate();

  const ticketNum = params.ticketNum ? parseInt(params.ticketNum) : null;

  const { setTicket } = useTicketingStore();

  if (typeof ticketNum !== "number") {
    throw Error("티켓 고유 번호가 잘못되었습니다.");
  }

  const doOnClickPay = useCallback(() => {
    setTicket(ticketNum);
    navigate('/ticketing/payment');
  }, [navigate, setTicket, ticketNum]);

  const TicketDetail = useGetApi(() => getTicketDetail(ticketNum));

  const CancelTicket = useSetApi(() => cancelTicket(ticketNum));

  const doOnClickCancel = useCallback(() => {
    showDialog(
      <ConfirmDialog
        ok={() => {
          closeDialog();
          CancelTicket.apiAction()
            .then(() => {
              alertDialog("성공적으로 취소되었어요.");
              navigate(-1);
            })
            .catch((e) => {
              alertDialog(
                <>
                  취소하지 못했어요.
                  <br />
                  {e.response?.data?.message ?? e.toString()}
                </>
              );
            });
        }}
      />
    );
  }, [CancelTicket, alertDialog, closeDialog, showDialog]);

  return (
    <MainLayout>
      <div className="container">
        {TicketDetail.loading && <Loader className="w-16 h-16 m-16 mx-a" />}
        {TicketDetail.data && (
          <>
            <div className="p-6">
              <h4 className="text-2xl font-bold text-center">{TicketDetail.data.schedule.movie.title}</h4>
              <table className="mt-4 mx-16 [&_th]:(text-right) table-fixed col-6 border-separate border-spacing-2">
                <tr>
                  <th>예매일자</th>
                  <td>{fmt(date(TicketDetail.data.createdAt), "PPpp")}</td>
                </tr>
                <tr>
                  <th>결제상태</th>
                  <td>{displayTicketState[TicketDetail.data.ticketState]}</td>
                </tr>
                <tr>
                  <th>영화</th>
                  <td>
                    <Link to={`/movie/d/${TicketDetail.data.schedule.movie.movieNum}`} className="hover:underline">
                      {`${TicketDetail.data.schedule.movie.title} (${TicketDetail.data.schedule.movie.gradeName})`}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th>상영일자</th>
                  <td>{fmt(date(TicketDetail.data.schedule.schedTime), "PPpp")}</td>
                </tr>
                <tr>
                  <th>상영관</th>
                  <td>{TicketDetail.data.schedule.screen.name}</td>
                </tr>
                <tr>
                  <th>예매 좌석</th>
                  <td>{TicketDetail.data.ticketSeats.map(({ seat: { col, row } }) => `${row}${col}`).join(", ")}</td>
                </tr>
              </table>
            </div>
            <div>
              <div className="flex flex-row space-x-2 justify-center items-center p-4">
                {TicketDetail.data.ticketState === TicketState.Pending && (
                  <Button className="flex-0" variant="contained" tint="primary" onClick={doOnClickPay}>
                    결제
                  </Button>
                )}
                <Button className="flex-0" variant="text" onClick={doOnClickCancel}>
                  예매 취소
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}

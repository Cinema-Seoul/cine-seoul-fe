import Form, { FormConditional, FormRootProps, FormSubmitFunc } from "@/components/form/primitive";
import { StepSection } from "@/components/ticketing";
import { Button } from "@/components/ui";
import { useAlertDialog } from "@/components/ui/modal/dialog-alert";
import { useGetApi, useSetApi } from "@/services/api";
import { createPayment } from "@/services/payment.service";
import { deleteTicket } from "@/services/ticket/ticket.service";
import { useUser } from "@/services/user/user.application";
import { getMe } from "@/services/user/user.service";
import { useTicketingStore } from "@/stores/client";
import { PaymentCreation, PaymentMethod, UserRole } from "@/types";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FormEventHandler, useCallback, useEffect, useMemo } from "react";
import { IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function PaymentForm({ className }: BaseProps) {
  const alertDialog = useAlertDialog();
  const navigate = useNavigate();

  const { setPayedPoint, ticket } = useTicketingStore();

  if (!ticket) {
    throw Error("잘못된 접근입니다. 티켓 정보가 없습니다.");
  }

  const currentUser = useUser();

  if (!currentUser) {
    throw Error("잘못된 접근입니다. 사용자 인증 정보가 없습니다.");
  }

  const SubmitPayment = useSetApi(((...args) =>
    createPayment(...args)
      .then(() => {
        alertDialog("결제가 완료됐어요. 즐거운 영화관람 되세요!");
        navigate("/my/ticket");
      })
      .catch((e) => {
        alertDialog(
          <>
            오류가 발생했어요
            <br />
            {e.response?.data?.message}
          </>
        );
      })) as typeof createPayment);

  const doOnSubmit: FormSubmitFunc<
    Partial<PaymentCreation> & { payedPoint: number; paymentMethodType: PaymentMethod }
  > = useCallback(
    (e, values) => {
      e.preventDefault();
      SubmitPayment.apiAction({
        payedPoint: values.payedPoint,
        paymentMethod: `${values.paymentMethodType}${
          values.paymentMethodType === PaymentMethod.Account
            ? "000"
            : values.paymentMethodType === PaymentMethod.Card
            ? "00"
            : ""
        }`,
        price: ticket.stdPrice,
        ticketNum: ticket.ticketNum,
        accountNum: values.accountNum,
        cardNum: values.cardNum,
      });
    },
    [SubmitPayment, alertDialog]
  );

  const doOnChangeForm: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      const formData = new FormData(e.currentTarget);
      setPayedPoint(Number(formData.get("payedPoint")));
    },
    [setPayedPoint]
  );

  const UserDetail = useGetApi(() => getMe());

  return (
    <Form
      className={className}
      initialValues={{
        payedPoint: 0,
        paymentMethodType: PaymentMethod.Account,
      }}
      onChange={doOnChangeForm}
      onSubmit={doOnSubmit}
    >
      <table className="hq-form-table col-8 mx-a">
        {currentUser.userRole !== UserRole.nonmember && (
          <>
            <tr>
              <th>
                <label htmlFor="payedPoint">포인트</label>
                <p>
                  (사용 가능 포인트:{" "}
                  {UserDetail.loading
                    ? "불러오고 있어요"
                    : UserDetail.error
                    ? "불러올 수 없어요"
                    : UserDetail.data?.point.toLocaleString()}
                  )
                </p>
              </th>
              <td>
                <Form.Input type="number" inputId="payedPoint" />
              </td>
            </tr>
          </>
        )}
        <tr>
          <th>
            <label htmlFor="paymentMethodType">결제 방법</label>
          </th>
          <td>
            <Form.Select inputId="paymentMethodType" required>
              <option value={PaymentMethod.Account}>계좌</option>
              <option value={PaymentMethod.Card}>신용카드</option>
            </Form.Select>
          </td>
        </tr>
        <tr>
          <td>
            <hr />
          </td>
        </tr>
        <FormConditional
          render={({ values }) => {
            const a = values["paymentMethodType"];
            if (a === PaymentMethod.Account)
              return (
                <tr key={a}>
                  <th>
                    <label>계좌 번호</label>
                  </th>
                  <td>
                    <Form.Input type="text" inputId="accountNum" />
                  </td>
                </tr>
              );
            if (a === PaymentMethod.Card)
              return (
                <tr key={a}>
                  <th>
                    <label>카드 번호</label>
                  </th>
                  <td>
                    <Form.Input type="text" inputId="cardNum" />
                  </td>
                </tr>
              );

            return <></>;
          }}
        />
      </table>

      <PriceCard className="col-10 mx-a items-center mt-8" />
      <div className="col-10 mx-a mt-6">
        <Button
          type="submit"
          className="ml-a"
          variant="contained"
          tint="primary"
          iconEnd={<IoChevronForward />}
          disabled={SubmitPayment.loading}
        >
          결제하기
        </Button>
      </div>
    </Form>
  );
}

function PriceCard({ className }: BaseProps) {
  const { ticket, payedPoint } = useTicketingStore();

  const totalPrice = useMemo(() => ticket && Number(ticket.stdPrice) - payedPoint, [payedPoint, ticket]);

  return (
    <div className={clsx(className, "card flex flex-row")}>
      <div className="flex-1 text-center p-4">
        <div className="text-sm">총 금액</div>
        <div className="text-xl font-bold">{ticket?.stdPrice}원</div>
      </div>
      <div className="flex-0 w-8 h-8 leading-8 text-center text-2xl rounded-full bg-neutral-9 text-neutral-1">-</div>
      <div className="flex-1 text-center p-4">
        <div className="text-sm">포인트 사용 / 할인</div>
        <div className="text-xl font-bold">{payedPoint}</div>
      </div>
      <div className="flex-0 w-8 h-8 leading-8 text-center text-2xl rounded-full bg-primary-9 text-primary-1">=</div>
      <div className="flex-1 text-center p-4 text-primary-11">
        <div className="text-sm">결제 금액</div>
        <div className="text-xl font-bold">{totalPrice}원</div>
      </div>
    </div>
  );
}

export default function TicketingPaymentPage() {
  const navigate = useNavigate();

  const { ticket, setTicket, setPayedPoint } = useTicketingStore();

  if (!ticket) {
    throw Error("잘못된 접근입니다! 결제할 티켓 정보가 없습니다.");
  }

  useEffect(() => {
    setPayedPoint(0);
  }, [setPayedPoint]);

  const CancelTicket = useSetApi(deleteTicket);

  const doOnClickBack = useCallback(() => {
    CancelTicket.apiAction(ticket.ticketNum)
      .then(() => setTicket(undefined))
      .finally(() => navigate(-1));
  }, [CancelTicket, navigate, setTicket, ticket.ticketNum]);

  return (
    <motion.div className="container py-6 h-full flex flex-row">
      <StepSection
        title="결제"
        className="flex flex-col flex-1"
        bodyClass="flex flex-row flex-1 items-stretch"
        onClickBack={doOnClickBack}
      >
        <div className="relative flex-1 p-4 overflow-y-auto">
          <PaymentForm />
        </div>
      </StepSection>
    </motion.div>
  );
}

import Form, { FormConditional, FormRootProps, FormSubmitFunc } from "@/components/form/primitive";
import { StepSection } from "@/components/ticketing";
import { Button } from "@/components/ui";
import { useGetApi } from "@/services/api";
import { deleteTicket } from "@/services/ticket/ticket.service";
import { useUser } from "@/services/user/user.application";
import { getUserDetail } from "@/services/user/user.service";
import { useTicketingStore } from "@/stores/client";
import { PaymentMethod } from "@/types";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function PaymentForm({ className }: BaseProps) {
  const doOnSubmit: FormSubmitFunc<string> = useCallback((e, values) => {}, []);

  const currentUser = useUser();

  if (!currentUser) {
    throw Error("잘못된 접근입니다. 사용자 인증 정보가 없습니다.");
  }

  const UserDetail = useGetApi(() => getUserDetail(currentUser.userNum));

  return (
    <Form
      className={className}
      initialValues={{
        paymentMethodType: "",
        payedPoint: 0,
      }}
      onSubmit={doOnSubmit}
    >
      <table className="hq-form-table col-8 mx-a">
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

            return null;
          }}
        />
      </table>
    </Form>
  );
}

function PriceCard({ className }: BaseProps) {
  return (
    <div className={clsx(className, "card flex flex-row")}>
      <div className="flex-1 text-center p-4">
        <div className="text-sm">총 금액</div>
        <div className="text-xl font-bold">1,000원 </div>
      </div>
      <div className="flex-0 w-8 h-8 leading-8 text-center text-2xl rounded-full bg-neutral-9 text-neutral-1">-</div>
      <div className="flex-1 text-center p-4">
        <div className="text-sm">포인트 사용 / 할인</div>
        <div className="text-xl font-bold">1,000원 </div>
      </div>
      <div className="flex-0 w-8 h-8 leading-8 text-center text-2xl rounded-full bg-primary-9 text-primary-1">=</div>
      <div className="flex-1 text-center p-4 text-primary-11">
        <div className="text-sm">결제 금액</div>
        <div className="text-xl font-bold">1,000원 </div>
      </div>
    </div>
  );
}

export default function TicketingPaymentPage() {
  const navigate = useNavigate();

  // const { selectedSc } = useTicketingStore();

  const doOnClickBack = useCallback(() => {
    // TODO: 티켓은 취소 -> 지금은 API 오류 때문에 티켓번호를 저장하기 어려워서 일단...
    // deleteTicket()
    navigate(-1);
  }, [navigate]);

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
          <PriceCard className="col-10 mx-a items-center mt-8" />
          <div className="col-10 mx-a mt-6">
            <Button className="ml-a" variant="contained" tint="primary" iconEnd={<IoChevronForward />}>
              결제하기
            </Button>
          </div>
        </div>
      </StepSection>
    </motion.div>
  );
}

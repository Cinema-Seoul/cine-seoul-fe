import { Link } from "react-router-dom";
import MainLayout from "../../_layouts/main-layout";
import { useGetApi, useGetApiWithPagination } from "@/services/api";
import PaginationBar from "@/ui/components/pagination/pagination-bar";
import { DialogBody, DialogFooter, DialogLayout, DialogSheet, useDialog } from "@/ui/components/ui/modal/dialog";
import { useCallback } from "react";
import { Button } from "@/ui/components/ui";

function TicketDetailDialog() {
  return (
    <DialogSheet>
      <DialogLayout>
        <DialogBody className="p-6">
          <h4 className="text-2xl font-bold text-center">{"트랜짓"}</h4>
          <table className="mt-4">
            <tr>
              <th className="text-right pr-2">예매일자</th>
              <td>{"2023-06-07 15:41:12"}</td>
            </tr>
            <tr>
              <th className="text-right pr-2">결제상태</th>
              <td>{"결제완료"}</td>
            </tr>
            <tr>
              <th className="text-right pr-2">영화</th>
              <td>{"트랜짓 (15세 이용가)"}</td>
            </tr>
            <tr>
              <th className="text-right pr-2">상영일자</th>
              <td>{"2023-06-07 15:41:12"}</td>
            </tr>
            <tr>
              <th className="text-right pr-2">상영관</th>
              <td>{"제1관"}</td>
            </tr>
            <tr>
              <th className="text-right pr-2">예매 좌석</th>
              <td>{"E11"}</td>
            </tr>
          </table>
        </DialogBody>
        <DialogFooter>
          <div className="flex flex-row">
            <Button className="flex-1" variant="text">예매 변경</Button>
            <Button className="flex-1" variant="text">예매 취소</Button>
          </div>
        </DialogFooter>
      </DialogLayout>
    </DialogSheet>
  );
}

function TicketItem() {
  const { showDialog } = useDialog();

  const doOnClickItem = useCallback(() => {
    showDialog(<TicketDetailDialog />);
  }, [showDialog]);

  return (
    <a className="card card-pressable block p-4" onClick={doOnClickItem}>
      <div className="text-lg font-bold">{"트랜짓"}</div>
      <div className="flex flex-row">
        <div className="flex-1 space-x-2">
          <span>{"상영시각"}</span>
          <span>{"2020. 20. 20. 20:20"}</span>
        </div>
        <div className="flex-1 space-x-2">
          <span>{"상영관"}</span>
          <span>{"A"}</span>
        </div>
        <div className="flex-1 space-x-2">
          <span>{"좌석"}</span>
          <span>{"E12"}</span>
        </div>
      </div>
    </a>
  );
}

function TicketsList() {
  // const tickets = useGetApiWithPagination((p, s) => getTicket)

  return (
    <ul className="space-y-2">
      {
        <li>
          <TicketItem />
        </li>
      }
    </ul>
  );
}

export default function MyTicketsPage() {
  return (
    <MainLayout>
      <header className="bg-neutral-2">
        <div className="container pt-32">
          <div className="py-6">
            <h2 className="font-bold text-2xl text-primary-11">나의 티켓</h2>
          </div>
        </div>
      </header>
      <main className="bg-neutral-1 py-6 border-t border-solid border-neutral-6">
        <div className="container">
          <TicketsList />
          <PaginationBar className="my-4" pageCount={12} currentPageIndex={3} />
        </div>
      </main>
    </MainLayout>
  );
}

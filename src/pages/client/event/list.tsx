import PageHeader from "@/components/header/page-header";
import PaginationBar from "@/components/pagination/pagination-bar";
import { Loader } from "@/components/ui";
import MainLayout from "@/pages/_layouts/main-layout";
import { useGetApi, useGetApiWithPagination } from "@/services/api";
import { getEvents } from "@/services/event.service";
import { EventListEntry } from "@/types/event";
import { date, fmt } from "@/utils/date";
import { useDeferredValue } from "react";
import { Link } from "react-router-dom";

function EventList({ data }: { data: EventListEntry[] }) {
  return (
    <ul>
      {data.map(({ eventNum, title, startAt, endAt, createdAt, contents }) => (
        <li>
          <Link
            className="pressable-opacity block w-full p-4 border-b border-solid border-neutral-6"
            to={`/b/event/${eventNum}`}
          >
            <h6 className="text-lg font-bold">{title}</h6>
            <div className="flex flex-row justify-between text-sm">
              <span className="">
                <span className="mr-2">기간</span>
                <span>{fmt(date(startAt), "PPPp")}</span>
                <span className="mx-2">-</span>
                <span>{fmt(date(endAt), "PPPp")}</span>
              </span>
              <span className="">
                <span className="mr-2">작성일</span>
                <span>{fmt(date(createdAt), "PPPp")}</span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AllEventList() {
  const GetEvents = useGetApiWithPagination((page, size) => getEvents({ page, size }), {
    initialPage: 0,
    pageSize: 12,
  });

  if (GetEvents.loading) {
    return <Loader className="w-8 h-8 mx-a my-16" />;
  }

  return GetEvents.data ? (
    <div>
      <EventList data={GetEvents.data.list} />
      <div className="py-8">
        <PaginationBar currentPageIndex={GetEvents.page} pageCount={GetEvents.data.totalPages} />
      </div>
    </div>
  ) : (
    <div>목록을 읽어올 수 없어요</div>
  );
}

// function AllEventList() {

// }

export default function EventListPage() {
  return (
    <MainLayout>
      <PageHeader title="이벤트" />
      <div className="container py-16">
        <AllEventList />
      </div>
    </MainLayout>
  );
}

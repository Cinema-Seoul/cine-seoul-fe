import PageHeader from "@/components/header/page-header";
import { Loader } from "@/components/ui";
import MainLayout from "@/pages/_layouts/main-layout";
import { useGetApi } from "@/services/api";
import { getEventDetail } from "@/services/event.service";
import { date, fmt } from "@/utils/date";
import { useParams, useSearchParams } from "react-router-dom";

type EventDetailPageParams = {
  eventNum?: string;
};

export default function EventDetailpage() {
  const params = useParams<EventDetailPageParams>();

  const eventNum = params.eventNum ? parseInt(params.eventNum) : null;

  if (typeof eventNum !== "number") {
    throw Error("이벤트 고유 번호가 잘못되었습니다.");
  }

  const GetEvent = useGetApi(() => getEventDetail(eventNum));

  return (
    <MainLayout>
      <PageHeader title="이벤트" />
      <div className="container py-16">
        {GetEvent.loading ? (
          <Loader className="w-8 h-8 mx-a my-8" />
        ) : (
          GetEvent.data && (
            <table className="w-full table-auto">
              {GetEvent.data.contents.length && (
                <tr>
                  <td colSpan={4}>
                    <img className="w-full h-32 object-cover rounded-lg" src={GetEvent.data.banner} />
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={4} className="py-8 font-bold text-xl">
                  {GetEvent.data.title}
                </td>
              </tr>
              <tr className=" border-b border-solid border-neutral-6">
                <th>기간</th>
                <td colSpan={3} className="px-4 py-2">
                  <span>{fmt(date(GetEvent.data.startAt), "PPPp")}</span>
                  <span className="mx-2">-</span>
                  <span>{fmt(date(GetEvent.data.endAt), "PPPp")}</span>
                </td>
              </tr>
              <tr>
                <th>작성일</th>
                <td className="px-4 py-2">
                  <span>{fmt(date(GetEvent.data.createdAt), "PPPp")}</span>
                </td>
                <th>조회수</th>
                <td className="px-4 py-2">
                  <span>{GetEvent.data.views}</span>
                </td>
              </tr>
              {GetEvent.data.contents.length && (
                <tr>
                  <td colSpan={4} className="pt-8 pb-4">
                    <div>{GetEvent.data.contents}</div>
                  </td>
                </tr>
              )}
              {GetEvent.data.image.length && (
                <tr>
                  <td colSpan={4}>
                    <img src={GetEvent.data.image} className="w-full" />
                  </td>
                </tr>
              )}
            </table>
          )
        )}
      </div>
    </MainLayout>
  );
}

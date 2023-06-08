import { useGetApi } from "@/services/api";
import { getDistributorDetail } from "@/services/movie-meta/distributor.service";
import { Loader } from "@/components/ui";
import MainLayout from "@/pages/_layouts/main-layout";
import clsx from "clsx";
import { useParams, useSearchParams } from "react-router-dom";

function LocalLoader() {
  return <Loader className="m-16 w-12 h-12" />;
}

type DistributorDetailPageParams = {
  distNum: string;
};

export default function DistributorDetailPage() {
  const params = useParams<DistributorDetailPageParams>();

  const distNum = params.distNum ? parseInt(params.distNum) : null;

  if (typeof distNum !== "number") {
    throw Error("배급사 고유 번호가 잘못되었습니다.");
  }

  const distDetail = useGetApi(() => getDistributorDetail(distNum));

  return (
    <MainLayout>
      <section className="bg-neutral-2 py-16">
        {distDetail.loading ? (
          <LocalLoader />
        ) : distDetail.error || !distDetail.data ? (
          <div>ERROR</div>
        ) : (
          <div className="container">
            <div className="row justify-center items-center">
              <div className="col-6">
                <div className="font-bold text-2xl text-center">{distDetail.data.name}</div>
              </div>
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

import { useGetApi } from "@/services/api";
import { getDirectorDetail } from "@/services/movie-meta/director.service";
import { Loader } from "@/components/ui";
import MainLayout from "@/pages/_layouts/main-layout";
import clsx from "clsx";
import { useParams, useSearchParams } from "react-router-dom";

function LocalLoader() {
  return <Loader className="m-16 w-12 h-12" />;
}

type DirectorDetailPageParams = {
  dirNum: string;
};

export default function DirectorDetailPage() {
  const params = useParams<DirectorDetailPageParams>();

  const dirNum = params.dirNum ? parseInt(params.dirNum) : null;

  if (typeof dirNum !== "number") {
    throw Error("감독 고유 번호가 잘못되었습니다.");
  }

  const dirDetail = useGetApi(() => getDirectorDetail(dirNum));

  return (
    <MainLayout>
      <section className="bg-neutral-2 py-16">
        {dirDetail.loading ? (
          <LocalLoader />
        ) : dirDetail.error || !dirDetail.data ? (
          <div>ERROR</div>
        ) : (
          <div className="container">
            <div className="row justify-center items-center">
              <div className="col-2">
                <div className="w-full h-square relative">
                  <img
                    className={clsx(
                      "absolute w-full h-full left-0 right-0 top-0 bottom-0 object-cover",
                      "rounded-full"
                    )}
                    src={dirDetail.data.imgUrl}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="font-bold text-2xl text-center">{dirDetail.data.name}</div>
              </div>
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

import { useGetApi } from "@/services/api";
import { getActorDetail } from "@/services/movie-meta/actor.service";
import { Loader } from "@/components/ui";
import MainLayout from "@/pages/_layouts/main-layout";
import clsx from "clsx";
import { useParams, useSearchParams } from "react-router-dom";

function LocalLoader() {
  return <Loader className="m-16 w-12 h-12" />;
}

type ActorDetailPageParams = {
  actorNum: string;
};

export default function ActorDetailPage() {
  const params = useParams<ActorDetailPageParams>();

  const actorNum = params.actorNum ? parseInt(params.actorNum) : null;

  if (typeof actorNum !== "number") {
    throw Error("배우 고유 번호가 잘못되었습니다.");
  }

  const actorDetail = useGetApi(() => getActorDetail(actorNum));

  return (
    <MainLayout>
      <section className="bg-neutral-2 py-16">
        {actorDetail.loading ? (
          <LocalLoader />
        ) : actorDetail.error || !actorDetail.data ? (
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
                    src={actorDetail.data.imgUrl}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="font-bold text-2xl text-center">{actorDetail.data.name}</div>
              </div>
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
}

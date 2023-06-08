import MovieGradeBadge from "@/components/movies/movie-grade-badge";
import { Button, Loader } from "@/components/ui";
import { parse8DigitDateString } from "@/utils/date";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ReactNode, useCallback, useMemo } from "react";
import { IoHeart, IoShareOutline, IoTicket } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../_layouts/main-layout";
import clsx from "clsx";
import { useGetApi } from "@/services/api";
import { getMovieDetail } from "@/services/movie/movie.service";
import { useTicketingStore } from "@/stores/client";
import { convertMovieDetailToMovieListEntry } from "@/types";
import { Link } from "react-router-dom";
import { useAlertDialog } from "@/components/ui/modal/dialog-alert";
import ReviewListSection from "./review-list";

function LocalLoader() {
  return <Loader className="w-16 mx-a py-24" />;
}

export type MovieDetailPageParams = {
  movieNum: string;
};

export default function MovieDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<MovieDetailPageParams>();

  const alertDialog = useAlertDialog();

  const updateSelectedMovie = useTicketingStore((s) => s.updateSelectedMovie);

  const movieNum = params.movieNum ? parseInt(params.movieNum) : null;

  if (typeof movieNum !== "number") {
    throw Error("영화 고유 번호가 잘못되었습니다.");
  }

  const {
    data: movieDetail,
    loading: movieDetailLoading,
    error: movieDetailError,
    invalidate: movieDetailInvalidate,
  } = useGetApi(() => getMovieDetail(movieNum));

  if (movieDetailError) {
    throw Error("문제가 발생하여 페이지를 불러올 수 없어요");
  }

  const doOnClickTicketing = useCallback(() => {
    if (movieDetail) {
      updateSelectedMovie(convertMovieDetailToMovieListEntry(movieDetail));
      navigate(`/ticketing?redirect=${location.pathname}`);
    }
  }, [location.pathname, movieDetail, navigate, updateSelectedMovie]);

  const specs = useMemo(() => {
    if (!movieDetail) return {};

    const releaseDate = movieDetail.releaseDate && parse8DigitDateString(movieDetail.releaseDate);

    const ret = {} as Record<string, ReactNode | ReactNode[]>;

    if (movieDetail.genreList.length) {
      ret["장르"] = movieDetail.genreList.map(({ name }) => (
        <a className="hover:underline" href="#">
          {name}
        </a>
      ));
    }

    if (movieDetail.directorList.length) {
      ret["감독"] = movieDetail.directorList.map(({ dirNum, name }) => (
        <Link className="hover:underline" to={`/m/director/${dirNum}`}>
          {name}
        </Link>
      ));
    }

    if (movieDetail.actorList.length) {
      ret["출연"] = movieDetail.actorList.map(({ actNum, name }) => (
        <Link className="hover:underline" to={`/m/actor/${actNum}`}>
          {name}
        </Link>
      ));
    }

    if (typeof movieDetail.runningTime === "number" && movieDetail.runningTime > 0) {
      const h = Math.floor(movieDetail.runningTime / 60);
      const m = movieDetail.runningTime % 60;
      ret["상영 시간"] = h > 0 ? `${h}시간 ${m}분` : `${m}분`;
    }

    if (releaseDate) {
      ret["개봉"] = format(releaseDate, "PPP", { locale: ko });
    }

    if (movieDetail.distName) {
      ret["배급"] = movieDetail.distName;
    }

    if (movieDetail.countryList?.length) {
      ret["국가"] = movieDetail.countryList.map(({ countryCode, name })=> (
        <span key={countryCode}>{name}</span>
      ));
    }

    return ret;
  }, [movieDetail]);

  const doOnClickShare = useCallback(() => {
    navigator.share({ title: "시네마서울 영화 정보", text: movieDetail?.title, url: window.location.href });
  }, [movieDetail?.title]);

  return (
    <MainLayout insideClass="pb-24">
      <section about="영화 주요 정보" className="bg-neutral-3">
        {movieDetailLoading ? (
          <LocalLoader />
        ) : (
          <div className="container py-8">
            <div className="row justify-center">
              <div className="lt-md:(col-6 offset-2) md:col-4">
                <img className="w-full rounded" src={movieDetail?.poster} />
              </div>
              <div className="lt-md:(col-6 offset-2) md:(col-6 flex flex-col justify-end)">
                <div>
                  <h6 className="font-bold text-6 leading-8">{movieDetail?.title}</h6>
                  <p className="font-bold text-neutral-11 text-5 leading-6 mt-2 flex flex-row">
                    <MovieGradeBadge className="mr-2" gradeCode={movieDetail?.gradeName.gradeCode} />
                    {/* <span>여기 원제가 들어가면 좋을 것 같아요</span> */}
                  </p>
                </div>
                <div className="mt-6 py-4 border-b border-solid border-neutral-5">
                  {Object.entries(specs).map(
                    ([key, content], index) =>
                      content && (
                        <p key={index}>
                          <span className="mr-2 text-neutral-11 after:(content-['|'] mx-1)">{key}</span>
                          <span className=":uno: [&>*:not(:last-child)::after]:(content-['·'] mx-1)">{content}</span>
                        </p>
                      )
                  )}
                </div>
                <div className="row">
                  {/* <div className="col-4 pt-4">
                  <div className="text-sm text-center mb-4">관람객 평점</div>
                  <div className="text-lg text-center font-bold">4.5</div>
                </div>
                <div className="col-4 pt-4">
                  <div className="text-sm text-center mb-4">평론가 평점</div>
                  <div className="text-lg text-center font-bold">4.5</div>
                </div> */}
                  {/* <div className="col-4 pt-4">
                  <div className="text-sm text-center mb-4">누적 판매량</div>
                  <div
                    className="text-lg text-center font-bold after:(content-[attr(data-rank)] absolute text-sm text-primary-11)"
                    // data-rank="1위"
                  >
                    {}
                  </div>
                </div> */}
                </div>
              </div>
            </div>
            <div className="row mt-6 pt-6 border-t border-solid border-neutral-6">
              <div className="col-auto ms-a">
                <Button
                  className="w-full"
                  variant="text"
                  tint="primary"
                  iconStart={<IoShareOutline />}
                  onClick={doOnClickShare}
                >
                  공유
                </Button>
              </div>
              {/* <div className="col-auto">
                <Button
                  className="w-full"
                  variant="text"
                  tint="primary"
                  iconStart={<IoHeart />}
                >
                  찜
                </Button>
              </div> */}
              <div className="col-4">
                <Button
                  className="w-full"
                  variant="contained"
                  tint="primary"
                  iconStart={<IoTicket />}
                  onClick={doOnClickTicketing}
                >
                  예매하기
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="pt-6">
        {movieDetailLoading || (
          <div className="container mt-12">
            <div
              className={clsx(
                "text-center text-lg col-8 mx-a",
                ":uno: before:(content-none inline-block w-full max-w-24 h-1 bg-primary-5)",
                ":uno: after:(content-none inline-block w-full max-w-24 h-1 bg-primary-5)"
              )}
            >
              <p>{movieDetail?.info}</p>
            </div>
          </div>
        )}
      </section>
      <ReviewListSection movieNum={movieNum} />
    </MainLayout>
  );
}

import { Movie } from "@/domains";
import clsx from "clsx";
import type { MovieGrade } from "cs:movie";
import { Suspense, useCallback } from "react";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui";
import Loader from "../ui/loader";
import MovieGradeBadge from "./movie-grade-badge";

type MovieCardData = {
  movie: Movie;
}

export interface MovieCardProps extends BaseProps {
  data: MovieCardData;
}

export default function MovieCard({ className, data }: MovieCardProps) {
  const navigate = useNavigate();

  const navigateToDetail = useCallback(() => {
    navigate(`/movie/${data.movie.movieNum}`)
  }, [data.movie.movieNum]);

  return (
    <div
      className={clsx(
        className,
        "bg-neutral-{{2  3}} out-1 outline-neutral-6 rounded overflow-hidden",
        "group transition cursor-pointer"
      )}
      onClick={navigateToDetail}
    >
      <Suspense fallback={<Loader />}>

      <div className="relative">
        <img className="transition group-hover:opacity-25" src={data.movie.poster} />
        <div
          className={clsx(
            "absolute top-0 bottom-0 left-0 right-0",
            "flex flex-col justify-between",
            "invisible group-hover:visible"
          )}
        >
          <div className="p-4 flex-1 overflow-y-hidden text-base text-neutral-12">
            {data.movie.info}
            <br />
            <br />
            아래는 테스트를 위해 임의로 길이 늘린 거<br />
            <br />
            {data.movie.info}
            {data.movie.info}
            {data.movie.info}
            {data.movie.info}
          </div>
          <div className="p-4 flex-shrink-0 text-sm border-t border-solid border-neutral-11 border-opacity-20">
            <span className="font-normal me-2">관람객 평점</span>
            <span className="font-bold">4.5</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-row">
          <h6 className="flex-1 text-lg leading-6 font-bold">{data.movie.title}</h6>
          <MovieGradeBadge className="flex-none" grade={data.movie.grade} />
        </div>
        <div className="mt-4 flex flex-row">
          <Button
            className="flex-none mr-2"
            {...(data.movie.movieNum % 2
              ? {
                  tint: "primary",
                  variant: "contained",
                }
              : {
                  tint: "neutral",
                  variant: "tonal",
                })}
            iconStart={<IoHeart />}
          />
          <Button className="flex-1" variant="tonal" tint="neutral" onClick={(e) => {
            e.stopPropagation();
            alert("예매");
          }}>
            예매
          </Button>
        </div>
      </div>
      </Suspense>
    </div>
  );
}
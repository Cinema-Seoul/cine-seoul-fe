import clsx from "clsx";
import type { MovieGrade } from "cs:movie";
import { MouseEventHandler, Suspense, useCallback } from "react";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui";
import Loader from "../ui/loader";
import MovieGradeBadge from "./movie-grade-badge";

type MovieCardData = {
  title: string;
  summary: string;
  grade: MovieGrade;
  imageUrl: string;
};

export interface MovieCardProps extends BaseProps {
  data: MovieCardData;
  onClick?: MouseEventHandler;
}

export default function MovieCard({
  className,
  onClick,
  data,
}: MovieCardProps) {
  return (
    <div
      className={clsx(
        className,
        "bg-neutral-{{2  3}} out-1 outline-neutral-6 rounded overflow-hidden",
        "group transition cursor-pointer"
      )}
      onClick={onClick}
    >
      <Suspense fallback={<Loader />}>
        <div className="relative">
          <img
            className={clsx(
              "transition group-hover:opacity-25 object-cover",
              ":uno: w-full before:(content-none pt-125% float-left) after:(content-none block clear-both)"
            )}
            src={data.imageUrl}
          />
          <div
            className={clsx(
              "absolute top-0 bottom-0 left-0 right-0",
              "flex flex-col justify-between",
              "invisible group-hover:visible"
            )}
          >
            <div className="p-4 flex-1 overflow-y-hidden text-base text-neutral-12">
              {data.summary}
            </div>
            <div className="p-4 flex-shrink-0 text-sm border-t border-solid border-neutral-11 border-opacity-20">
              <span className="font-normal me-2">관람객 평점</span>
              {/* <span className="font-bold">4.5</span> */}
              <span className="font-bold">{null}NULL</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-row">
            <h6 className="flex-1 text-lg leading-6 font-bold h-12 overflow-hidden text-ellipsis">{data.title}</h6>
            <MovieGradeBadge className="flex-none" grade={data.grade} />
          </div>
          <div className="mt-4 flex flex-row">
            {/* <Button
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
            /> */}
            <Button
              className="flex-1"
              variant="tonal"
              tint="neutral"
              onClick={(e) => {
                e.stopPropagation();
                alert("예매");
              }}
            >
              예매
            </Button>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

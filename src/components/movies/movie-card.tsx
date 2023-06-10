import clsx from "clsx";
import { MouseEventHandler, Suspense } from "react";
import { Button } from "../ui";
import Loader from "../ui/loader";
import MovieGradeBadge from "./movie-grade-badge";

const DEFAULT_IMG = "https://placehold.co/100x200/FFF1E7/BD4B00?text=CinemaSeoul&font=Playfair%20Display";

type MovieCardData = {
  title: string;
  summary?: string;
  grade?: string;
  imageUrl?: string;
};

export interface MovieCardProps extends BaseProps {
  data: MovieCardData;
  noInteract?: boolean;
  onClick?: MouseEventHandler;
  onClickTicketing?: MouseEventHandler;
}

export default function MovieCard({ className, onClick, onClickTicketing, noInteract = false, data }: MovieCardProps) {
  return (
    <div
      className={clsx(
        className,
        "bg-neutral-2 out-1 outline-neutral-6 rounded overflow-hidden",
        "group",
        noInteract || "transition cursor-pointer hover:bg-neutral-3"
      )}
      onClick={onClick}
    >
      <Suspense fallback={<Loader />}>
        <div className="relative">
          <div
            className={clsx(
              noInteract || "transition group-hover:opacity-25",
              ":uno: w-full before:(content-none pt-150% float-left) after:(content-none block clear-both) [&>img]:(absolute top-0 bottom-0 left-0 right-0 w-full h-full)"
            )}
          >
            <img
              className="object-cover"
              src={data.imageUrl ?? DEFAULT_IMG}
              onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
            />
          </div>
          {noInteract || (
            <div
              className={clsx(
                "absolute top-0 bottom-0 left-0 right-0",
                "flex flex-col justify-between",
                "invisible group-hover:visible"
              )}
            >
              <div className="p-4 flex-1 overflow-y-hidden text-base text-neutral-12">{data.summary}</div>
              <div className="p-4 flex-shrink-0 text-sm border-t border-solid border-neutral-11 border-opacity-20">
                <span className="font-normal me-2">관람객 평점</span>
                {/* <span className="font-bold">4.5</span> */}
                <span className="font-bold">{null}NULL</span>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex flex-row">
            <h6 className="flex-1 text-lg leading-6 font-bold h-12 overflow-hidden text-ellipsis max-">{data.title}</h6>
            <MovieGradeBadge className="flex-none" gradeCode={data.grade} />
          </div>
          {noInteract || (
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
                  onClickTicketing && onClickTicketing(e);
                }}
              >
                예매
              </Button>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
}

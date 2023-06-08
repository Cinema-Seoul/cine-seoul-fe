import clsx from "clsx";
import MovieCard from "./movie-card";

import { MouseEventHandler, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { MovieCardProps } from "./movie-card";
import { MovieListEntry } from "@/types";
import { useTicketingStore } from "@/stores/client";

export interface MovieCardWrapProps extends MovieCardProps {
  headInfo?: string;
  linkToDetail?: boolean;
  linkToTicketing?: boolean;
  data: MovieListEntry;
}

export default function MovieCardWrap({
  headInfo,
  onClick: onClickRaw,
  linkToDetail = false,
  onClickTicketing: onClickTicketingRaw,
  linkToTicketing = false,
  className,
  data,
  ...restProps
}: MovieCardWrapProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const updateSelectedMovie = useTicketingStore((s) => s.updateSelectedMovie);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      onClickRaw && onClickRaw(e);
      if (linkToDetail && !e.isDefaultPrevented() && data?.movieNum) {
        navigate(`/movie/${data.movieNum}`);
      }
    },
    [data.movieNum, linkToDetail, navigate, onClickRaw]
  );

  const onClickTicketing: MouseEventHandler = useCallback(
    (e) => {
      onClickTicketingRaw && onClickTicketingRaw(e);
      if (linkToTicketing && !e.isDefaultPrevented() && data?.movieNum) {
        updateSelectedMovie(data);
        navigate(`/ticketing?redirect=${location.pathname}`);
      }
    },
    [data, linkToTicketing, location.pathname, navigate, onClickTicketingRaw, updateSelectedMovie]
  );

  return (
    <div className={clsx(className)}>
      <div className="flex flex-row justify-end items-center p-2">
        <span>{headInfo}</span>
      </div>
      <MovieCard
        className="w-full"
        data={{
          title: data.title,
          imageUrl: data.poster,
          grade: data.gradeName,
          summary: data.info,
        }}
        onClick={onClick}
        onClickTicketing={onClickTicketing}
        {...restProps}
      />
    </div>
  );
}

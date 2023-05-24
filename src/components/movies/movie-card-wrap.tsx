import clsx from "clsx";
import MovieCard from "./movie-card";

import type { MovieCardProps } from "./movie-card";

export interface MovieCardWrapProps extends MovieCardProps {
  headInfo?: string;
}

export default function MovieCardWrap({
  headInfo,
  className,
  ...restProps
}: MovieCardWrapProps) {
  return <div className={clsx(className)}>
    <div className="flex flex-row justify-end items-center p-2">
      <span>{headInfo}</span>
    </div>
    <MovieCard className="w-full" {...restProps} />
  </div>;
}

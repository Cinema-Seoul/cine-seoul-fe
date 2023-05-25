import MovieCard from './movie-card';

import type { MovieCardProps } from "./movie-card";

export interface MovieCardBoxOfficeProps extends MovieCardProps {}

export default function MovieCardBoxOffice({ className, ...restProps }: MovieCardBoxOfficeProps ) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center py-2 text-neutral-11">
        <span className="text-8 leading-8 font-bold">1.</span>
        <span className="text-base leading-8 font-normal">예매율 25.4%</span>
      </div>
    <MovieCard {...restProps} />
    </div>
  )
}
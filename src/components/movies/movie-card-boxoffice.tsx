import MovieCard from './movie-card';

import type { MovieCardProps } from "./movie-card";

export interface MovieCardBoxOfficeProps extends MovieCardProps {
  rank: number;
  ticketRate: number;
}

export default function MovieCardBoxOffice({ className, rank, ticketRate, ...restProps }: MovieCardBoxOfficeProps ) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center py-2 text-neutral-11">
        <span className="text-8 leading-8 font-bold">{rank}</span>
        <span className="text-base leading-8 font-normal">예매율 25.4%</span>
      </div>
    <MovieCard {...restProps} />
    </div>
  )
}
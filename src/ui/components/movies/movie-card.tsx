import clsx from "clsx";
import MovieGradeBadge from "./movie-grade-badge";
import { Button } from "../ui";
import { IoHeart, IoHeartCircle } from "react-icons/io5";
import type { MovieGrade } from "cs:movie";

// TODO:
const data = {
  postUrl:
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ySLgOnBTgt7a3Sv1qTVJUDMZJvu.jpg",
  title: "트랜짓",
  grade: "12" as MovieGrade,
  wish: false,
};

export interface MovieCardProps extends BaseProps {
  // TODO: add Movie Data Prop
}

export default function MovieCard({ className }: MovieCardProps) {
  return (
    <div
      className={clsx(
        className,
        "out-1 outline-neutral-6 rounded overflow-hidden"
      )}
    >
      <div>
        <img src={data.postUrl} />
      </div>
      <div className="p-4">
        <div className="flex flex-row">
          <h6 className="flex-1 text-lg leading-6 font-bold">{data.title}</h6>
          <MovieGradeBadge className="flex-none" grade={data.grade} />
        </div>
        <div className="mt-4 flex flex-row">
          <Button className="flex-none mr-2"
            {...(data.wish ? {
              tint: 'primary', variant: 'contained'
            } : {
              tint: 'neutral', variant: 'tonal'
            })} iconStart={<IoHeart />} />
          <Button className="flex-1" variant="tonal" tint="neutral">예매</Button>
        </div>
      </div>
    </div>
  );
}

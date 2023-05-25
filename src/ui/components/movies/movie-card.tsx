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
  info: "모두가 떠나는 곳에서 그녀를 만났다\n독일군이 파리로 진군하자 ‘게오르그’는 마르세유로 탈출한다. 그는 자살한 ‘바이델’ 작가의 가방을 갖고 있는데 가방에는 작가의 원고와 아내에게서 온 편지, 멕시코 대사관에서 온 비자 허가서가 있다. ‘게오르그’는 ‘바이델’ 작가로 신분을 위조해 멕시코로 떠나려 하지만 신비한 여인 ‘마리’를 만나며 모든 것이 변하게 된다.",
};

export interface MovieCardProps extends BaseProps {
  // TODO: add Movie Data Prop
}

export default function MovieCard({ className }: MovieCardProps) {
  return (
    <div
      className={clsx(
        className,
        "bg-neutral-{{2  3}} out-1 outline-neutral-6 rounded overflow-hidden",
        "group transition cursor-pointer"
      )}
    >
      <div className="relative">
        <img className="transition group-hover:opacity-25" src={data.postUrl} />
        <div
          className={clsx(
            "absolute top-0 bottom-0 left-0 right-0",
            "flex-col justify-between",
            "hidden group-hover:flex"
          )}
        >
          <div className="p-4 flex-1 overflow-y-hidden text-base text-neutral-12">
            {data.info}
            <br />
            <br />
            아래는 테스트를 위해 임의로 길이 늘린 거<br />
            <br />
            {data.info}
            {data.info}
            {data.info}
            {data.info}
          </div>
          <div className="p-4 flex-shrink-0 text-sm border-t border-solid border-neutral-6">
            <span className="font-normal me-2">관람객 평점</span>
            <span className="font-bold">4.5</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-row">
          <h6 className="flex-1 text-lg leading-6 font-bold">{data.title}</h6>
          <MovieGradeBadge className="flex-none" grade={data.grade} />
        </div>
        <div className="mt-4 flex flex-row">
          <Button
            className="flex-none mr-2"
            {...(data.wish
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
          <Button className="flex-1" variant="tonal" tint="neutral">
            예매
          </Button>
        </div>
      </div>
    </div>
  );
}

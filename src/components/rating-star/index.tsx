import clsx from "clsx";
import { ReactNode } from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

function renderStars(value: number) {
  const nodes: ReactNode[] = [];

  for (let i = 1; i <= 5; i++) {
    if (value >= i * 2) {
      nodes.push(<IoStar />);
    } else if (value >= i * 2 - 1) {
      nodes.push(<IoStarHalf />);
    } else {
      nodes.push(<IoStarOutline />);
    }
  }

  return nodes;
}

export interface RatingStarsProps extends BaseProps {
  value: number;
}

export default function RatingStars({ value, className }: RatingStarsProps) {
  // Rating은 0에서 10까지의 정수

  // : 0
  // 0: 1-2
  // 1: 3-4
  // 2: 5-6
  // 3: 7-8
  // 4: 9-10

  return <div className={clsx(className, "flex flex-row items-center")}>{renderStars(value)}</div>;
}

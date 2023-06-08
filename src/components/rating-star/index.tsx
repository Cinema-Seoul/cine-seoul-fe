import clsx from "clsx";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

export interface RatingStarsProps extends BaseProps {
  rating: number;
}

export default function RatingStars({ rating, className }: RatingStarsProps) {
  // Rating은 0에서 10까지의 정수

  // : 0
  // 0: 1-2
  // 1: 3-4
  // 2: 5-6
  // 3: 7-8
  // 4: 9-10

  return (
    <div className={clsx(className, "flex flex-row items-center")}>
      {Array.from({ length: 5 }).map((_, i) =>
        (i + 1) * 2 < rating ? <IoStar /> : rating % 2 === 1 ? <IoStarHalf /> : <IoStarOutline />
      )}
    </div>
  );
}

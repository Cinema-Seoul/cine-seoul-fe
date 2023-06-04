import clsx from "clsx";
import { Button } from "../ui";
import { useMemo } from "react";

export interface PaginationBarProps extends BaseProps {
  currentPageIndex: number; //0부터 시작
  onPageSelected?: (page: number) => void;
  pageCount: number;
}

export default function PaginationBar({
  currentPageIndex,
  pageCount,
  onPageSelected,
  className,
}: PaginationBarProps) {
  const [start, count] = useMemo(() => {
    const s = Math.max(currentPageIndex - 4, 0);
    const l = Math.min(pageCount - s, 9);
    return [s, l];
  }, [currentPageIndex, pageCount]);

  return (
    <ul
      className={clsx(className, "flex flex-row justify-center items-center space-x-2")}
    >
      {Array.from({ length: count }).map((_, i) => (
        <li key={start + i}>
          <Button
            variant={start + i === currentPageIndex ? "contained" : "text"}
            onClick={() => onPageSelected && onPageSelected(start + i)}
          >
            {start + i + 1}
          </Button>
        </li>
      ))}
    </ul>
  );
}

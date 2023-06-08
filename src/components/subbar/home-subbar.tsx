import clsx from "clsx";
import { Button } from "../ui";
import useMovieSearch from "@/hooks/useMovieSearch";

export interface HomeSubbarProps extends BaseProps {}

export default function HomeSubbar({ className }: HomeSubbarProps) {

  const { onSubmitMovieSearch, movieSearchInputName } = useMovieSearch();

  return (
    <div className={clsx(className, "py-6 bg-neutral-2")}>
      <div className="container">
        <div className="row gy-6">
          <form className="col-12 md:col-6" onSubmit={onSubmitMovieSearch}>
            <input
              className="w-full h-full rounded outline outline-1 px-4 outline-neutral-7 focus:outline-primary-7 bg-neutral-2"
              type="text"
              name={movieSearchInputName}
              placeholder="영화를 검색해보세요" />
          </form>
          <div className="col-6 md:col-2">
            <Button className="w-full" variant="tonal" tint="neutral">
              극장 안내
            </Button>
          </div>
          <div className="col-6 md:col-2">
            <Button className="w-full" variant="tonal" tint="neutral">
              상영 시간표
            </Button>
          </div>
          <div className="col-12 md:col-2">
            <Button className="w-full" variant="tonal" tint="primary">
              바로 예매
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

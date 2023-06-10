import clsx from "clsx";
import { Button } from "../ui";
import useMovieSearch from "@/hooks/useMovieSearch";
import { Link } from "react-router-dom";

export interface HomeSubbarProps extends BaseProps {}

export default function HomeSubbar({ className }: HomeSubbarProps) {
  const { onSubmitMovieSearch, movieSearchInputName } = useMovieSearch();

  return (
    <div className={clsx(className, "py-6 bg-neutral-2")}>
      <div className="container">
        <div className="row gy-6">
          <form className="col-12 md:flex-1" onSubmit={onSubmitMovieSearch}>
            <input
              className="w-full h-full rounded outline outline-1 px-4 outline-neutral-7 focus:outline-primary-7 bg-neutral-2"
              type="text"
              name={movieSearchInputName}
              placeholder="영화를 검색해보세요"
            />
          </form>
          <div className="col-6 md:col-2">
            <Button as={Link} to="/theatre" className="w-full" variant="tonal" tint="neutral">
              극장 안내
            </Button>
          </div>
          <div className="col-6 md:col-2">
            <Button as={Link} to="/ticketing" className="w-full" variant="tonal" tint="primary">
              바로 예매
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

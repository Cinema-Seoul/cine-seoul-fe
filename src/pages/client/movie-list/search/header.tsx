import { Button } from "@/components/ui";
import useMovieSearch from "@/hooks/useMovieSearch";
import clsx from "clsx";
import { FormEventHandler, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export default function LocalHeader({ className }: BaseProps) {

  const [searchParams] = useSearchParams();
  const { onSubmitMovieSearch }  = useMovieSearch();

  return (
    <header className={clsx(className)}>
      <div className="container">
        <h2 className="text-2xl font-bold text-center py-8">영화 검색 결과</h2>
        <div className="row">
          <form className="flex flex-row col-8 mx-a pb-8" onSubmit={onSubmitMovieSearch}>
            <input
              className="flex-1"
              type="search"
              name="q"
              placeholder="영화 제목으로 검색하세요"
              defaultValue={searchParams.get("q") ?? ""}
            />
            <Button className="flex-0 ml-6" type="submit" variant="contained" tint="primary">
              검색
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}

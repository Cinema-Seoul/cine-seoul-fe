import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { fakeMovies } from "@/_fake";
import { useTicketingStore } from "@/stores/client";
import { StepSection } from "@/ui/components/ticketing";
import { Button } from "@/ui/components/ui";
import clsx from "clsx";

import MovieGradeBadge from "@/ui/components/movies/movie-grade-badge";
import { IoRemove } from "react-icons/io5";
import { MouseEventHandler, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useNavigation } from "react-router-dom";
import { MovieListEntry } from "@/types";
import { date, fmt, parse8DigitDateString } from "@/utils/date";

const MovieItem = ({
  className,
  movie,
  onClickRemove,
}: {
  movie: MovieListEntry;
  onClickRemove: MouseEventHandler;
} & BaseProps) =>  {

  const releaseDate = useMemo(() => parse8DigitDateString(movie.releaseDate), [movie.releaseDate]);

  return <motion.div
  className={clsx(className, "rounded out-1 outline-neutral-7 flex flex-row h-24")}
    initial={{ opacity: 0, transform: "scale(1)", transformOrigin: "0 0" }}
    animate={{ opacity: 1, transform: "scale(1)" }}
    exit={{ opacity: 0, transform: "scale(0)", height: 0 }}
  >
    <img className="flex-none h-full" src={movie.poster} />
    <div className="flex-1 p-4">
      <div className="flex flex-row items-center text-lg font-bold">
        {movie.title}
        <MovieGradeBadge className="ml-2" grade={movie.gradeName} />
      </div>
      <div className="">
        {releaseDate && <span>{fmt(releaseDate, "PPP")} 개봉</span>}
        {movie.runningTime && <span>{movie.runningTime}분</span>}
      </div>
    </div>
    <div className="flex-0">
      <Button variant="text" tint="primary" iconStart={<IoRemove />} onClick={onClickRemove} />
    </div>
  </motion.div>
}

export default function MovieSelectSubpage({ className }: BaseProps) {
  const { selectedMovie, updateSelectedMovie, clearSelectedMovie } = useTicketingStore();

  const navigate = useNavigate();

  const doOnClickAddButton = useCallback(() => {
    navigate("/movie");
  }, [navigate]);

  return (
    <StepSection title="영화" className={className} bodyClass="p-4">
      {/* <ul className="mt--2">
        <AnimatePresence>
          {selectedMovies.map((m, i) => (
            <li key={m.movieNum} className="w-full">
              <MovieItem
                className="mt-2"
                movie={m}
                onClickRemove={() => removeSelectedMovie(i)}
              />
            </li>
          ))}
        </AnimatePresence>
      </ul> */}
      <div className="py-2">
        {selectedMovie && <MovieItem movie={selectedMovie} onClickRemove={clearSelectedMovie} />}
      </div>
      <div className="mt-4">
        <Button className="w-full" onClick={doOnClickAddButton}>
          다른 영화
        </Button>
      </div>
    </StepSection>
  );
}

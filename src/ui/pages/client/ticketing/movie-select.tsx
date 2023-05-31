import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { fakeMovies } from "@/_fake";
import { useTicketingStore } from "@/stores/client";
import { StepSection } from "@/ui/components/ticketing";
import { Button } from "@/ui/components/ui";
import clsx from "clsx";

import type { Movie } from "@/domains";
import MovieGradeBadge from "@/ui/components/movies/movie-grade-badge";
import { IoRemove } from "react-icons/io5";
import { MouseEventHandler } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MovieItem = ({
  className,
  movie,
  onClickRemove,
}: {
  movie: Movie;
  onClickRemove: MouseEventHandler;
} & BaseProps) => (
  <motion.div
    className={clsx(className, "rounded out-1 outline-neutral-7 flex flex-row h-24")}
    initial={{ opacity: 0, transform: 'scale(1)', transformOrigin: '0 0' }}
    animate={{ opacity: 1, transform: 'scale(1)' }}
    exit={{ opacity: 0, transform: 'scale(0)', height: 0 }}
  >
    <img className="flex-none h-full" src={movie.poster} />
    <div className="flex-1 p-4">
      <div className="flex flex-row items-center text-lg font-bold">
        {movie.title}
        <MovieGradeBadge className="ml-2" grade={movie.grade} />
      </div>
      <div className="">
        {movie.releaseDate && (
          <span>{format(movie.releaseDate, "PPP", { locale: ko })} 개봉</span>
        )}
        {movie.runningTime && <span>{movie.runningTime}분</span>}
      </div>
    </div>
    <div className="flex-0">
      <Button
        variant="text"
        tint="primary"
        iconStart={<IoRemove />}
        onClick={onClickRemove}
      />
    </div>
  </motion.div>
);

export default function MovieSelectSubpage({ className }: BaseProps) {
  const {
    selectedMovies,
    addSelectedMovie,
    clearSelection,
    removeSelectedMovie,
  } = useTicketingStore();

  return (
    <StepSection title="영화 고르기" className={className} bodyClass="p-4">
      <ul className="mt--2">
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
      </ul>
      <div>
        <Button
          onClick={() => {
            fakeMovies.forEach((m) => {
              try {
                addSelectedMovie(m);
              } catch (e: any) {
                alert(e.message);
              }
            });
          }}
        >
          ADD MOVIE
        </Button>
      </div>
    </StepSection>
  );
}

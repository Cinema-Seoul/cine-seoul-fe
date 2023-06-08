import { StepSection } from "@/components/ticketing";
import { Button } from "@/components/ui";
import { useTicketingStore } from "@/stores/client";
import clsx from "clsx";

import { MovieSelectionState } from "@/types";
import { parse8DigitDateString } from "@/utils/date";
import { motion } from "framer-motion";
import { MouseEventHandler, useCallback, useMemo } from "react";
import { IoRemove } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const MovieItem = ({
  className,
  movie,
  onClickRemove,
}: {
  movie: MovieSelectionState;
  onClickRemove: MouseEventHandler;
} & BaseProps) => {
  const releaseDate = useMemo(() => parse8DigitDateString(movie.releaseDate), [movie.releaseDate]);

  return (
    <motion.div
      className={clsx(className, "rounded out-1 outline-neutral-7 flex flex-row")}
      initial={{ opacity: 0, transform: "scale(1)", transformOrigin: "0 0" }}
      animate={{ opacity: 1, transform: "scale(1)" }}
      exit={{ opacity: 0, transform: "scale(0)", height: 0 }}
    >
      <img className="w-24 h-full" src={movie.poster} />
      <div className="flex-1 p-4">
        <div className="flex flex-row items-center text-lg font-bold">
          {movie.title}
          {/* <MovieGradeBadge className="ml-2" grade={movie.gradeName} /> */}
        </div>
        <div>
          {movie.gradeName && <p className="text-sm">{movie.gradeName}</p>}
          {movie.runningTime > 0 && <p className="text-sm">{movie.runningTime}분</p>}
        </div>
      </div>
      <div className="flex-0">
        <Button variant="text" tint="primary" iconStart={<IoRemove />} onClick={onClickRemove} />
      </div>
    </motion.div>
  );
};

export default function MovieSelectSubpage({ className }: BaseProps) {
  const { selectedMovie, updateSelectedMovie, clearSelectedMovie } = useTicketingStore();

  const navigate = useNavigate();

  const doOnClickAddButton = useCallback(() => {
    navigate("/movie");
  }, [navigate]);

  return (
    <StepSection title="영화" className={className} bodyClass="p-4">
      <div className="py-2">
        {selectedMovie ? (
          <MovieItem movie={selectedMovie} onClickRemove={clearSelectedMovie} />
        ) : (
          <div className="text-center text-lg">모든 영화에서</div>
        )}
      </div>
      <div className="mt-4">
        <Button className="w-full" onClick={doOnClickAddButton}>
          {selectedMovie ? "다른 영화 고르기" : "특정 영화 고르기"}
        </Button>
      </div>
    </StepSection>
  );
}

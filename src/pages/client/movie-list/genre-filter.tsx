import { useGetApi } from "@/services/api";
import { getGenres } from "@/services/movie/movie.service";
import { useMovieListStore } from "@/stores/client";
import { Genre } from "@/types";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";

export interface GenreFiltersProps extends BaseProps {
  showOnlySelected?: boolean;
}

export default function GenreFilters({ className, showOnlySelected = false }: GenreFiltersProps) {
  const [genre, updateGenre, clearGenre] = useMovieListStore((s) => [s.genre, s.updateGenre, s.clearGenre]);

  const Genres = useGetApi(() => getGenres());

  const toggleGenre = useCallback(
    (item: Genre) => {
      if (genre?.genreCode === item.genreCode) clearGenre();
      else updateGenre(item);
    },
    [clearGenre, genre?.genreCode, updateGenre]
  );

  return (
    <ul className={clsx(className, "flex flex-wrap flex-row")}>
      <AnimatePresence mode="sync">
        {Genres.data &&
          (showOnlySelected && genre ? [genre] : Genres.data).map((item) => ( item &&
            <motion.li
              layout
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={item.genreCode}
              className="m-2"
            >
              <div
                className={clsx(
                  "out-1 rounded-full px-3 outline-neutral-6 leading-loose",
                  genre?.genreCode === item.genreCode ? "bg-primary-9 out-primary-10 text-primary-1" : "pressable-tonal"
                )}
                onClick={() => toggleGenre(item)}
              >
                #{item.name}
              </div>
            </motion.li>
          ))}
      </AnimatePresence>
    </ul>
  );
}

import MovieCardWrap from "@/components/movies/movie-card-wrap";
import { useMovieListStore } from "@/stores/client";
import { MovieListEntry } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export interface MovieListProps {
  items: MovieListEntry[];
  itemHeadContent?: (item: MovieListEntry) => string | undefined;
}

export default function MovieList({ items, itemHeadContent }: MovieListProps) {
  const sortBy = useMovieListStore((s) => s.sortBy);

  return (
    <AnimatePresence mode="wait">
      <motion.ul className="row gy-6" initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.movieNum} className="col-3">
              <MovieCardWrap
                className="w-full"
                headInfo={itemHeadContent && itemHeadContent(item)}
                data={item}
                linkToDetail
                linkToTicketing
              />
            </li>
          ))
        ) : (
          <div className="text-center text-lg py-8">
            <p>찾으시는 항목이 존재하지 않아요 :(</p>
          </div>
        )}
      </motion.ul>
    </AnimatePresence>
  );
}

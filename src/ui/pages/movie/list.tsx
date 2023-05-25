import { useEffect, useState } from "react";
import MovieListHeader from "@/ui/components/header/movie-list-header";
import MainLayout from "../_layouts/main-layout";
import MovieCardWrap from "@/ui/components/movies/movie-card-wrap";
import Loader from "@/ui/components/ui/loader";

import type { Movie } from "@/domains";
import { fetchMovies } from "@/services/movie/movie.service";
import { useFetchApi } from "@/services/api";

function MovieList({ items }: { items: Movie[] }) {
  return (
    <ul className="row gy-6">
      {items.map((item, index) => (
        <li key={`card-${index}`} className="col-3">
          <MovieCardWrap
            className="w-full"
            headInfo="예매율 16.6%"
            data={{ movie: item }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function MovieListPage() {
  const [movies, isLoading] = useFetchApi(fetchMovies());

  return (
    <MainLayout>
      <section>
        <MovieListHeader />
        <div className="container pt-12">
          {isLoading ? (
            <Loader className="w-16 mx-a mt-12" />
            ) : movies ? (
            <MovieList items={movies} />
          ) : (
            <div>Error</div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

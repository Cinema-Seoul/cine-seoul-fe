import { MouseEventHandler, useEffect, useState } from "react";
import MovieListHeader from "@/ui/components/header/movie-list-header";
import MainLayout from "../../_layouts/main-layout";
import MovieCardWrap from "@/ui/components/movies/movie-card-wrap";
import Loader from "@/ui/components/ui/loader";

import { useGetMovies } from "@/services/movie/movie.application";

import type { MovieListEntry } from "@/domains";
import { useNavigate } from "react-router-dom";

function MovieList({ items }: { items: MovieListEntry[] }) {
  const navigate = useNavigate();

  return (
    <ul className="row gy-6">
      {items.map((item, index) => (
        <li key={`card-${index}`} className="col-3">
          <MovieCardWrap
            className="w-full"
            headInfo="예매율 16.6%"
            data={{
              title: item.title,
              grade: "12",
              imageUrl: "https://image.tmdb.org/t/p/w500/ySLgOnBTgt7a3Sv1qTVJUDMZJvu.jpg",
              summary: "",
             }}
            onClick={() => { navigate(`/movie/${item.movieNum}`); }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function MovieListPage() {
  const {
    data: movies,
    loading,
    page,
    setPage,
  } = useGetMovies();

  return (
    <MainLayout>
      <section>
        <MovieListHeader />
        <div className="container pt-12">
          {loading ? (
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

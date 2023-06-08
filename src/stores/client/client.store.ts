import { create } from "zustand";

import { GetMoviesSortBy, GetMoviesType } from "@/services/movie/movie.service";
import { SortDirection } from "@/services/api";
import { Genre } from "@/types";

export type MovieListStoreState = {
  type: GetMoviesType;
  sortBy: GetMoviesSortBy;
  sortDir: SortDirection;
  genre?: Genre;
};

export type MovieListStoreActions = {
  updateType: (t: GetMoviesType) => void;
  updateSortBy: (t: GetMoviesSortBy, resetDir?: boolean) => void;
  updateSortDir: (t: SortDirection) => void;
  switchSortDir: () => void;
  updateGenre: (t: Genre) => void;
  reset: () => void;
};

const initialMovieListStore: MovieListStoreState = {
  type: GetMoviesType.all,
  sortBy: GetMoviesSortBy.releaseDate,
  sortDir: SortDirection.desc,
  genre: undefined,
};

export const useMovieListStore = create<
  MovieListStoreState & MovieListStoreActions
>((set) => ({
  ...initialMovieListStore,
  updateType: (t) => set({ type: t }),
  updateSortBy: (t, resetDir) =>
    resetDir
      ? set((o) => ({ sortBy: t, sortDir: initialMovieListStore.sortDir }))
      : set({ sortBy: t }),
  updateSortDir: (t) => set({ sortDir: t }),
  switchSortDir: () =>
    set((o) => ({ sortDir: o.sortDir === SortDirection.asc ? SortDirection.desc : SortDirection.asc })),
  updateGenre: (t) => set({ genre: t }),
  reset: () => set(initialMovieListStore),
}));

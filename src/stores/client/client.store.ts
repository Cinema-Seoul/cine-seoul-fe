import { create } from "zustand";

import {
  QueryGenre,
  QueryType,
  SortMovieBy,
} from "@/services/movie/movie.service";
import { SortDirection } from "@/services/api";

export type MovieListStoreState = {
  type: QueryType;
  sortBy: SortMovieBy;
  sortDir: SortDirection;
  genre?: QueryGenre;
};

export type MovieListStoreActions = {
  updateType: (t: QueryType) => void;
  updateSortBy: (t: SortMovieBy, resetDir?: boolean) => void;
  updateSortDir: (t: SortDirection) => void;
  switchSortDir: () => void;
  updateGenre: (t: QueryGenre) => void;
  reset: () => void;
};

const initialMovieListStore: MovieListStoreState = {
  type: "all",
  sortBy: SortMovieBy.releaseDate,
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

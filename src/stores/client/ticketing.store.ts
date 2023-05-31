import { create } from "zustand";

import type { Movie, Schedule, Seat } from "@/domains";

export type TicketingStore = {
  selectedMovies: Movie[];
  selectedSchedule?: Schedule;
  selectedSeat?: Seat;
  //
  clearSelection: () => void;
  addSelectedMovie: (movie: Movie) => void;
  removeSelectedMovie: (query: number | Movie) => void;
};

export const useTicketingStore = create<TicketingStore>((set, get) => ({
  selectedMovies: [],
  selectedSchedule: undefined,
  selectedSeat: undefined,
  //
  clearSelection: () =>
    set({
      selectedMovies: [],
      selectedSchedule: undefined,
      selectedSeat: undefined,
    }),
  addSelectedMovie: (movie) => {
    set((s) => {
      if (s.selectedMovies.some((m) => m.movieNum === movie.movieNum)) {
        throw Error("이미 선택된 영화예요.");
      }
      return {
        selectedMovies: [...s.selectedMovies, movie],
      };
    });
  },
  removeSelectedMovie: (query) =>
    set((s) => ({
      selectedMovies: s.selectedMovies.filter((v, i) =>
        typeof query === "number" ? query !== i : query !== v
      ),
    })),
}));

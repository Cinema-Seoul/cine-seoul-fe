import { create } from "zustand";

import type { MovieListEntry, MovieSelectionState, ScheduleListEntry, Seat } from "@/types";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type TicketingStoreState = {
  selectedDate?: Date;
  selectedMovie?: MovieSelectionState;
  selectedSchedule?: ScheduleListEntry;
  selectedSeats: Seat[];
};

export type TicketingStoreActions = {
  updateDate: (date?: Date) => void;
  clearSelection: () => void;

  // addSelectedMovie: (movie: MovieListEntry) => void;
  // removeSelectedMovie: (query: number | MovieListEntry) => void;
  clearSelectedMovie: () => void;
  updateSelectedMovie: (movie: MovieSelectionState) => void;

  clearSelectedSchedule: () => void;
  updateSelectedSchedule: (sched: ScheduleListEntry) => void;

  clearSelectedSeats: () => void;
  // addSelectedSeat: (seat: Seat) => void;
  removeSelectedSeat: (seat: number | Seat) => void;
  toggleSelectedSeat: (seat: Seat) => void;

  resetAll: () => void;
};

export const initialTicketingStore: TicketingStoreState = {
  selectedDate: new Date(),
  selectedMovie: undefined,
  selectedSchedule: undefined,
  selectedSeats: [],
};

export const useTicketingStore = create<TicketingStoreState & TicketingStoreActions>()(
  // persist(
  devtools((set, get) => ({
    ...initialTicketingStore,

    updateDate: (date) => {
      set({ selectedDate: date });
    },

    clearSelection: () => {
      set({
        selectedMovie: undefined,
        selectedSchedule: undefined,
        selectedSeats: [],
      });
    },

    // addSelectedMovie: (movie) => {
    //   set((s) => {
    //     if (s.selectedMovies.some((m) => m.movieNum === movie.movieNum)) {
    //       throw Error("이미 선택된 영화예요.");
    //     }
    //     return {
    //       selectedMovies: [...s.selectedMovies, movie],
    //     };
    //   });
    // },
    // removeSelectedMovie: (query) => {
    //   set((s) => ({
    //     selectedMovies: s.selectedMovies.filter((v, i) => (typeof query === "number" ? query !== i : query !== v)),
    //   }));
    // },

    clearSelectedMovie: () => {
      set({ selectedMovie: undefined }, false, "clearSelMovie");
    },

    updateSelectedMovie: (movie) => {
      set({ selectedMovie: movie }, false, "updateSelMovie");
    },

    clearSelectedSchedule: () => {
      set({ selectedSchedule: undefined, selectedSeats: [] }, false, "clearSelSched");
    },
    updateSelectedSchedule: (sched) => {
      set({ selectedSchedule: sched, selectedSeats: [] }, false, "updateSelSched");
    },

    clearSelectedSeats: () => {
      set({ selectedSeats: [] }, false, "clearSelSeats");
    },
    // addSelectedSeat: (seat) => {
    //   set(o => ({ selectedSeats: [...o.selectedSeats, seat] }));
    // },
    removeSelectedSeat: (seat) => {
      const seatNum = typeof seat === "number" ? seat : seat.seatNum;

      set((o) => ({
        selectedSeats: o.selectedSeats.filter((s) => s.seatNum !== seatNum),
      }));
    },
    toggleSelectedSeat: (seat) => {
      set(({ selectedSeats: old }) => ({
        selectedSeats: old.some((s) => s.seatNum === seat.seatNum)
          ? old.filter((s) => s.seatNum !== seat.seatNum)
          : [...old, seat],
      }));
    },

    resetAll: () => {
      set(initialTicketingStore);
    },
  }))
  //   {
  //     name: "cs-ticketing",
  //     storage: createJSONStorage(() => sessionStorage),
  //   }
  // )
);

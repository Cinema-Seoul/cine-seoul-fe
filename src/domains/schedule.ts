import { MovieListEntry, ScheduleSeat, Screen } from ".";

// export type Schedule = {
//   schedNum: number;
//   schedTime: Date;
//   order: number;
//   emptySeat: number;
//   screen: Screen;
//   movie: {
//     movieNum: number;
//     title: string;
//     grade: {
//       gradeCode: string;
//       name: string;
//       isAdult?: YN;
//     }
//     poster?: string;
//   };

//   //추가적
//   movieType: null | '자막' | '더빙',
//   screenType: null | '3D' | 'IMAX' | 'IMAX 3D' | '4DX';
// };

export type ScheduleDetail = {
  emptySeat: number;
  movie: MovieListEntry;
  order: number;
  schedNum: number;
  schedTime: Date;
  scheduleSeats: ScheduleSeat[];
  screen: Omit<Screen, "seats">;
};

export type ScheduleListEntry = {
  emptySeat: number;
  movie: MovieListEntry;
  order: number;
  schedNum: number;
  schedTime: Date;
  scheduleSeats: ScheduleSeat[];
  screen: Omit<Screen, "seats">;
};

export type ScheduleCreation = {
  movieNum: number;
  order: number;
  schedTime: Date;
  screenNum: number;
};

export type ScheduleUpdating = {
  order?: number;
  schedNum: number;
  schedTime?: Date;
  screenNum?: number;
}

//

export function makeScheduleCreation({ movie, order, schedTime, screen }: ScheduleDetail): ScheduleCreation {
  return {
    movieNum: movie.movieNum,
    order,
    schedTime,
    screenNum: screen.screenNum,
  };
}

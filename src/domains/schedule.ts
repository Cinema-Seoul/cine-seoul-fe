import type { Movie, Screen } from ".";

export type Schedule = {
  schedNum: number;
  schedTime: Date;
  order: number;
  emptySeat: number;
  screen: Screen;

  //추가적
  movie: Movie;
  movieType: null | '자막' | '더빙',
  screenType: null | '3D' | 'IMAX' | 'IMAX 3D' | '4DX';
};
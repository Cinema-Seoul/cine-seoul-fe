export type MovieNum = number;

export type Movie = {
  movieNum: MovieNum;
  title: string;
  info: string;
  releaseDate: Date | null;
  runningTime: number | null;
  isShowing: boolean;
};
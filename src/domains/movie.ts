import type { MovieGrade } from "cs:movie";

export type MovieNum = number;

export type Movie = {
  movieNum: MovieNum;
  title: string;
  poster: string;
  info: string;
  releaseDate: Date | null;
  runningTime: number | null;
  isShowing: boolean;
  grade: MovieGrade;
};
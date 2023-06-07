import { ActorListEntry, DirectorListEntry, Genre, Grade, Is } from ".";

export type MovieDetail = {
  actorList: ActorListEntry[];
  directorList: DirectorListEntry[];
  distName: string[];
  genreList: Genre[];
  gradeName: Grade;
  info: string;
  isShowing: Is;
  movieNum: number;
  releaseDate: Is;
  runningTime: number;
  poster: string; // URL
  title: string;
};

export type MovieListEntry = {
  movieNum: number;
  title: string;
  gradeName: string;
  genreList: Genre[];
  distName: string;
  isShowing: Is;
  runningTime: number;
  releaseDate: string;
  poster: string; // URL
  info: string;
  ticketCount: number;
};

export type MovieCreation = {
  actorNumList: number[];
  directorNumList: number[];
  distNum: number;
  genreCodeList: string[];
  gradeCode: string;
  info: string;
  isShowing: Is;
  releaseDate: string;
  runningTime: number;
  title: string;
};

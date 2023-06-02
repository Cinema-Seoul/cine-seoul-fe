import { Api } from "api:domain";

export type MovieDetail = {
  actorList: string[];
  directorList: string[];
  distName: string[];
  genreList: string[];
  gradeName: string;
  info: string;
  isShowing: Api.TrueOrFalse;
  movieNum: number;
  releaseDate: Api.ReleaseDate;
  runningTime: number;
  title: string;
};

export type MovieListEntry = {
  movieNum: Api.UniqueNum;
  title: string;
  gradeName: string;
  genreList: string[];
  distName: string;
  isShowing: Api.TrueOrFalse;
  runningTime: number;
  releaseDate: Api.ReleaseDate;
  poster: string; // URL
  info: string;
};

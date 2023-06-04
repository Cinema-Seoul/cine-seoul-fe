import { Api } from "api:domain";
import { Genre, Grade } from "./code-domain";
import { Actor, Director } from "./person";

export type MovieDetail = {
  actorList: Actor[];
  directorList: Director[];
  distName: string[];
  genreList: Genre[];
  gradeName: Grade;
  info: string;
  isShowing: Api.TrueOrFalse;
  movieNum: number;
  releaseDate: Api.ReleaseDate;
  runningTime: number;
  poster: string; // URL
  title: string;
};

export type MovieListEntry = {
  movieNum: Api.UniqueNum;
  title: string;
  gradeName: string;
  genreList: Genre[];
  distName: string;
  isShowing: Api.TrueOrFalse;
  runningTime: number;
  releaseDate: Api.ReleaseDate;
  poster: string; // URL
  info: string;
  ticketCount: number;
};

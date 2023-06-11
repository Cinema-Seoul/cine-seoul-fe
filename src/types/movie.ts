import { ActorListEntry, DirectorListEntry, Genre, Grade, Is } from ".";
import { Country } from "./country";

export type MovieDetail = {
  actorList: ActorListEntry[];
  directorList: DirectorListEntry[];
  distName: string;
  genreList: Genre[];
  countryList: Country[];
  gradeName: Grade;
  info: string;
  isShowing: Is;
  movieNum: number;
  releaseDate: string;
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
  poster: string; // URL
  actorNumList: number[];
  directorNumList: number[];
  countryList: Country[];
  distNum: number;
  genreCodeList: string[];
  gradeCode: string;
  info: string;
  isShowing: Is;
  releaseDate: string;
  runningTime: number;
  title: string;
};

export type MovieUpdating = Partial<MovieCreation> & {
  movieNum: number;
}

export type MovieSelectionState = MovieListEntry;

// export function toMovieSelectionState<T extends MovieSelectionState>({
//   movieNum,
//   poster,
//   releaseDate,
//   runningTime,
//   title,
// }: T): MovieSelectionState {
//   return { movieNum, poster, releaseDate, runningTime, title };
// }

export function convertMovieDetailToMovieListEntry(detail: MovieDetail): MovieListEntry {
  const { movieNum, title, genreList, distName, isShowing, runningTime, releaseDate, poster, info } = detail;

  return {
    movieNum,
    title,
    gradeName: detail.gradeName.name,
    genreList,
    distName,
    isShowing,
    runningTime,
    releaseDate,
    poster,
    info,
    ticketCount: -1, //TODO: 티켓 카운트가 detail에는 없음
  };
}

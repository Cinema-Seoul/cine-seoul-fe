import axios from "axios";
import {
  MovieListEntry,
  MovieDetail,
  Genre,
  Grade,
  ListResponse,
  MovieCreation,
} from "@/types";
import { PagableRequest, SortableRequest } from "../api";

/* -------------------------------------------------------------------------- */
/*                                    Movie                                   */
/* -------------------------------------------------------------------------- */

/** GET /movie */

export enum GetMoviesType {
  all = "all",
  showing = "showing",
  upcoming = "upcomming",
}

export enum GetMoviesSortBy {
  genre = "genre",
  grade = "grade",
  movieNum = "movie_num",
  releaseDate = "release_date",
  ticketCount = "ticket_count",
}

export interface GetMoviesOptions extends PagableRequest, SortableRequest<GetMoviesSortBy> {
  type: GetMoviesType;
  genre?: Genre["genreCode"];
}

export async function getMovies({
  type,
  page = 0,
  size = 12,
  sortBy: sort_by,
  sortDir: sort_dir,
  genre,
}: GetMoviesOptions): Promise<ListResponse<MovieListEntry>> {
  return axios
    .get<ListResponse<MovieListEntry>>("/movie", {
      params: {
        type,
        page,
        size,
        sort_by,
        sort_dir,
        genre,
      },
    })
    .then((res) => res.data);
}

/** POST /movie */

export async function createMovie(movie: MovieCreation): Promise<number> {
  return axios.post<number>("/movie", { ...movie }).then((res) => res.data);
}

/** PUT /movie */

export async function updateMovie(
  movieNum: number,
  movie: Partial<MovieCreation>
): Promise<number> {
  return axios
    .put<number>("/movie", { ...movie, movie_num: movieNum })
    .then((res) => res.data);
}

/** GET /movie/{num}/detail */

export interface GetMovieDetailOptions {}

export async function getMovieDetail(
  num: number
  // {}: GetMovieDetailOptions
): Promise<MovieDetail> {
  return axios.get<MovieDetail>(`/movie/${num}/detail`).then((res) => res.data);
}

/** GET /movie/search */

export interface GetMoviesQuery {
  title: string;
}

export async function getMoviesByQuery(
  query: GetMoviesQuery
): Promise<MovieListEntry[]> {
  return axios
    .get<MovieListEntry[]>("/movie/search", {
      params: { title: query.title },
    })
    .then((res) => res.data);
}

/* -------------------------------------------------------------------------- */
/*                                    Genre                                   */
/* -------------------------------------------------------------------------- */

/** GET /genre */

export async function getGenres(): Promise<Genre[]> {
  return axios.get<Genre[]>("/genre", {}).then((res) => res.data);
}

/** POST /genre => GenreCode */

export async function createGenre(genre: Genre): Promise<string> {
  return axios.post<string>("/genre", { ...genre }).then((res) => res.data);
}

/** GET /genre/{code} */

export async function getGenreDetail(genreCode: string): Promise<Genre> {
  return axios.get<Genre>(`/genre/${genreCode}`, {}).then((res) => res.data);
}

/* -------------------------------------------------------------------------- */
/*                                    Grade                                   */
/* -------------------------------------------------------------------------- */

/** GET /grade */

export async function getGrades(): Promise<ListResponse<Grade>> {
  return axios.get<ListResponse<Grade>>("/grade", {}).then((res) => res.data);
}

/** POST /grade => GradeCode */

export async function createGrade(grade: Grade): Promise<string> {
  return axios.post<string>("/grade", { ...grade }).then((res) => res.data);
}

/** GET /grade/{code} */

export async function getGradeDetail(gradeCode: string): Promise<Grade> {
  return axios.get<Grade>(`/grade/${gradeCode}`, {}).then((res) => res.data);
}

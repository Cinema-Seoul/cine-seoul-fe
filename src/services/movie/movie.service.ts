import axios from "axios";

import type { MovieListEntry, MovieDetail } from "@/domains";
import { ListResponse } from "@/domains/api";

export enum SortMovieBy {
  genre = "genre",
  grade = "grade",
  movieNum = "movieNum",
  releaseDate = "releaseDate",
  ticketCount = "ticketCount",
}

export type QueryType = "all" | "showing" | "upcomming";
export type QueryGenre = string;

/**
 * GET /movie
 * [PARAM] page, size, sort_by, sort_dir, type*, genre,
 */

export interface GetMoviesOptions extends WithPagination {
  type: QueryType;
  genre?: QueryGenre;
  sortBy?: SortMovieBy;
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

export interface GetMovieDetailOptions {}

export async function getMovieDetail(
  num: number
  // {}: GetMovieDetailOptions
): Promise<MovieDetail> {
  return axios.get<MovieDetail>(`/movie/${num}/detail`).then((res) => res.data);
}

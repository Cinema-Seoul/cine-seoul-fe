import axios from "axios";

import type { MovieListEntry, MovieDetail } from "@/domains";

export interface GetMoviesOptions extends WithPagination {}

/*TODO: pagination*/
export async function getMovies({
  page = 1,
}: GetMoviesOptions): Promise<MovieListEntry[]> {
  return axios.get<MovieListEntry[]>("/movie").then((res) => res.data);
}

export interface GetMovieDetailOptions {}

export async function getMovieDetail(
  num: number,
  // {}: GetMovieDetailOptions
): Promise<MovieDetail> {
  return axios.get<MovieDetail>(`/movie/${num}/detail`).then((res) => res.data);
}

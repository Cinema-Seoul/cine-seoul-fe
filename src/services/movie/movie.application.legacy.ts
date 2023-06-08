import { Genre } from "@/types";
import {
  PagableRequest,
  SortableRequest,
  useGetApi,
  useGetApiWithPagination,
  useSetApi,
} from "../api";
import {
  GetMoviesSortBy,
  GetMoviesType,
  createGenre,
  createGrade,
  createMovie,
  getGenreDetail,
  getGenres,
  getGradeDetail,
  getGrades,
  getMovieDetail,
  getMovies,
  getMoviesByQuery,
  updateMovie,
} from "./movie.service";

/* -------------------------------------------------------------------------- */
/*                                    Movie                                   */
/* -------------------------------------------------------------------------- */

/** Get Movie List */

export interface UseGetMoviesOptions {
  type?: GetMoviesType;
  genre?: Genre["genreCode"];
}

export function useGetMovies(
  options: UseGetMoviesOptions = {},
  pagable: PagableRequest = {},
  sortable: SortableRequest<GetMoviesSortBy> = {}
) {
  const { genre, type = GetMoviesType.all } = options;
  const { initialPage = 0, pageSize = 12 } = pagable;
  const { sortBy, sortDir } = sortable;

  return useGetApiWithPagination(
    (page, size) => getMovies({ page, size, sortBy, sortDir, type, genre }),
    {
      initialPage,
      pageSize,
    }
  );
}

/** Create new Movie */

export function useCreateMovie(...args: Parameters<typeof createMovie>) {
  return useSetApi(() => createMovie(...args));
}

/** Update existing Movie */

export function useUpdateMovie(...args: Parameters<typeof updateMovie>) {
  return useSetApi(() => updateMovie(...args));
}

/** Get specific Movie Detail */

export function useGetMovieDetail(...args: Parameters<typeof getMovieDetail>) {
  return useGetApi(() => getMovieDetail(...args));
}

/** Get Movie by Query Searching */

export function useGetMovieByQuery(
  ...args: Parameters<typeof getMoviesByQuery>
) {
  return useGetApi(() => getMoviesByQuery(...args));
}

/* -------------------------------------------------------------------------- */
/*                                    Genre                                   */
/* -------------------------------------------------------------------------- */

/** Get Genre List */

export function useGetGenres(...args: Parameters<typeof getGenres>) {
  return useGetApi(() => getGenres(...args));
}

/** Create new Genre */

export function useCreateGenre(...args: Parameters<typeof createGenre>) {
  return useSetApi(() => createGenre(...args));
}

/** Get specific Genre Detail */

export function useGetGenre(...args: Parameters<typeof getGenreDetail>) {
  return useGetApi(() => getGenreDetail(...args));
}

/* -------------------------------------------------------------------------- */
/*                                    Grade                                   */
/* -------------------------------------------------------------------------- */

/** Get Grade List */

export function useGetGrades(...args: Parameters<typeof getGrades>) {
  return useGetApi(() => getGrades(...args));
}

/** Create new Grade */

export function useCreateGrade(...args: Parameters<typeof createGrade>) {
  return useSetApi(() => createGrade(...args));
}

/** Get specific Grade Detail */

export function useGetGrade(...args: Parameters<typeof getGradeDetail>) {
  return useGetApi(() => getGradeDetail(...args));
}

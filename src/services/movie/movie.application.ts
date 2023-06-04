import { useFetchApi, useFetchApiWithPagination } from "../api";
import {
  QueryGenre,
  QueryType,
  SortMovieBy,
  getMovieDetail,
  getMovies,
} from "./movie.service";

//TODO: 백엔드에서 작업해주면 적용) 리스트 공통 옵션
export interface RequestListAPI {
  initialPage?: number;
  pageSize?: number;
}
export interface RequestSortableAPI {
  sortBy?: string;
  sortDir?: "ASC" | "DESC";
}

/** ======
 * 영화 목록 검색
 *  ====== */

export interface UseGetMoviesOptions
  extends RequestListAPI,
    RequestSortableAPI {
  sortBy?: SortMovieBy;
  type?: QueryType;
  genre?: QueryGenre;
}

export function useGetMovies({
  sortBy,
  sortDir,
  initialPage = 0,
  pageSize = 12,
  genre,
  type = 'all',
}: UseGetMoviesOptions = {}) {
  return useFetchApiWithPagination(
    (page, size) => getMovies({ page, size, sortBy, sortDir, type, genre }),
    {
      initialPage,
      pageSize,
    }
  );
}

/** ======
 * 영화 상세정보
 *  ====== */

/* 영호 상세정보 옵션 */
export interface UseGetMovieDetailOptions {
  movieNum: number;
}

export function useGetMovieDetail({ movieNum }: UseGetMovieDetailOptions) {
  return useFetchApi(() => getMovieDetail(movieNum));
}

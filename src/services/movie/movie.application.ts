import { useFetchApiWithPagination } from "../api";
import { getMovies } from "./movie.service";

export function useGetMovies() {
  return useFetchApiWithPagination(page => getMovies({ page }));
}
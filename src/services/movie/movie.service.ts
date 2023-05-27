import type { Movie } from "@/domains";
import { fakeApiFetch } from "../api";

import { fakeMovies } from '@/_fake';

export async function fetchMovies(): Promise<Movie[]> {
  return fakeApiFetch<Movie[]>([...fakeMovies, ...fakeMovies, ...fakeMovies]);
}
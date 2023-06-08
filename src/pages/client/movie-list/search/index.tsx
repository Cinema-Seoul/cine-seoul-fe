import MainLayout from "@/pages/_layouts/main-layout";
import LocalHeader from "./header";
import MovieList from "../list";
import { useSearchParams } from "react-router-dom";
import { useGetApi } from "@/services/api";
import { getMoviesByQuery } from "@/services/movie/movie.service";
import { AxiosError } from "axios";
import { Loader } from "@/components/ui";

function Fallbacks({ error, loading, children }: any) {
  if (loading) {
    return <Loader className="w-12 h-12 m-8" />;
  } else if (error) {
    return <div>오류가 발생했어요</div>;
  }

  return children;
}

export default function SearchMovieListPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";

  const movies = useGetApi(() => getMoviesByQuery({ title: query }), [query]);

  return (
    <MainLayout>
      <LocalHeader />
      <main className="py-12">
        <div className="container">
          <Fallbacks loading={movies.loading} error={movies.error}>
            <MovieList items={movies.data ?? []} />
          </Fallbacks>
        </div>
      </main>
    </MainLayout>
  );
}

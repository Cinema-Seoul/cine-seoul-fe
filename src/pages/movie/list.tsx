import MovieListHeader from "@/components/header/movie-list-header";
import MainLayout from "../_layouts/main-layout";
import MovieCard from "@/components/movies/movie-card";
import MovieCardWrap from "@/components/movies/movie-card-wrap";

export default function MovieListPage() {
  return (
    <MainLayout>
      <section>
        <MovieListHeader />
        <div className="container pt-12">
          <ul className="row gy-6">
            {Array.from({ length: 13 }).map((_, index) => (
              <li key={`card-${index}`} className="col-3">
                <MovieCardWrap className="w-full" headInfo="예매율 16.6%" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MainLayout>
  );
}

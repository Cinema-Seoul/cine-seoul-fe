import { useFetchApi } from "@/services/api";
import { fetchMovies } from "@/services/movie/movie.service";
import MovieCardBoxOffice from "@/ui/components/movies/movie-card-boxoffice";
import HomeSubbar from "@/ui/components/subbar/home-subbar";
import { Loader } from "@/ui/components/ui";
import MainLayout from "../_layouts/main-layout";

export default function IndexPage() {
  const [movies, loading] = useFetchApi(fetchMovies());

  return (
    <MainLayout>
      <section className="bg-neutral-5">
        <div className="container text-center py-8 h-48">BANNER</div>
      </section>
      <HomeSubbar />
      <section about="Box Office" className="">
        <h2 className="text-7 leading-8 font-bold text-center pt-18 pb-6">
          박스오피스
        </h2>
        <div className="container">
          {loading ? (
            <Loader className="w-16 mx-a" />
          ) : movies ? (
            <ul className="lt-md:(px-6 space-x-6 w-full overflow-x-scroll flex flex-row flex-nowrap) md:(row gy-8)">
              {movies.map((movie, index) => (
                <li key={index} className="lt-md:(w-48 flex-shrink-0) md:col-3">
                  <MovieCardBoxOffice className="w-full" data={{ movie }} />
                </li>
              ))}
            </ul>
          ) : (
            <p>ERROR</p>
          )}
        </div>
      </section>

      <div style={{ height: "120vh" }} />
    </MainLayout>
  );
}

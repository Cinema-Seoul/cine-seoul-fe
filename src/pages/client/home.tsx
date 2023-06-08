import { SortDirection, useGetApi } from "@/services/api";
import MovieCardBoxOffice from "@/ui/components/movies/movie-card-boxoffice";
import HomeSubbar from "@/ui/components/subbar/home-subbar";
import { Loader } from "@/ui/components/ui";
import MainLayout from "../_layouts/main-layout";
import { GetMoviesSortBy, GetMoviesType, getMovies } from "@/services/movie/movie.service";
import MovieCardWrap from "@/ui/components/movies/movie-card-wrap";
import clsx from "clsx";

export default function IndexPage() {
  const topMovies = useGetApi(() =>
    getMovies({
      type: GetMoviesType.all,
      page: 0,
      size: 8,
      sortBy: GetMoviesSortBy.ticketCount,
      sortDir: SortDirection.desc,
    })
  );

  return (
    <MainLayout>
      <section className="bg-neutral-5">
        <div className="container text-center py-8 h-48">BANNER</div>
      </section>
      <HomeSubbar />
      <section about="Box Office" className="">
        <h2 className="text-7 leading-8 font-bold text-center pt-18 pb-6">예매량 TOP</h2>
        <div className="container py-12">
          {topMovies.loading ? (
            <Loader className="w-16 mx-a" />
          ) : topMovies.data ? (
            <ul className="lt-md:(px-6 space-x-6 w-full overflow-x-scroll flex flex-row flex-nowrap) md:(row gy-8)">
              {topMovies.data.list.map((item, index) => (
                <li
                  key={item.movieNum}
                  className={clsx(
                    "lt-md:(w-48 flex-shrink-0) md:col-3",
                    ":uno: relative before:(content-[attr(data-rank)] font-bold text-2xl absolute top-0)"
                  )}
                  data-rank={index + 1}
                >
                  <MovieCardWrap
                    className="w-full"
                    data={item}
                    headInfo={item?.ticketCount ? `누적 ${item.ticketCount}` : `집계 중`}
                    linkToDetail
                    linkToTicketing
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>ERROR</p>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

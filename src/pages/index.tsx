import HomeSubbar from "@/components/subbar/home-subbar";
import MainLayout from "./_layouts/main-layout";
import MovieCard from "@/components/movies/movie-card";
import MovieCardBoxOffice from "@/components/movies/movie-card-boxoffice";

export default function IndexPage() {
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
          <ul className="lt-md:(px-6 space-x-6 w-full overflow-x-scroll flex flex-row flex-nowrap) md:(row gy-8)">
            {Array.from({ length: 16 }).map((_, index) => (
              <li className="lt-md:(w-48 flex-shrink-0) md:col-3">
                <MovieCardBoxOffice className="w-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div style={{ height: "120vh" }} />
    </MainLayout>
  );
}

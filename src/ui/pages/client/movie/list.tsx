import MovieCardWrap from "@/ui/components/movies/movie-card-wrap";
import Loader from "@/ui/components/ui/loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "../../_layouts/main-layout";

import type { MovieListEntry } from "@/domains";
import { SortDirection, useGetApiWithPagination } from "@/services/api";
import { GetMoviesSortBy, GetMoviesType, getMovies } from "@/services/movie/movie.service";
import { useMovieListStore } from "@/stores/client/client.store";
import PaginationBar from "@/ui/components/pagination/pagination-bar";
import clsx from "clsx";
import { MouseEventHandler, PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { IoChevronUp } from "react-icons/io5";
import { fmt, parse8DigitDateString } from "@/utils/date";

/* Header */

function LocalTabIndex({
  label,
  onClick,
  className,
  selected = false,
}: {
  label: string;
  onClick: MouseEventHandler;
  selected?: boolean;
} & BaseProps) {
  return (
    <li className={className}>
      <a
        className={clsx(
          "relative flex items-center justify-center h-12 bg-primary-3 rounded-t cursor-pointer",
          selected
            ? ":uno: out-1 outline-primary-6 after:(content-none h-1px absolute bottom-0 left-0 right-0 bg-primary-3 mb--1px)"
            : "bg-neutral-3"
        )}
        onClick={onClick}
      >
        {label}
      </a>
    </li>
  );
}

function LocalHeaderFilter({
  active = false,
  dir = SortDirection.desc,
  onClick,
  children,
}: {
  dir: SortDirection;
  active: boolean;
  onClick?: MouseEventHandler;
} & PropsWithChildren) {
  return (
    <a
      className={clsx(
        "inline-flex flex-row h-full items-center space-x-2 cursor-pointer",
        dir === SortDirection.desc && ":uno: [&>svg]:(rotate-180)"
      )}
      onClick={onClick}
    >
      {active && <IoChevronUp />}
      <span className={clsx(active && "underline")}>{children}</span>
    </a>
  );
}

const TYPE_ITEMS: {
  code: GetMoviesType;
  displayName: string;
}[] = [
  { code: GetMoviesType.all, displayName: "모든 영화" },
  { code: GetMoviesType.showing, displayName: "개봉작만" },
  { code: GetMoviesType.upcoming, displayName: "개봉 예정" },
];

const SORT_BY_ITEMS: {
  code: GetMoviesSortBy;
  displayName: string;
}[] = [
  {
    code: GetMoviesSortBy.releaseDate,
    displayName: "개봉일",
  },
  {
    code: GetMoviesSortBy.ticketCount,
    displayName: "예매량",
  },
];

function LocalHeader({ title }: { title: string }) {
  const { type, sortBy, sortDir, genre, updateType, updateGenre, updateSortBy, switchSortDir } = useMovieListStore();

  const doOnClickSort = useCallback(
    (e: typeof sortBy) => {
      if (e === sortBy) {
        switchSortDir();
      } else {
        updateSortBy(e, true);
      }
    },
    [sortBy, switchSortDir, updateSortBy]
  );

  const doOnClickType = useCallback(
    (e: typeof type) => {
      updateType(e);
    },
    [updateType]
  );

  return (
    <header className="bg-neutral-2">
      <div className="container pt-36">
        {/* Title Field */}
        <form>
          <div className="row py-6">
            <h2 className="col text-2xl font-bold text-primary-11">{title}</h2>
            <input className="lt-md:(col-12 mt-2) md:(col-6)" type="text" placeholder="영화를 검색해보세요" />
          </div>
        </form>
        {/* Tab */}
        <nav>
          <ul className="row">
            {TYPE_ITEMS.map(({ code, displayName }, index) => (
              <LocalTabIndex
                key={index}
                selected={type === code}
                className="lt-md:(col-4) md:(col-2)"
                label={displayName}
                onClick={() => doOnClickType(code)}
              />
            ))}
          </ul>
        </nav>
      </div>
      <div className="bg-primary-3 border-t border-primary-6 h-12">
        <div className="container h-full space-x-4 flex flex-row justify-end">
          {SORT_BY_ITEMS.map(({ code, displayName }, index) => (
            <LocalHeaderFilter key={index} dir={sortDir} active={sortBy === code} onClick={() => doOnClickSort(code)}>
              {displayName}
            </LocalHeaderFilter>
          ))}
        </div>
      </div>
    </header>
  );
}

/* Body */

function LocalLoader() {
  return <Loader className="w-16 mx-a my-24" />;
}

function MovieList({
  items,
  onClickItem,
}: {
  items: MovieListEntry[];
  onClickItem: (item: MovieListEntry, index: number) => void;
}) {
  const sortBy = useMovieListStore((s) => s.sortBy);

  const headInfo = useCallback(
    ({ releaseDate: releaseDateRaw, ticketCount }: MovieListEntry) => {
      const releaseDate = releaseDateRaw && parse8DigitDateString(releaseDateRaw);
      switch (sortBy) {
        case GetMoviesSortBy.releaseDate:
          return releaseDate ? `${fmt(releaseDate, "P")} 개봉` : "개봉 미정";
        case GetMoviesSortBy.ticketCount:
          return `${ticketCount}장`;
      }
    },
    [sortBy, items]
  );

  return (
    <ul className="row gy-6">
      {items.map((item, index) => (
        <li key={item.movieNum} className="col-3">
          <MovieCardWrap
            className="w-full"
            headInfo={headInfo(item)}
            data={{
              title: item.title,
              grade: "" /* TODO: Grade */,
              imageUrl: item.poster,
              summary: item.info,
            }}
            onClick={() => onClickItem(item, index)}
          />
        </li>
      ))}
    </ul>
  );
}

/* Page */

export default function MovieListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { type, sortBy, sortDir, genre } = useMovieListStore();

  const movies = useGetApiWithPagination(
    (_p, _s) =>
      getMovies({
        page: _p,
        size: _s,
        sortBy,
        sortDir,
        type,
        genre: genre?.genreCode,
      }),
    {
      initialPage: 0,
      pageSize: 12,
    }
  );

  useEffect(() => {
    movies.invalidate();
  }, [sortBy, sortDir, type]);

  const NotFound = useMemo(
    () => (
      <div>
        <h4>{"찾을 수 없어요 :("}</h4>
        <p>{movies.error?.message}</p>
      </div>
    ),
    [movies.error?.message]
  );

  return (
    <MainLayout>
      <section>
        <LocalHeader title="영화" />
        {/* <MovieListHeader /> */}
        <div className="container pt-12 pb-12">
          {movies.loading ? (
            <LocalLoader />
          ) : movies.error ? (
            NotFound
          ) : movies.data ? (
            <>
              <MovieList items={movies.data.list} onClickItem={(item) => navigate(`/movie/${item.movieNum}`)} />
              <PaginationBar
                className="my-12"
                currentPageIndex={movies.page}
                pageCount={movies.data.totalPages}
                onPageSelected={movies.setPage}
              />
            </>
          ) : (
            NotFound
          )}
        </div>
      </section>
    </MainLayout>
  );
}

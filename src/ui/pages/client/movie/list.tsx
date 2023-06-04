import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import MovieListHeader from "@/ui/components/header/movie-list-header";
import MovieCardWrap from "@/ui/components/movies/movie-card-wrap";
import Loader from "@/ui/components/ui/loader";
import MainLayout from "../../_layouts/main-layout";

import { useGetMovies } from "@/services/movie/movie.application";

import type { MovieListEntry } from "@/domains";
import {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import clsx from "clsx";
import { IoChevronUp } from "react-icons/io5";
import PaginationBar from "@/ui/components/pagination/pagination-bar";
import { useMovieListStore } from "@/stores/client/client.store";
import { QueryType, SortMovieBy } from "@/services/movie/movie.service";

/* Constants */

const TAB_ITEM: {
  code: QueryType;
  displayName: string;
}[] = [
  { code: "all", displayName: "모든 영화" },
  { code: "showing", displayName: "개봉작만" },
  { code: "upcomming", displayName: "개봉 예정" },
];

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
  dir = "ASC",
  onClick,
  children,
}: {
  dir: "ASC" | "DESC";
  active: boolean;
  onClick?: MouseEventHandler;
} & PropsWithChildren) {
  return (
    <a
      className={clsx(
        "inline-flex flex-row h-full items-center space-x-2 cursor-pointer",
        dir === "DESC" && ":uno: [&>svg]:(rotate-180)"
      )}
      onClick={onClick}
    >
      {active && <IoChevronUp />}
      <span className={clsx(active && "underline")}>{children}</span>
    </a>
  );
}

function LocalHeader({ title }: { title: string }) {
  const {
    type,
    sortBy,
    sortDir,
    genre,
    updateType,
    updateGenre,
    updateSortBy,
    switchSortDir,
  } = useMovieListStore();

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
        <div className="row py-6">
          <h2 className="col text-2xl font-bold text-primary-11">{title}</h2>
          <input
            className="lt-md:(col-12 mt-2) md:(col-6)"
            type="text"
            placeholder="영화를 검색해보세요"
          />
        </div>
        {/* Tab */}
        <nav>
          <ul className="row">
            {TAB_ITEM.map(({ code, displayName }, index) => (
              <LocalTabIndex
                key={`maintab-${index}`}
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
          <LocalHeaderFilter
            dir={sortDir}
            active={sortBy === SortMovieBy.releaseDate}
            onClick={() => {
              doOnClickSort(SortMovieBy.releaseDate);
            }}
          >
            개봉일
          </LocalHeaderFilter>
          <LocalHeaderFilter
            dir={sortDir}
            active={sortBy === SortMovieBy.ticketCount}
            onClick={() => {
              doOnClickSort(SortMovieBy.ticketCount);
            }}
          >
            예매량
          </LocalHeaderFilter>
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
  const sortBy = useMovieListStore(s => s.sortBy);

  const headInfo = useCallback((d: MovieListEntry) => {
    switch(sortBy) {
      case SortMovieBy.releaseDate:
        return `${d.releaseDate} 개봉`;
      case SortMovieBy.ticketCount:
        return `${d.ticketCount}장`;
    }
  }, [sortBy, items]);

  return (
    <ul className="row gy-6">
      {items.map((item, index) => (
        <li key={item.movieNum} className="col-3">
          <MovieCardWrap
            className="w-full"
            headInfo={headInfo(item)}
            data={{
              title: item.title,
              grade: "",/* TODO: Grade */
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

  useEffect(() => {
    invalidate();
  }, [sortBy, sortDir, type]);

  // Tab

  // const initialTabIndex: unknown = searchParams.get("watch");
  // const [tabIndex, setTabIndex] = useState<TabItemCode>(
  //   isTabItemCode(initialTabIndex) ? initialTabIndex : "all"
  // );
  // useEffect(() => {
  //   setSearchParams((o) => ({
  //     ...o,
  //     watch: tabIndex,
  //   }));
  // }, [tabIndex]);

  // Data Fetching

  const {
    data: movies,
    loading,
    invalidate,
    page,
    setPage,
    error,
  } = useGetMovies({
    initialPage: 0,
    pageSize: 12,
    sortBy,
    sortDir,
    type,
    genre,
  });

  const NotFound = useMemo(
    () => (
      <div>
        <h4>찾을 수 없어요 :(</h4>
        <p>{error?.message}</p>
      </div>
    ),
    [error?.message]
  );

  return (
    <MainLayout>
      <section>
        <LocalHeader title="영화" />
        {/* <MovieListHeader /> */}
        <div className="container pt-12 pb-12">
          {loading ? (
            <LocalLoader />
          ) : error ? (
            NotFound
          ) : movies ? (
            <>
              <MovieList
                items={movies.list}
                onClickItem={(item) => navigate(`/movie/${item.movieNum}`)}
              />
              <PaginationBar
                className="my-12"
                currentPageIndex={page}
                pageCount={movies.totalPages}
                onPageSelected={setPage}
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

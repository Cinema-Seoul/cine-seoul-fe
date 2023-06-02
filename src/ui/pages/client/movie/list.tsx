import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import MovieListHeader from "@/ui/components/header/movie-list-header";
import MovieCardWrap from "@/ui/components/movies/movie-card-wrap";
import Loader from "@/ui/components/ui/loader";
import MainLayout from "../../_layouts/main-layout";

import { useGetMovies } from "@/services/movie/movie.application";

import type { MovieListEntry } from "@/domains";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { IoChevronUp } from "react-icons/io5";

/* Constants */

type TabItemCode = "all" | "o_now" | "o_upcoming";
function isTabItemCode(str: unknown): str is TabItemCode {
  if (typeof str !== 'string') return false;
  return TAB_ITEM.some(({ code }) => code === str);
}

const TAB_ITEM: {
  code: TabItemCode;
  displayName: string;
}[] = [
  { code: "all", displayName: "모든 영화" },
  { code: "o_now", displayName: "개봉작만" },
  { code: "o_upcoming", displayName: "개봉 예정" },
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

function LocalHeader({
  title,
  selectedTab = "all",
  onSelectTab,
}: {
  title: string;
  selectedTab: TabItemCode;
  onSelectTab: (code: TabItemCode) => void;
}) {
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
                selected={selectedTab === code}
                className="lt-md:(col-4) md:(col-2)"
                label={displayName}
                onClick={() => onSelectTab(code)}
              />
            ))}
          </ul>
        </nav>
      </div>
      <div className="bg-primary-3 border-t border-primary-6 h-12">
        <div className="container h-full space-x-4 flex flex-row justify-end">
          <a className="inline-flex flex-row h-full items-center space-x-2 cursor-pointer">
            <IoChevronUp />
            <span>예매율순</span>
          </a>
          <a className="inline-flex flex-row h-full items-center space-x-2 cursor-pointer">
            <span>개봉일순</span>
          </a>
          <a className="inline-flex flex-row h-full items-center space-x-2 cursor-pointer">
            <span>가나다순</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* Body */

function LocalLoader() {
  return <Loader className="w-16 mx-a mt-12" />;
}

function MovieList({ items }: { items: MovieListEntry[] }) {
  const navigate = useNavigate();


  /* TODO:
   * 현재 API에서 pagination을 지원하지 않아 임시로 줄여 놓음
   */
  items.splice(12);

  return (
    <ul className="row gy-6">
      {items.map((item, index) => (
        <li key={index} className="col-3">
          <MovieCardWrap
            className="w-full"
            headInfo={`예매율 ${null}`}
            data={{
              title: item.title,
              grade: "12", //item.gradeName,
              imageUrl: item.poster,
              summary: item.info,
            }}
            onClick={() => {
              navigate(`/movie/${item.movieNum}`);
            }}
          />
        </li>
      ))}
    </ul>
  );
}

/* Page */

export default function MovieListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTabIndex: unknown = searchParams.get('watch');

  // States
  const [tabIndex, setTabIndex] = useState<TabItemCode>(
    isTabItemCode(initialTabIndex) ? initialTabIndex : 'all'
  );

  // Data
  const { data: movies, loading, page, setPage } = useGetMovies();

  useEffect(() => {
    setSearchParams(o => ({
      ...o,
      watch: tabIndex,
    }));
  }, [tabIndex]);

  return (
    <MainLayout>
      <section>
        <LocalHeader 
        title="영화"
        selectedTab={tabIndex}
        onSelectTab={setTabIndex}
        />
        {/* <MovieListHeader /> */}
        <div className="container pt-12 pb-12">
          {loading ? (
            <LocalLoader />
          ) : movies ? (
            <MovieList items={movies} />
          ) : (
            <div>Error</div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}

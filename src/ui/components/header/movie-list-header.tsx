import { IoChevronUp } from "react-icons/io5";

import { MouseEventHandler, useEffect, useState } from "react";
import clsx from "clsx";
import { createSearchParams, redirect, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

const t = {
  "page-title": "영화",
};

const TabIndex = ({
  label,
  onClick,
  className,
  selected = false,
}: {
  label: string;
  onClick: MouseEventHandler;
  selected?: boolean;
} & BaseProps) => (
  <li className={className}>
    <a
      className={clsx(
        "relative flex items-center justify-center h-12 bg-primary-3 rounded-t cursor-pointer",
        selected
          ? "out-1 outline-primary-6 after:(content-none h-1px absolute bottom-0 left-0 right-0 bg-primary-3 mb--1px)"
          : "bg-neutral-3"
      )}
      onClick={onClick}
    >
      {label}
    </a>
  </li>
);

export default function MovieListHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tabIndex, setTabIndex] = useState<number>(parseInt(searchParams.get('watch') ?? '0'));

  // useEffect(() => {
  //   const watch = searchParams.get('watch');
  //   if (watch && (watch >= '0') && (watch < '2')) {
  //     setTabIndex(parseInt(watch));
  //   } else {
  //     navigate({
  //       pathname: location.pathname,
  //       search: '?watch=0',
  //     }, {
  //       replace: true,
  //     });
  //   }
  // }, []);

  useEffect(() => {
    setSearchParams(createSearchParams({ watch: `${tabIndex}` }), { replace: true });
  }, [tabIndex]);

  return (
    <header className="bg-neutral-2">
      <div className="container pt-36">
        <div className="row py-6">
          <h2 className="col text-2xl font-bold text-primary-11">
            {t["page-title"]}
          </h2>
          <input
            className="lt-md:(col-12 mt-2) md:(col-6)"
            type="text"
            placeholder="영화를 검색해보세요"
          />
        </div>
        <nav>
          <ul className="row">
            {["모든 영화", "개봉작만", "개봉 예정"].map((label, index) => (
              <TabIndex
                key={`maintab-${index}`}
                selected={index === tabIndex}
                className="lt-md:(col-4) md:(col-2)"
                label={label}
                onClick={() => {
                  setTabIndex(index);
                }}
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

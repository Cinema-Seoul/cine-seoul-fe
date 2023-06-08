import { useGetApiWithPagination } from "@/services/api";
import { GetMoviesType, getMovies } from "@/services/movie/movie.service";
import PaginationBar from "@/components/pagination/pagination-bar";
import { useDialog } from "@/components/ui/modal/dialog";
import { useState } from "react";
import MovieEditDialog from "./edit";

export default function AdminMovieListPage() {
  const movies = useGetApiWithPagination((_p, _s) => getMovies({ page: _p, size: _s, type: GetMoviesType.all }), {
    initialPage: 0,
    pageSize: 25,
  });

  const [isOpenEditor, setOpenEditor] = useState<boolean>(false);

  const { showDialog, closeDialog } = useDialog();

  return movies.loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <table className="hq-data-table table-auto w-full">
        <thead className="sticky top-0 bg-neutral-9 text-neutral-1">
          <tr>
            <th>고유번호</th>
            <th>제목</th>
            <th>등급</th>
            <th>상영여부</th>
            <th>판매량</th>
          </tr>
        </thead>
        <tbody>
          {movies.data?.list.map((item, index) => (
            <tr key={item.movieNum}>
              <th>{item.movieNum}</th>
              <td>
                {/* <a className="hover:underline" onClick={() => setOpenEditor(true)}> */}
                <a
                  className="cursor-pointer hover:underline"
                  onClick={() => {
                    showDialog(<MovieEditDialog data={{ movieNum: item.movieNum }} />);
                  }}
                >
                  {item.title}
                </a>
              </td>
              <td className="text-center">{item.gradeName}</td>
              <td className="text-center">{item.isShowing}</td>
              <td className="text-right">{item.ticketCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4">
        {movies.data && (
          <PaginationBar
            currentPageIndex={movies.page}
            pageCount={movies.data.totalPages}
            onPageSelected={(p) => movies.setPage(p)}
          />
        )}
      </div>
    </>
  );
}

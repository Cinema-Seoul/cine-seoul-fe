import AdminDataComplex, { OnSetCreated, OnSetEdited } from "@/components/admin-data-complex";
import { GetMoviesType, createMovie, getMovieDetail, getMovies, updateMovie } from "@/services/movie/movie.service";
import { MovieCreation } from "@/types";
import { createHead, detailhead, editHead, listHead } from "./data";

function DataBody() {
  return (
    <AdminDataComplex
      //L
      listHead={listHead}
      onGetList={(page, size) => getMovies({ page, size, type: GetMoviesType.all })}
      //D
      detailHead={detailhead}
      onGetDetail={({ movieNum }) => getMovieDetail(movieNum)}
      //E
      editHead={editHead}
      onSubmitEdit={(result) => updateMovie(result.movieNum, result)}
      //C
      creationHead={createHead}
      onSubmitCreate={(result) => createMovie(result)}
    />
  );
}

export default function AdminMovieListPage() {
  return (
    <>
      <DataBody />
    </>
  );
}

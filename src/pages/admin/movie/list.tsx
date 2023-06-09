import AdminDataComplex, {
  CreationHeadEntry,
  DetailHeadEntry,
  ListHeadEntry,
  OnSetCreated,
  OnSetEdited,
} from "@/components/admin-data-complex";
import { GetMoviesType, createMovie, getMovieDetail, getMovies, updateMovie } from "@/services/movie/movie.service";
import { MovieCreation, MovieDetail, MovieListEntry } from "@/types";

const LIST_HEADS: ListHeadEntry<MovieListEntry>[] = [
  {
    key: "movieNum",
    label: "영화 번호",
  },
  {
    key: "title",
    label: "제목",
  },
  {
    key: "gradeName",
    label: "등급",
  },
  {
    key: "isShowing",
    label: "상영여부",
  },
  {
    key: "ticketCount",
    label: "판매량",
  },
];

const CREATION_HEADS: CreationHeadEntry<MovieCreation>[] = [];

const DETAIL_HEADS: DetailHeadEntry<MovieDetail>[] = [
  {
    key: "movieNum",
    label: "영화번호",
  },
  {
    key: "title",
    label: "제목",
    editable: true,
    editType: "text",
  },
  {
    key: "poster",
    label: "포스터",
    value: ({ poster }) => (
      <div className="w-32">
        <img src={poster} />
        <span>{poster}</span>
      </div>
    ),
  },

  {
    key: "releaseDate",
    label: "개봉일",
    editable: true,
    editType: "text",
  },
  {
    key: "title",
    label: "제목",
    editable: true,
    editType: "text",
  },
  {
    key: "title",
    label: "제목",
    editable: true,
    editType: "text",
  },
  {
    key: "title",
    label: "제목",
    editable: true,
    editType: "text",
  },
  {
    key: "title",
    label: "제목",
    editable: true,
    editType: "text",
  },
  {
    key: "title",
    label: "제목",
    editable: true,
    editType: "text",
  },
];

function DataBody() {
  return (
    <AdminDataComplex
      //L
      listHead={LIST_HEADS}
      onGetList={(page, size) => getMovies({ page, size, type: GetMoviesType.all })}
      //D
      detailHead={DETAIL_HEADS}
      onGetDetail={({ movieNum }) => getMovieDetail(movieNum)}
      //E
      onSubmitEdit={
        ((result, { movieNum }) => updateMovie(movieNum, result)) as OnSetEdited<Partial<MovieCreation>, MovieDetail>
      }
      //C
      creationHead={CREATION_HEADS}
      onSubmitCreate={((result) => createMovie(result)) as OnSetCreated<MovieCreation, any>}
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

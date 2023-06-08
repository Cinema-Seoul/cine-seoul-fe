import { useGetApi } from "@/services/api";
import { getMovieDetail } from "@/services/movie/movie.service";
import { Button, Loader } from "@/components/ui";
import { DialogBody, DialogHeader, DialogLayout, DialogSheet } from "@/components/ui/modal/dialog";
import Modal from "@/components/ui/modal/modal";
import { IoPencil } from "react-icons/io5";
import { Link } from "react-router-dom";

function LocalLoader() {
  return <Loader className="w-16 h-16 m-6" />;
}

export interface MovieEditDialogProps {
  data: {
    movieNum: number;
  };
}

export default function MovieEditDialog({ data }: MovieEditDialogProps) {
  const movieDetail = useGetApi(() => getMovieDetail(data.movieNum), [data.movieNum]);

  return (
    <DialogSheet>
      <DialogLayout>
        {movieDetail.loading ? (
          <LocalLoader />
        ) : movieDetail.error || !movieDetail.data ? (
          <div>ERROR</div>
        ) : (
          <>
            <DialogHeader title="영화 정보 편집" />
            <DialogBody className="flex flex-row">
              <div className="flex-0">
                <img src={movieDetail.data.poster} className="max-w-72" />
              </div>
              <div className="flex-1 ml-6 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <table className="min-w-96 table-fixed border-collapse">
                    <tbody className="">
                      {[
                        ["고유번호", movieDetail.data.movieNum],
                        ["제목", movieDetail.data.title],
                        ["개봉일", movieDetail.data.releaseDate],
                        ["러닝타임", movieDetail.data.runningTime],
                        ["상영 등급", movieDetail.data.gradeName.name],
                        ["영화 정보", movieDetail.data.info],
                        ["감독", movieDetail.data.directorList.map(({ name }) => name).join(", ")],
                        ["출연", movieDetail.data.actorList.map(({ name }) => name).join(", ")],
                        ["장르", movieDetail.data.genreList.map(({ name }) => name).join(", ")],
                      ].map(([name, value], i) => (
                        <tr key={i} className="border-b border-solid border-neutral-6">
                          <th className="text-right w-32 pr-4">{name}</th>
                          <td className="p-2">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex-0 pt-4 text-right">
                  <Button className="" as="a" variant="contained" tint="primary" iconStart={<IoPencil />}>
                    편집
                  </Button>
                </div>
              </div>
            </DialogBody>
          </>
        )}
      </DialogLayout>
    </DialogSheet>
  );
}

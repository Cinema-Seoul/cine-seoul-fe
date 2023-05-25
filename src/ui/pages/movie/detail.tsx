import { useParams } from "react-router-dom";
import MainLayout from "../_layouts/main-layout";
import MovieGradeBadge from "@/ui/components/movies/movie-grade-badge";
import { Button } from "@/ui/components/ui";
import { IoHeart, IoShare, IoShareOutline, IoTicket } from "react-icons/io5";

export type MovieDetailPageParams = {
  movieId: string;
};

export default function MovieDetailPage() {
  const { movieId } = useParams<MovieDetailPageParams>();

  return (
    <MainLayout>
      <section about="영화 주요 정보" className="bg-neutral-3">
        <div className="container py-8">
          <div className="row justify-center">
            <div className="lt-md:(col-6 offset-2) md:col-4">
              <img
                className="w-full rounded"
                src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ySLgOnBTgt7a3Sv1qTVJUDMZJvu.jpg"
              />
            </div>
            <div className="lt-md:(col-6 offset-2) md:(col-6 flex flex-col justify-end)">
              <div>
                <h6 className="font-bold text-6 leading-8">트랜짓</h6>
                <p className="font-bold text-neutral-11 text-5 leading-6 mt-2 flex flex-row space-x-2">
                  <MovieGradeBadge grade="15" />
                  <span>Transit</span>
                </p>
              </div>
              <div className="mt-6 py-4 border-b border-solid border-neutral-5">
                {[
                  ["장르", "드라마"],
                  ["감독", "크리스티안 펫졸트"],
                  ["출연", "프란츠 로고브스키, 파울라 비어"],
                  ["상영 시간", "190분"],
                  ["개봉", "2020.20.20."],
                ].map(([key, content], index) => (
                  <p key={`mcontent-meta-${index}`}>
                    <span className="mr-2 text-neutral-11">{key}</span>
                    <span>{content}</span>
                  </p>
                ))}
              </div>
              <div className="row">
                <div className="col-4 pt-4">
                  <div className="text-sm text-center mb-4">관람객 평점</div>
                  <div className="text-lg text-center font-bold">4.5</div>
                </div>
                <div className="col-4 pt-4">
                  <div className="text-sm text-center mb-4">평론가 평점</div>
                  <div className="text-lg text-center font-bold">4.5</div>
                </div>
                <div className="col-4 pt-4">
                  <div className="text-sm text-center mb-4">예매율</div>
                  <div
                    className="text-lg text-center font-bold after:(content-[attr(data-rank)] absolute text-sm text-primary-11)"
                    data-rank="1위"
                  >
                    19.95%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-6 pt-6 border-t border-solid border-neutral-6">
            <div className="col-auto ms-a">
              <Button
                className="w-full"
                variant="text"
                tint="primary"
                iconStart={<IoShareOutline />}
              >
                공유
              </Button>
            </div>
            <div className="col-auto">
              <Button
                className="w-full"
                variant="text"
                tint="primary"
                iconStart={<IoHeart />}
              >
                찜
              </Button>
            </div>
            <div className="col-4">
              <Button
                className="w-full"
                variant="contained"
                tint="primary"
                iconStart={<IoTicket />}
              >
                예매하기
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-6">
        <div className="container mt-12">
          <h4>werwerw</h4>
          <div>
            <p>werwerwerwerwerwerew</p>
          </div>
        </div>
      </section>
      <section style={{ height: "150vh" }} />
    </MainLayout>
  );
}

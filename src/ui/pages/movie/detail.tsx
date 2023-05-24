import MainLayout from "../_layouts/main-layout";

export default function MovieDetailPage() {
  return (
    <MainLayout>
      <section about="영화 주요 정보" className="bg-neutral-3">
        <div className="container py-8">
          <div className="row">
            <div className="lt-md:(col-6 offset-2) md:col-3">
              <img
                className="w-full rounded"
                src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ySLgOnBTgt7a3Sv1qTVJUDMZJvu.jpg"
              />
            </div>
            <div className="lt-md:(col-6 offset-2) md:(col flex flex-col justify-end)">
              <div>
                <h6 className="font-bold text-6 leading-8">트랜짓</h6>
                <p className="font-bold text-neutral-11 text-5 leading-6 mt-2">⑫ <span>Transit</span></p>
              </div>
              <div className="mt-6 py-4 border-b border-solid border-neutral-5">
                {
                  [
                    ["장르", "드라마"],
                    ["감독", "크리스티안 펫졸트"],
                    ["출연", "프란츠 로고브스키, 파울라 비어"],
                    ["상영 시간", "190분"],
                    ["개봉", "2020.20.20."],
                  ].map(([key, content], index) => (
                    <p><span key={`mcontent-meta-${index}`} className=":uno: mr-2 text-neutral-11">{key}</span><span>{content}</span></p>
                  ))
                }
              </div>
              <div className="flex flex-row">
                <div className="col-2 py-4">
                  <div className="text-sm text-center mb-4">관람객 평점</div>
                  <div className="text-lg text-center font-bold">4.5</div>
                </div>
                <div className="col-2 py-4">
                  <div className="text-sm text-center mb-4">예매율</div>
                  <div className="text-lg text-center font-bold">19.95%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

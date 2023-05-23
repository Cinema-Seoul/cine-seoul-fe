import MainLayout from "../_layouts/main-layout";

export default function MovieDetailPage() {
  return (
    <MainLayout>
      <section about="영화 주요 정보">
        <div className="container">
          <div className="row">
            <div className="lt-md:(col-6 offset-2) md:col-4">
              <img className="w-full rounded" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ySLgOnBTgt7a3Sv1qTVJUDMZJvu.jpg" />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
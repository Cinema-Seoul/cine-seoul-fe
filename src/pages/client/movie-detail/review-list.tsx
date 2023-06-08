import PaginationBar from "@/components/pagination/pagination-bar";
import RatingStars from "@/components/rating-star";
import { useGetApi, useGetApiWithPagination } from "@/services/api";
import { GetReviewsSortBy, getReviewsOfMovie } from "@/services/review/review.service";
import { date, fmt } from "@/utils/date";
import { IoPerson } from "react-icons/io5";

export interface ReviewListSectionProps extends BaseProps {
  movieNum: number;
}

export default function ReviewListSection({ movieNum, className }: ReviewListSectionProps) {
  const Reviews = useGetApiWithPagination(
    (p, s) => getReviewsOfMovie(movieNum, { page: p, size: s, sortBy: GetReviewsSortBy.Recommend }),
    { initialPage: 0, pageSize: 8 }
  );

  return (
    <section className={className}>
      <div className="container pb-8 pt-24 mt-12">
        <h4 className="text-2xl font-bold">관람평</h4>
        <div className="text-sm">다른 사람들은 이 영화를 이렇게 평가했어요!</div>
      </div>
      <div className="container">
          {Reviews.data?.list.map((rev) => (
            <div className="card mb-4 p-4">
              <div className="flex flex-row">
                <h6 className="flex-1 font-bold flex flex-row items-center">
                  <IoPerson />
                  <span className="ml-2">{rev.userId}</span>
                </h6>
                <div className="flex-0">
                  <span className="text-sm text-right mr-4">추천 {rev.recommend}</span>
                  <span className="text-sm text-right">{fmt(date(rev.createdAt), "PPP에 작성됨")}</span>
                </div>
              </div>
              <div className="mt-4">
                <RatingStars
                  rating={rev.score}
                  className="text-primary-11 border-t border-solid border-neutral-6 py-2"
                />
                <div>{rev.contents}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="container mt-6">
        <PaginationBar currentPageIndex={Reviews.page} onPageSelected={Reviews.setPage} pageCount={Reviews.data?.totalPages} />
      </div>
    </section>
  );
}

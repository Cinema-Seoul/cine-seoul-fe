import PaginationBar from "@/components/pagination/pagination-bar";
import RatingStars from "@/components/rating-star";
import { Button } from "@/components/ui";
import { useAlertDialog } from "@/components/ui/modal/dialog-alert";
import { useGetApi, useGetApiWithPagination, useSetApi } from "@/services/api";
import { GetReviewsSortBy, createReview, getReviewsOfMovie, recommendReview } from "@/services/review/review.service";
import { useUser } from "@/services/user/user.application";
import { UserRole } from "@/types";
import { ReviewListEntry } from "@/types/review";
import { date, fmt } from "@/utils/date";
import { FormEventHandler, MouseEventHandler, useCallback, useDeferredValue, useState } from "react";
import { IoPerson } from "react-icons/io5";

interface ReviewTextAreaProps extends BaseProps {
  movieNum: number;
  afterSubmit?: () => void;
}

function ReviewTextArea({ className, movieNum, afterSubmit }: ReviewTextAreaProps) {
  const SubmitReview = useSetApi(createReview);

  const alertDialog = useAlertDialog();

  const [contents, setContents] = useState<string>("");
  const [score, setScore] = useState<number>(5);

  const doOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    SubmitReview.apiAction({
      movieNum,
      contents,
      score,
    })
      .then(() => {
        setContents("");
        setScore(5);
        alertDialog("관람평을 등록했어요.");
      })
      .then(afterSubmit);
  };

  return (
    <form className={className} onSubmit={doOnSubmit}>
      <div className="flex flex-row card">
        <div className="flex-1 p-4">
          <div className="pb-4 flex flex-row items-center">
            <select
              className="mr-4"
              name="score"
              onChange={(e) => setScore(Number(e.currentTarget.value))}
              value={score}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {`${0.5 * (i + 1)}`.replace(/^([0-9]*)$/, "$1.0")}점
                </option>
              ))}
            </select>
            <RatingStars value={score} />
          </div>
          <div className="">
            <textarea
              name="contents"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              rows={3}
              className="p-2 w-full"
              placeholder="여기에 나만의 리뷰를 남겨보세요."
            ></textarea>
          </div>
        </div>
        <Button className="m-2" variant="text" tint="primary" type="submit" disabled={SubmitReview.loading}>
          관람평 남기기
        </Button>
      </div>
    </form>
  );
}

function ReviewItem({
  data,
  onClickRecommend,
}: {
  data: ReviewListEntry;
  onClickRecommend?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <div className="card mb-4 p-4">
      <div className="flex flex-row">
        <h6 className="flex-1 font-bold flex flex-row items-center">
          <IoPerson />
          <span className="ml-2">{data.userId}</span>
        </h6>
        <div className="flex-0">
          <a className="pressable-opacity" onClick={onClickRecommend}>
            <span className="text-sm text-right mr-4">추천 {data.recommend}</span>
          </a>
          <span className="text-sm text-right">{fmt(date(data.createdAt), "PPP에 작성됨")}</span>
        </div>
      </div>
      <div className="mt-4">
        <RatingStars value={data.score} className="text-primary-11 border-t border-solid border-neutral-6 py-2" />
        <div>{data.contents}</div>
      </div>
    </div>
  );
}

export interface ReviewListSectionProps extends BaseProps {
  movieNum: number;
}

export default function ReviewListSection({ movieNum, className }: ReviewListSectionProps) {
  const currentUser = useUser();

  const SubmitRecommend = useSetApi(recommendReview);

  const Reviews = useGetApiWithPagination(
    (p, s) => getReviewsOfMovie(movieNum, { page: p, size: s, sortBy: GetReviewsSortBy.Recommend }),
    { initialPage: 0, pageSize: 8 },
    [SubmitRecommend.data]
  );

  const data = useDeferredValue(Reviews.data);

  return (
    <section className={className}>
      <div className="container pb-8 pt-24 mt-12">
        <h4 className="text-2xl font-bold">관람평</h4>
        <div className="text-sm">다른 사람들은 이 영화를 이렇게 평가했어요!</div>
      </div>
      <div className="container">
        {(currentUser?.userRole === UserRole.admin || currentUser?.userRole === UserRole.member) && (
          <div className="pb-4 mb-4 border-b border-solid border-neutral-6">
            <ReviewTextArea movieNum={movieNum} className="w-full" afterSubmit={Reviews.invalidate} />
          </div>
        )}
        <ul>
          {data &&
            (data.list.length === 0 && Reviews.page === 0 ? (
              <li className="text-center p-8 mb-8">
                <div>아직 아무도 평을 남기지 않았어요.</div>
              </li>
            ) : (
              data.list.map((rev) => (
                <li key={rev.reviewNum}>
                  <ReviewItem
                    data={rev}
                    onClickRecommend={() => SubmitRecommend.loading || SubmitRecommend.apiAction(rev.reviewNum)}
                  />
                </li>
              ))
            ))}
        </ul>
      </div>
      <div className="container mt-6">
        <PaginationBar
          currentPageIndex={Reviews.page}
          onPageSelected={Reviews.setPage}
          pageCount={Reviews.data?.totalPages ?? 0}
        />
      </div>
    </section>
  );
}

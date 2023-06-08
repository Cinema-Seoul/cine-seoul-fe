import { ListResponse } from "@/types";
import { ReviewCreation, ReviewListEntry } from "@/types/review";
import axios from "axios";
import { PagableRequest, SortableRequest } from "../api";

/* -------------------------------------------------------------------------- */
/*                                   Review                                   */
/* -------------------------------------------------------------------------- */

/** POST /review */

export async function createReview(body: ReviewCreation): Promise<number> {
  //고유 넘버 반환
  return axios.post<number>("/review", { ...body }).then((res) => res.data);
}

/** GET /review/{num} */
/** GET /review/{num}/recommend */

export enum GetReviewsSortBy {
  Recommend = "recommend",
}

export interface GetReviewsOptions extends PagableRequest, Pick<SortableRequest<GetReviewsSortBy>, "sortBy"> {}

export async function getReviewsOfMovie(
  movieNum: number,
  { page, size, sortBy }: GetReviewsOptions
): Promise<ListResponse<ReviewListEntry>> {
  return axios
    .get(sortBy === GetReviewsSortBy.Recommend ? `/review/${movieNum}/recommend` : `/review/${movieNum}`, {
      params: {
        page,
        size,
      },
    })
    .then((res) => res.data);
}

/** POST /review/recommend */

export async function recommendReview(reviewNum: number): Promise<unknown> {
  return axios.post("/review/recommend", { reviewNum }).then((res) => res.data);
}

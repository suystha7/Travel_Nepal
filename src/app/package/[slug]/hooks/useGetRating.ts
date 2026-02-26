import { endpoints } from "@/core/api/endpoints";
import { safeFetch } from "@/utils/safeFetch";

export const getReviewData = async () => {
  const getReviews = await safeFetch(endpoints.REVIEW.GET_REVIEWS);
  return { getReviews };
};

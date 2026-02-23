import { useState, useEffect, useCallback } from "react";
import { endpoints } from "@/core/api/endpoints";
import { getStaticData } from "@/core/api/fetch";

export const useGetReviewData = () => {
  const [reviewData, setReviewData] = useState<{ data: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = endpoints.REVIEW.GET_REVIEWS;
      
      if (!url) {
        throw new Error("Review endpoint is undefined");
      }

      const response = await getStaticData(url);
      
      setReviewData(response ?? { data: [] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setReviewData({ data: [] });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { reviewData, isLoading, error, refetch: fetchReviews };
};
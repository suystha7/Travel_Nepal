"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FaStar, FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { useAddRatingComment } from "../hooks/useCreateRating";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/core/context/ModalContext";
import { showErrorMessage } from "@/utils/toastMessage/toast.message";

type ReviewUser = {
  id: string;
  full_name: string;
  email: string;
};

type Review = {
  id: string;
  user: ReviewUser | string;
  comment: string;
  rating: number;
  created_at: string;
};

interface ReviewDialogProps {
  packageId: string;
  reviewData: {
    records: Review[];
  } | null;
}

const ReviewSection = ({ packageId, reviewData }: ReviewDialogProps) => {
  const { status, data: session } = useSession();
  const [hover, setHover] = useState<number | null>(null);
  const { openModal } = useModal();

  const existingReviews = useMemo(() => {
    return reviewData?.records || [];
  }, [reviewData]);

  const { rating, setRating, formik } = useAddRatingComment({
    id: packageId,
    userId: session?.user?.id,
  });

  const stars = useMemo(() => [1, 2, 3, 4, 5], []);
  const isLoggedIn = status === "authenticated";

  const userHasReviewed = useMemo(() => {
    const userId = session?.user?.id;
    if (!userId) return false;

    return existingReviews.some((r) =>
      typeof r.user === "string" ? r.user === userId : r.user.id === userId
    );
  }, [existingReviews, session?.user?.id]);

  const handleNotLoggedIn = () => {
    openModal("login");
    showErrorMessage("Please login to post a review.");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      handleNotLoggedIn();
      return;
    }

    formik.handleSubmit(e);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Guest Reviews
            <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full text-gray-500">
              {existingReviews.length}
            </span>
          </h4>
        </div>

        <div className="grid gap-6">
          {existingReviews.length > 0 ? (
            existingReviews.map((rev) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={rev.id}
                className="p-6 bg-white border-b border-gray-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {typeof rev.user !== "string" ? (
                      <div className="w-12 h-12 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center font-bold text-primary-600 text-lg uppercase">
                        {rev.user.full_name.charAt(0)}
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                        <FaUserCircle className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-gray-900">
                        {typeof rev.user !== "string"
                          ? rev.user.full_name
                          : "Verified Guest"}
                      </p>
                      <div className="flex gap-0.5">
                        {stars.map((_, i) => (
                          <FaStar
                            key={i}
                            size={14}
                            className={
                              i < Math.floor(rev.rating)
                                ? "text-yellow-400"
                                : "text-gray-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {rev.comment}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="py-8 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <p className="text-gray-400 text-sm font-medium">
                No reviews yet. Be the first to review!
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-50/50 rounded-xl p-8 border border-gray-200">
        <AnimatePresence mode="wait">
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">
                Share your experience
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {stars.map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setRating(star)}
                >
                  <FaStar
                    size={32}
                    className={
                      (hover ?? rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  />
                </button>
              ))}
            </div>

            <textarea
              {...formik.getFieldProps("comment")}
              rows={4}
              maxLength={200}
              placeholder="What were the highlights of your trip?"
              className="w-full bg-white border border-gray-200 rounded-xl p-4"
            />

            <div className="flex items-center justify-center bg-primary-500 hover:bg-secondary-500 transition-all duration-500 rounded-2xl cursor-pointer py-1">
              <Button
                type="submit"
                disabled={
                  formik.isSubmitting ||
                  !rating ||
                  !formik.values.comment.trim()
                }
              >
                {formik.isSubmitting ? "Posting..." : "Submit Review"}
              </Button>
            </div>
          </motion.form>
          )
        </AnimatePresence>
      </section>
    </div>
  );
};

export default ReviewSection;

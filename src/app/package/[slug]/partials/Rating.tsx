"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FaStar, FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { useAddRatingComment } from "../hooks/useCreateRating";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetReviewData } from "../hooks/useGetRating";
import { useModal } from "@/core/context/ModalContext";
import { showErrorMessage } from "@/utils/toastMessage/toast.message";

interface Review {
  id: string;
  created_at: string;
  comment: string;
  rating: number;
  user:
    | {
        id: string;
        full_name?: string;
      }
    | string;
}

interface ReviewDialogProps {
  packageId: string;
}

const ReviewSection = ({ packageId }: ReviewDialogProps) => {
  const { status, data: session } = useSession();
  const [hover, setHover] = useState<number | null>(null);
  const { openModal } = useModal();

  const { reviewData, isLoading } = useGetReviewData();

  const existingReviews: Review[] = useMemo(
    () => reviewData?.data || [],
    [reviewData]
  );

  const { rating, setRating, formik } = useAddRatingComment({
    id: packageId,
    userId: session?.user?.id,
  });

  const stars = useMemo(() => [1, 2, 3, 4, 5], []);
  const isLoggedIn = status === "authenticated";

  const userHasReviewed = useMemo(() => {
    const userId = session?.user?.id;
    if (!userId || !existingReviews.length) return false;

    return existingReviews.some((r) =>
      typeof r.user === "string" ? r.user === userId : r.user?.id === userId
    );
  }, [existingReviews, session?.user?.id]);

  const handleNotLoggedIn = () => {
    openModal("login");
    showErrorMessage("Please login to access this feature.");
  };

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-4xl">
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
                className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {typeof rev.user !== "string" && rev.user?.full_name ? (
                      <div className="w-12 h-12 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center font-bold text-primary-600 text-lg uppercase">
                        {rev.user.full_name.charAt(0)}
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                        <FaUserCircle className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-gray-900">
                        {typeof rev.user !== "string"
                          ? rev.user?.full_name
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
                  <time className="text-xs font-semibold text-gray-400 tabular-nums">
                    {new Date(rev.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </motion.div>
            ))
          ) : !isLoggedIn ? (
            <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 px-6">
              <div className="max-w-xs mx-auto space-y-4">
                <p className="text-gray-400 text-sm font-medium">
                  No reviews yet. Sign in to be the first to share your journey!
                </p>
                <motion.button
                  onClick={handleNotLoggedIn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg"
                >
                  Sign in to Review
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <p className="text-gray-400 text-sm font-medium">
                No reviews yet. Be the first to review!
              </p>
            </div>
          )}
        </div>
      </section>

      {isLoggedIn && (
        <section className="bg-gray-50/50 rounded-xl p-8 border border-gray-200">
          <AnimatePresence mode="wait">
            {!userHasReviewed ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={formik.handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Share your experience
                  </h3>
                  <p className="text-gray-500 text-sm">
                    How was your trip? Your feedback helps the community.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {stars.map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110 active:scale-90"
                    >
                      <FaStar
                        size={32}
                        className={`transition-colors duration-200 ${
                          (hover ?? rating) >= star
                            ? "text-yellow-400"
                            : "text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <textarea
                    {...formik.getFieldProps("comment")}
                    rows={4}
                    maxLength={200}
                    placeholder="What were the highlights of your trip?..."
                    className={`w-full bg-white border rounded-xl p-4 text-gray-700 outline-none transition-all resize-none${
                      formik.touched.comment && formik.errors.comment
                        ? "border-red-500"
                        : "border-gray-200 focus:border-primary-500"
                    }`}
                  />
                  <div className="flex justify-between mt-2 px-1">
                    {formik.touched.comment && formik.errors.comment ? (
                      <p className="text-red-500 text-[11px] font-semibold">
                        {formik.errors.comment as string}
                      </p>
                    ) : (
                      <div />
                    )}
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                      {formik.values.comment.length} / 200
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <Button
                    type="submit"
                    disabled={
                      formik.isSubmitting ||
                      !rating ||
                      !formik.values.comment.trim()
                    }
                    className="h-12 px-12 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 disabled:grayscale"
                  >
                    {formik.isSubmitting ? "Posting..." : "Submit Review"}
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <FaCheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Feedback Received!
                </h3>
                <p className="text-gray-500 text-sm mt-1 max-w-60">
                  Thank you for contributing. Your review helps other travelers
                  make better choices.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}
    </div>
  );
};

export default ReviewSection;

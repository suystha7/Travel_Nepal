"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";
import { useAddRatingComment } from "../hooks/useCreateRating";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewDialogProps {
  packageId: string;
}

const ReviewModal = ({ packageId }: ReviewDialogProps) => {
  const { status } = useSession();
  const [hover, setHover] = useState<number | null>(null);
  const { rating, setRating, formik } = useAddRatingComment({ id: packageId });

  const isLoggedIn = status === "authenticated";

  const stars = useMemo(() => [1, 2, 3, 4, 5], []);

  if (!isLoggedIn) return null;

  return (
    <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            Share Your Experience
          </h3>
          <p className="text-sm text-gray-500">
            How was your journey? Your feedback helps others explore better.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {stars.map((star) => (
            <motion.button
              key={star}
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setRating(star)}
              className="focus:outline-none transition-transform"
            >
              <FaStar
                size={32}
                className={`transition-colors duration-200 ${
                  (hover ?? rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-200"
                }`}
              />
            </motion.button>
          ))}
        </div>

        <div className="relative">
          <textarea
            id="comment"
            name="comment"
            rows={4}
            maxLength={200}
            placeholder="What were the highlights of your trip?"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all resize-none"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          
          <div className="absolute bottom-3 right-4">
            <span className={`text-[10px] font-bold tabular-nums tracking-widest ${
              formik.values.comment.length >= 190 ? "text-red-500" : "text-gray-400"
            }`}>
              {formik.values.comment.length} / 200
            </span>
          </div>
        </div>

        <AnimatePresence>
          {formik.touched.comment && formik.errors.comment && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-xs font-medium"
            >
              {formik.errors.comment}
            </motion.p>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          disabled={formik.isSubmitting || !rating}
          className="w-full sm:w-auto rounded-xl bg-secondary-500 px-8 py-6 text-white hover:bg-primary-800 disabled:bg-gray-200 disabled:text-gray-400 transition-all"
        >
          {formik.isSubmitting ? "Posting..." : "Post Review"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewModal;
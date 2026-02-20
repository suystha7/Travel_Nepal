"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";
import { useAddRatingComment } from "../hooks/useCreateRating";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface ReviewDialogProps {
  packageId: string;
}

const ReviewModal = ({ packageId }: ReviewDialogProps) => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [hover, setHover] = useState<number | null>(null);

  const { rating, setRating, formik } = useAddRatingComment({
    id: packageId,
  });

  if (!isLoggedIn) return null;

  return (
    <div className="w-full max-w-[40rem] bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200">
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold text-primary-950 tracking-tight">
              Experience Feedback
            </h3>
            <p className="text-sm text-gray-500">
              Your feedback helps us create better journeys.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <FaStar
                  size={28}
                  className={`transition-colors duration-300 ${
                    (hover ?? rating) >= star
                      ? "text-tertiary-400"
                      : "text-gray-200"
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="relative group mb-0">
          <textarea
            id="comment"
            name="comment"
            rows={4}
            maxLength={200}
            placeholder="Tell us about the highlights of your trip..."
            className="w-full bg-gray-100 border-none rounded-xl p-4 text-gray-700 placeholder:text-gray-400 focus:ring-0 focus:ring-primary-500/20 transition-all resize-none"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span
              className={`text-xs font-bold uppercase tracking-widest ${
                formik.values.comment.length >= 180
                  ? "text-red-500"
                  : "text-gray-300"
              }`}
            >
              {formik.values.comment.length} / 200
            </span>
          </div>
        </div>

        {formik.touched.comment && formik.errors.comment && (
          <motion.p
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-red-500 text-xs font-semibold ml-2"
          >
            {formik.errors.comment}
          </motion.p>
        )}

        <div className="flex items-center justify-between">
          <Button
            type="submit"
            disabled={formik.isSubmitting || !rating}
            className="rounded-full bg-tertiary-500 px-10 py-6 text-white hover:bg-primary-500 disabled:opacity-30 transition-all duration-300 active:scale-95"
          >
            {formik.isSubmitting ? "Sending..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;

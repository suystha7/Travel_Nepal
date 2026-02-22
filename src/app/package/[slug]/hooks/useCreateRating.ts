import { usePostDataMutation } from "@/core/api/api";
import { endpoints } from "@/core/api/endpoints";
import { ApiResponse } from "@/interface/error.interface";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/utils/toastMessage/toast.message";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import * as Yup from "yup";

interface UseAddReviewRatingProps {
  id: string;
}

export const useAddRatingComment = ({ id }: UseAddReviewRatingProps) => {
  const [rating, setRating] = useState(0);
  const [postReview] = usePostDataMutation();

  const { data } = useSession();
  const userId = data?.user?.id || "";
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required("Review is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (rating === 0) {
        showErrorMessage("Please select a rating.");
        return;
      }

      const resData = {
        rating,
        comment: values.comment,
        package_id: id,
        user_id: userId,
      };

      try {
        const res = (await postReview({
          url: endpoints.ADD_RATING,
          data: resData,
        })) as ApiResponse;

        if (res?.error) {
          showErrorMessage(
            res.error?.data?.message || "Failed to submit review"
          );
          return;
        }

        if (res?.data) {
          showSuccessMessage(
            res.data?.message || "Review submitted successfully"
          );
          resetForm();
          setRating(0);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return {
    rating,
    setRating,
    formik,
  };
};

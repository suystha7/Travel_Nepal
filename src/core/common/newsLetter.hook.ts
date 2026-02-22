import * as Yup from "yup";
import { useFormik } from "formik";
import { usePostDataMutation } from "@/core/api/api";
import { endpoints } from "@/core/api/endpoints";
import { ApiResponse } from "@/interface/error.interface";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/utils/toastMessage/toast.message";
import handleErrors from "@/utils/handleError";

interface NewsletterValues {
  email: string;
}

export const useNewsletter = () => {
  const [postSubscribe, { isLoading }] = usePostDataMutation();

  const formik = useFormik<NewsletterValues>({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await postSubscribe({
          url: `${endpoints.SUBSCRIBE}`,
          data: values,
        });
        if (response?.error) {
          handleErrors(response as ApiResponse, formik.setErrors);
          showErrorMessage("error");

          return;
        }

        if (response.data) {
          showSuccessMessage(response.data.message);
          resetForm();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return {
    formik,
    isLoading,
  };
};

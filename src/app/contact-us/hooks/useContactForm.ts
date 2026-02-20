import { usePostDataMutation } from "@/core/api/api";
import { endpoints } from "@/core/api/endpoints";
import { ApiResponse } from "@/interface/error.interface";
import handleErrors from "@/utils/handleError";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/utils/toastMessage/toast.message";
import { useFormik } from "formik";
import { contactSchema } from "../schema/contactFormValidation";

interface IFormValues {
  fullname: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export const useContactForm = () => {
  const [postContact, { isLoading }] = usePostDataMutation();

  const formik = useFormik<IFormValues>({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      try {
        const response = (await postContact({
          url: `${endpoints.CONTACT}`,
          data: values,
        })) as ApiResponse;

        if (response.error) {
          handleErrors(response as ApiResponse, formik.setErrors);
          showErrorMessage(response.error.data.message);
        }

        if (response.data) {
          showSuccessMessage(response.data.message);
          formik.resetForm();
        }
      } catch (error) {
        console.error("Submission error:", error);
      }
    },
  });

  return { formik, isLoading };
};

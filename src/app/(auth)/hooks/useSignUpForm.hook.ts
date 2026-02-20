import { usePostDataMutation } from "@/core/api/api";
import { endpoints } from "@/core/api/endpoints";
import { useModal } from "@/core/context/ModalContext";
import { ApiResponse } from "@/interface/error.interface";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/utils/toastMessage/toast.message";
import { useFormik } from "formik";
import { SignUpSchema } from "../schema/authValidationSchema";
import handleErrors from "@/utils/handleError";

interface IFormValues {
  full_name: string;
  phone_no: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const useSignUpForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { openModal } = useModal();
  const [postSignUp, { isLoading }] = usePostDataMutation();

  const formik = useFormik<IFormValues>({
    initialValues: {
      full_name: "",
      phone_no: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      try {
        const response = (await postSignUp({
          url: `${endpoints.AUTH.REGISTER}`,
          data: {
            ...values,
          },
        })) as ApiResponse;
        if (response.data) {
          showSuccessMessage(response.data.message);
          formik.resetForm();
          onSuccess();
          sessionStorage.setItem("user_email", values.email);
          sessionStorage.setItem("password", values.password);
          openModal("otpRegisterVerify");
        }

        if (response.error) {
          handleErrors(response as ApiResponse, formik.setErrors);
          console.error("Signup error:", response.error);
          showErrorMessage(response.error.data.message);
        }
      } catch (error) {
        console.error("Failed to submit signup form:", error);
      }
    },
  });

  return {
    formik,
    isLoading,
  };
};

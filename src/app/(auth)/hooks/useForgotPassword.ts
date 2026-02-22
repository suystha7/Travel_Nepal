"use client";
import { usePostDataMutation } from "@/core/api/api";
import { endpoints } from "@/core/api/endpoints";
import { useModal } from "@/core/context/ModalContext";
import { ApiResponse } from "@/interface/error.interface";
import handleErrors from "@/utils/handleError";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/utils/toastMessage/toast.message";
import { useFormik } from "formik";
import * as Yup from "yup";

interface IFormValuesForgotPassword {
  email: string;
}

interface IFormValuesOtpVerify {
  otp: string;
  email?: string;
  // new_password: string;
  // confirm_password?: string;
}

interface IFormValuesSetPassword {
  // otp: string;
  new_password: string;
  confirm_password: string;
}
export const useForgotPassword = () => {
  // const router = useRouter();
  const { openModal } = useModal();

  const [sendOpt] = usePostDataMutation();

  const formik = useFormik<IFormValuesForgotPassword>({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const result = (await sendOpt({
          url: endpoints.AUTH.FORGET_PASSWORD,
          data: { email: values.email },
        })) as ApiResponse;

        if (result?.error) {
          showErrorMessage(
            result.error.data.errors[0].msg ||
              "Failed to send password reset email."
          );
          handleErrors(result as ApiResponse, setErrors);
          console.error("Forgot Password error:", result.error);
          setErrors({ email: "Invalid email or account not found" });
          return;
        }

        if (result?.data) {
          showSuccessMessage("Password reset email sent!");
          sessionStorage.setItem("user_email", values.email);
          resetForm();
          openModal("emailSentConfirm");
          //   router.push("/otp-verify");
        } else {
          setErrors({ email: "An unexpected error occurred" });
        }
      } catch (error) {
        console.error("Forgot Password error:", error);
        setErrors({
          email: "Something went wrong. Please try again later.",
        });
      }
    },
  });

  return {
    formik,
    isLoading: formik.isSubmitting,
  };
};

export const useVerifyOTP = () => {
  const { openModal } = useModal();

  const [postVerifyOTP, { isLoading: isVerifying }] = usePostDataMutation();

  const formik = useFormik<IFormValuesOtpVerify>({
    initialValues: { otp: "" },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
        .required("OTP is required"),
      // new_password: Yup.string()
      //   .required("New Password is required")
      //   .min(6, "Password must be at least 6 characters")
      //   .matches(/[!@#$%^&*(),.?":{}|<>]/, "Include one special character"),
      // confirm_password: Yup.string()
      //   .oneOf([Yup.ref("new_password")], "Passwords must match")
      //   .required("Confirm password is required"),
    }),

    onSubmit: async (values) => {
      const user_email =
        typeof window !== "undefined"
          ? sessionStorage.getItem("user_email") || ""
          : "";

      if (!user_email) {
        formik.setErrors({ otp: "Email is missing in session." });
        return;
      }

      try {
        const response = (await postVerifyOTP({
          url: endpoints.AUTH.FORGET_OTP_VERIFY,
          data: {
            otp: values.otp,
            // new_password: values.new_password,
            email: user_email,
          },
        })) as ApiResponse;

        if (response.error) {
          showErrorMessage(
            response.error.data.message || "Verification failed"
          );
          handleErrors(response as ApiResponse, formik.setErrors);
          return;
        }

        if (response.data) {
          showSuccessMessage(response.data.message);
          formik.resetForm();
          openModal("resetConfirm");
        } else {
          formik.setErrors({ otp: "Invalid OTP" });
        }
      } catch (error) {
        console.error("OTP verification failed:", error);
        formik.setErrors({ otp: "Verification failed" });
      }
    },
  });

  return {
    formik,
    isVerifying,
  };
};

export const useSetPassword = () => {
  const { openModal } = useModal();
  // const router = useRouter();

  const [postResetPassword, { isLoading: isResetting }] = usePostDataMutation();

  const formik = useFormik<IFormValuesSetPassword>({
    initialValues: { new_password: "", confirm_password: "" },
    validationSchema: Yup.object({
      new_password: Yup.string()
        .required("New Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Include one special character"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password")], "Passwords must match")
        .required("Confirm password is required"),
    }),

    onSubmit: async (values) => {
      const user_email =
        typeof window !== "undefined"
          ? sessionStorage.getItem("user_email") || ""
          : "";

      if (!user_email) {
        formik.setErrors({ new_password: "Email is missing in session." });
        return;
      }

      try {
        const response = (await postResetPassword({
          url: endpoints.AUTH.RESET_PASSWORD,
          data: {
            email: user_email,
            new_password: values.new_password,
            confirm_password: values.confirm_password,
          },
        })) as ApiResponse;

        if (response.error) {
          showErrorMessage(
            response.error.data.message || "Password reset failed"
          );
          handleErrors(response as ApiResponse, formik.setErrors);
          return;
        }

        if (response.data) {
          showSuccessMessage(response.data.message);
          formik.resetForm();

          openModal("login");
        } else {
          formik.setErrors({
            new_password: "Invalid new password",
            confirm_password: "Invalid confirm password",
          });
        }
      } catch (error) {
        console.error("OTP verification failed:", error);
        formik.setErrors({
          new_password: "Verification failed",
          confirm_password: "Verification failed",
        });
      }
    },
  });

  return {
    formik,
    isResetting,
  };
};

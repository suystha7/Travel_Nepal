// import { usePostDataMutation } from "@/core/api/api";
// import { endpoints } from "@/core/api/endpoints";
// import {
//   showErrorMessage,
//   showSuccessMessage,
// } from "@/utils/toastMessage/toast.message";
// import { useFormik } from "formik";
// import { signIn } from "next-auth/react";
// import { LoginByPasswordSchema } from "../schema/authValidationSchema";
// import { ApiResponse } from "@/interface/error.interface";
// import handleErrors from "@/utils/handleError";

// interface IFormValues {
//   email: string;
//   password: string;
// }

// export const useLoginByPassword = ({
//   onSuccess,
// }: {
//   onSuccess: () => void;
// }) => {
//   const [postSignUp, { isLoading }] = usePostDataMutation();

//   const formik = useFormik<IFormValues>({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: LoginByPasswordSchema,

//     onSubmit: async (values) => {
//       try {
//         const response = (await postSignUp({
//           url: `${endpoints.AUTH.LOGIN_BY_PASSWORD}`,
//           data: {
//             ...values,
//           },
//         })) as ApiResponse;
//         if (response.error) {
//           console.error("Signup error:", response.error);
//           handleErrors(response as ApiResponse, formik.setErrors);
//           showErrorMessage(response.error.data.message);
//         }

//         console.log(response);
//         if (response.data) {
//           showSuccessMessage(response.data.message);

//           //sign-in
//           const signInResult = await signIn("credentials", {
//             redirect: false,
//             email: values.email,
//             password: values.password,
//           });
//           console.log(signInResult);
//           if (signInResult?.ok) {
//             formik.resetForm();
//             // onSuccess();
//           } else {
//             console.error("Auto sign-in failed:", signInResult?.error);
//             formik.setErrors({
//               password: "Auto sign-in failed. Please try logging in manually.",
//             });
//           }
//         } else {
//           console.warn(
//             "Unexpected response status:",
//             response.error.data.message
//           );
//         }
//       } catch (error) {
//         console.error("Failed to submit signup form:", error);
//       }
//     },
//   });

//   return {
//     formik,
//     isLoading,
//   };
// };
"use client";
import { usePostDataMutation } from "@/core/api/api";
import { endpoints } from "@/core/api/endpoints";
import { ApiResponse } from "@/interface/error.interface";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/utils/toastMessage/toast.message";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { LoginByPasswordSchema } from "../schema/authValidationSchema";
import handleErrors from "@/utils/handleError";

interface IFormValues {
  email: string;
  password: string;
}

export const useLoginByPassword = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const [postSignUp, { isLoading }] = usePostDataMutation();

  const formik = useFormik<IFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginByPasswordSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const response = (await postSignUp({
          url: `${endpoints.AUTH.LOGIN_BY_PASSWORD}`,
          data: {
            ...values,
          },
        })) as ApiResponse;

        if (response.error) {
          console.error("Signup error:", response.error);
          handleErrors(response as ApiResponse, formik.setErrors);
          showErrorMessage(response.error.data.errors[0].msg);
        }
        if (response.data) {
          showSuccessMessage(response.data.message);

          // sign-in
          const signInResult = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
          });

          if (signInResult?.ok) {
            formik.resetForm();
            onSuccess();
          } else {
            console.error("Auto sign-in failed:", signInResult?.error);
            formik.setErrors({
              password: "Auto sign-in failed. Please try logging in manually.",
            });
          }
        } else {
          console.warn(
            "Unexpected response status:",
            response.error.data.message
          );
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

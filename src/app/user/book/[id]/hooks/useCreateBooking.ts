import { useFormik } from "formik";
import {
  BookingValidationSchemaType,
  step1ValidationSchema,
  step2ValidationSchema,
} from "../schema/bookingValidationSchema";
import { usePostDataMutation } from "@/core/api/api";
import { endpoints } from "@/core/api/endpoints";
import {
  showErrorMessage,
  showSuccessMessage,
} from "@/utils/toastMessage/toast.message";
import handleErrors from "@/utils/handleError";

interface IProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const useCreateBooking = ({ step }: IProps) => {
  const [createBooking, { isLoading, isError, isSuccess }] =
    usePostDataMutation();

  const initialValues: BookingValidationSchemaType = {
    user: "",
    package: "",
    adult_count: 1,
    child_count: 0,
    infant_count: 0,
    arrival_date: "",
    departure_date: "",
    total_amount: 0,
    currency: "AUD",
    adults: [
      {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        passport_number: "",
        nationality: "",
      },
    ],
    children: [],
  };

  const formik = useFormik<BookingValidationSchemaType>({
    initialValues,
    validationSchema:
      step === 0 ? step1ValidationSchema : step2ValidationSchema,
    onSubmit: async (values) => {
      if (step !== 2) return;

      try {
        const response = (await createBooking({
          url: endpoints.BOOKING.CREATE,
          data: values,
        })) as any;

        if (response?.error) {
          handleErrors(response, formik.setErrors);
          showErrorMessage(
            response.error.data?.message || "Something went wrong"
          );
        }

        if (response?.data) {
          showSuccessMessage(
            response.data.message || "Booking created successfully"
          );
          formik.resetForm();
        }
      } catch (error) {
        console.error("Booking submission error:", error);
        showErrorMessage("Booking submission failed. Please try again.");
      }
    },
  });

  return {
    formik,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useCreateBooking;

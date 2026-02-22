import { useFormik } from "formik";
import React from "react";
import {
  BookingValidationSchemaType,
  step1ValidationSchema,
  step2ValidationSchema,
  step3ValidationSchema,
} from "./bookingValidationSchema";

interface IProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const endpoints = {
  booking: {
    create: "/api/booking/create",
  },
};

const apiTags = {
  getAllBookings: "GetAllBooking",
};

// Mock of usePostDataMutation
const usePostDataMutation = () => {
  const mutate = async ({}: {
    url: string;
    data: string | Record<string, object>;
    invalidateTag: string;
  }) => {
    return Promise.resolve();
  };

  return [
    mutate,
    {
      isError: false,
      isLoading: false,
      isSuccess: false,
    },
  ] as const;
};

const useCreateBooking = ({ step }: IProps) => {
  const [
    createBooking,
    {
      isError: isCreateBookingError,
      isLoading: isCreateBookingLoading,
      isSuccess: isCreateBookingSuccess,
    },
  ] = usePostDataMutation();

  // Inital value
  const initialValues: BookingValidationSchemaType = {};

  const formik = useFormik<BookingValidationSchemaType>({
    initialValues,
    validationSchema:
      step === 0
        ? step1ValidationSchema
        : step === 1
          ? step2ValidationSchema
          : step3ValidationSchema,
    onSubmit: async (values) => {
      if (step !== 2) return;
      createBooking({
        url: endpoints?.booking?.create,
        data: values,
        invalidateTag: apiTags?.getAllBookings,
      });
    },
  });

  return {
    formik,
    isCreateBookingError,
    isCreateBookingLoading,
    isCreateBookingSuccess,
  };
};

export default useCreateBooking;
// import { useFormik } from "formik";
// import React from "react";
// import {
//   BookingValidationSchemaType,
//   step1ValidationSchema,
//   step2ValidationSchema,
//   step3ValidationSchema,
// } from "./bookingValidationSchema";
// import { usePostDataMutation } from "@/core/api/api";

// interface IProps {
//   step: number;
//   setStep: React.Dispatch<React.SetStateAction<number>>;
// }

// const endpoints = {
//   booking: {
//     create: "/api/booking/create",
//   },
// };

// const apiTags = {
//   getAllBookings: "GetAllBooking",
// };

// const useCreateBooking = ({ step }: IProps) => {
//   const [
//     createBooking,
//     {
//       isError: isCreateBookingError,
//       isLoading: isCreateBookingLoading,
//       isSuccess: isCreateBookingSuccess,
//     },
//   ] = usePostDataMutation();

//   // Inital value
//   const initialValues: BookingValidationSchemaType = {};

//   const formik = useFormik<BookingValidationSchemaType>({
//     initialValues,
//     validationSchema:
//       step === 0
//         ? step1ValidationSchema
//         : step === 1
//           ? step2ValidationSchema
//           : step3ValidationSchema,
//     onSubmit: async (values) => {
//       if (step !== 2) return;
//       createBooking({
//         url: endpoints?.booking?.create,
//         data: values,
//         invalidateTag: apiTags?.getAllBookings,
//       });
//     },
//   });

//   return {
//     formik,
//     isCreateBookingError,
//     isCreateBookingLoading,
//     isCreateBookingSuccess,
//   };
// };

// export default useCreateBooking;

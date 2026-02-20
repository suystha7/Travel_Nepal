"use client";
import React from "react";
import ExtendedMultiStepForm from "./ExtendedMultiStepForm";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import ProgressBar from "./ProgressBar";
import TicketOverview from "./TicketOverview";
import Step3Form from "./Step3Form";
import { BookingValidationSchemaType } from "./bookingValidationSchema";
import useCreateBooking from "./useCreateBooking";

const BookingForm = () => {
  const [step, setStep] = React.useState(0);
  const [selectedMethod, setSelectedMethod] = React.useState("cod");
  const createBooking = useCreateBooking({ step, setStep });

  return (
    <>
      <ProgressBar
        currentStep={step}
        steps={[
          {
            id: "basic_details",
            title: "Booking Details",
          },
          {
            id: "skill_and_education",
            title: "Your Details",
          },
          {
            id: "documents",
            title: "Payment",
          },
        ]}
      />
      <div className="flex flex-row justify-between">
        <div className="border border-grey-50 rounded-3xl p-3 w-1/2 mr-5">
          <ExtendedMultiStepForm<BookingValidationSchemaType>
            formik={createBooking.formik}
            currentStep={step}
            onStepChange={(step) => {
              setStep(step);
            }}
            steps={[
              {
                content: <Step1Form />,
                id: "basic_details",
                title: "Booking Details",
              },
              {
                content: <Step2Form />,
                id: "your_details",
                title: "Your Details",
              },
              {
                content: (
                  <Step3Form
                    selectedMethod={selectedMethod}
                    setSelectedMethod={setSelectedMethod}
                  />
                ),
                id: "payment",
                title: "Payment",
              },
            ]}
          />
        </div>
        <div className="w-1/2 ml-5">
          <TicketOverview />
        </div>
      </div>
    </>
  );
};

export default BookingForm;

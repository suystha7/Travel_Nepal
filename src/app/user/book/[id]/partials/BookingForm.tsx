"use client";
import React from "react";
import ExtendedMultiStepForm from "./ExtendedMultiStepForm";
import ProgressBar from "./ProgressBar";
import TicketOverview from "./TicketOverview";
import { BookingValidationSchemaType } from "../schema/bookingValidationSchema";
import useCreateBooking from "../hooks/useCreateBooking";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import { ITicketOverviewProps } from "../interface/IBooking";

const BookingForm: React.FC<ITicketOverviewProps> = ({ booking }) => {
  const [step, setStep] = React.useState(0);
  const [selectedMethod, setSelectedMethod] = React.useState("cod");
  const createBooking = useCreateBooking({ step, setStep });

  return (
    <>
      <ProgressBar
        currentStep={step}
        steps={[
          {
            id: "your_details",
            title: "Your Details",
          },
          {
            id: "payment",
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
                id: "your_details",
                title: "Your Details",
              },
              {
                content: (
                  <Step2Form
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
          <TicketOverview booking={booking} />
        </div>
      </div>
    </>
  );
};

export default BookingForm;

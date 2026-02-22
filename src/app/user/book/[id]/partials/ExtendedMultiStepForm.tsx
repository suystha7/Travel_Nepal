"use client";

import { FormikProvider, FormikValues, FormikContextType } from "formik";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ExtendedButton from "./ExtendedButton";

interface Step {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface MultiStepFormProps<T extends FormikValues> {
  formik: FormikContextType<T>;
  steps: Step[];
  currentStep: number;
  onStepChange: (stepIndex: number) => void;
  onClose?: () => void;
  submitText?: string;
  cancelText?: string;
  nextText?: string;
  prevText?: string;
  isSubmitting?: boolean;
  className?: string;
  showCancelBtn?: boolean;
  btnDisabled?: boolean;
  showStepIndicator?: boolean;
  allowStepSkip?: boolean;
}

export default function ExtendedMultiStepForm<T extends FormikValues>({
  formik,
  steps,
  currentStep,
  onStepChange,
  submitText = "Proceed",
  cancelText = "Cancel",
  nextText = "Proceed",
  prevText = "Back",
  isSubmitting = false,
  className = "",
  showCancelBtn = false,
  btnDisabled = false,
}: MultiStepFormProps<T>) {
  // const navigate = useNavigate();
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = async () => {
    // Trigger validation
    const errors = await formik.validateForm();

    // Mark all fields as touched so errors show up in UI
    formik.setTouched(
      Object.keys(formik.values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    // Only go to next step if no errors
    if (!isLastStep && Object.keys(errors).length === 0) {
      onStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      onStepChange(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLastStep) {
      formik.handleSubmit();
    } else {
      await handleNext();
    }
  };

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "space-y-6 bg-background-200 bg-white p-4 rounded-[0.5rem]",
          className
        )}
      >
        {/* Current Step Content */}
        <div className="min-h-[300px]">{steps[currentStep]?.content}</div>

        <div className="px-4"></div>

        {/* Navigation Buttons */}
        <div className="flex justify-end items-center mt-10 w-full gap-2">
          <div className="flex gap-2">
            {showCancelBtn && (
              <Button
                type="button"
                className="mb-2 p-2 border-[1.5] border-primary-400 rounded-sm w-[110px] text-primary-400 hover:text-primary-400 cursor-pointer"
                variant="outline"
                onClick={() => {
                  formik.setErrors({});
                  // navigate(-1);
                }}
              >
                {cancelText}
              </Button>
            )}
          </div>

          <div className="flex gap-2 w-full justify-between">
            <Button
              type="button"
              className="px-5 py-3 bg-grey-100 rounded-3xl text-white hover:text-white typography-extra-large-body font-medium shadow-[0px_2px_4px_-2px_#0000001A] shadow-[0px_4px_6px_-1px_#0000001A]"
              onClick={handlePrevious}
            >
              {prevText}
            </Button>

            <ExtendedButton
              disabled={btnDisabled}
              type="submit"
              className="mr-2 mb-2 px-2 min-w-[110px] cursor-pointer"
              text={isLastStep ? submitText : nextText}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </form>
    </FormikProvider>
  );
}

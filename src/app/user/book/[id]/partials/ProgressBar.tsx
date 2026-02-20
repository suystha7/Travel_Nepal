import { cn } from "@/lib/utils";
import React from "react";

interface ProgressBarProps {
  currentStep: number;
  steps: { id: string; title: string }[];
}
const ProgressBar = ({ currentStep, steps }: ProgressBarProps) => {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between px-[20rem]">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center",
                index < steps.length - 1 && "flex-1"
              )}
            >
              <div className="relative flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200",
                    index <= currentStep
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-200 text-gray-500"
                  )}
                >
                  {index + 1}
                </div>

                <div
                  className={cn(
                    "absolute top-full mt-2 w-28 text-center text-sm font-medium truncate",
                    index <= currentStep ? "text-yellow-400" : "text-gray-500"
                  )}
                >
                  {step.title}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-[3px] transition-colors duration-200",
                    index < currentStep ? "bg-yellow-400" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

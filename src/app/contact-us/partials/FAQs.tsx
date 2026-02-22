"use client";
import Title from "@/core/common/Title";
import { ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import { IFAQRecord } from "../interface/IContactUsInterface";

interface FAQProps {
  faqData: IFAQRecord[];
}

const FAQs = ({ faqData }: FAQProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div>
      <Title
        underline={false}
        primaryText="Frequently"
        highlightText=" Asked Questions"
      />
      <p className="text-grey-400 text-center my-2">
        Find answers to common questions about our services{" "}
      </p>
      <div className="w-full lg:w-4xl mx-auto space-y-2 my-8">
        {faqData?.map((item: IFAQRecord, index: number) => (
          <div key={item.id} className="bg-white cursor-pointer">
            <button
              onClick={() => toggle(index)}
              className={`relative group w-full px-6 py-4 flex justify-between items-center bg-[#F9FAFB] typography-mid-body font-medium text-grey-900 rounded-[14px]
              ${activeIndex === index ? "rounded-b-none" : ""}
                `}
            >
              {item?.question}
              <span>
                <ChevronDownIcon
                  className={`h-4 w-4 transform transition-transform duration-700 ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </span>

              {/* <div
                className={`absolute left-1/2 -translate-x-1/2 -bottom-2 h-0.5 w-full bg-red-200 origin-center transition-transform duration-300 ${
                  activeIndex === index ? "scale-x-100" : "scale-x-0"
                }`}
              ></div> */}
            </button>
            <div
              className={`px-6 overflow-hidden transition-all duration-700 ease-in-out ${
                activeIndex === index
                  ? "max-h-40 py-4 rounded-b-[14px]"
                  : "max-h-0"
              } bg-[#F9FAFB] typography-mid-body  text-grey-500`}
            >
              {item?.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;

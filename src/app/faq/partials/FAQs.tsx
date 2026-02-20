"use client";

import React, { useState } from "react";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { IFAQRecord } from "@/app/contact-us/interface/IContactUsInterface";
import RichText from "@/utils/richText";
import { useRouter } from "next/navigation";
import Title from "@/core/common/Title";

interface FaqDataProps {
  faqData: IFAQRecord[];
}

const FAQs = ({ faqData }: FaqDataProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const router = useRouter();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 md:px-16 lg:px-24 py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="w-full lg:w-1/3 lg:sticky lg:top-0 h-fit">
            <Title
              label=" Support Center"
              primaryText="Common"
              highlightText="Queries"
            />
            <p className="text-gray-500 text-lg mb-10">
              Can't find what you're looking for? Reach out to our team for
              personalized assistance.
            </p>

            <div className="p-8 bg-gray-900 rounded-3xl text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center mb-6">
                  <MessageCircle size={24} />
                </div>
                <h4 className="text-xl font-bold mb-2">
                  Still have questions?
                </h4>
                <p className="text-gray-400 text-sm mb-6">
                  Our travel experts are ready to help you plan your next
                  escape.
                </p>
                <button
                  onClick={() => router.push("/contact-us")}
                  className="text-primary-400 font-bold text-sm uppercase tracking-widest hover:text-white transition-colors"
                >
                  Contact Us Now →
                </button>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary-600/10 rounded-full blur-3xl" />
            </div>
          </div>

          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`group rounded-3xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white border-gray-100 hover:border-primary-200"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-8 text-left outline-none"
                  >
                    <span
                      className={`text-xl font-bold transition-colors ${isOpen ? "text-primary-600" : "text-gray-900"}`}
                    >
                      {item.question}
                    </span>
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-primary-600 text-white rotate-180"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <RichText
                      content={item.answer}
                      className="px-8 pb-8 text-gray-500 leading-relaxed text-lg max-w-2xl"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;

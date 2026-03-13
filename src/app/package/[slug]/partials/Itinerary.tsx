"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { Utensils, Bed, ChevronDown, Activity, Circle } from "lucide-react";
import RichText from "@/utils/richText";

interface IProps {
  itinerary: any[];
  packageData?: any;
}

const Itinerary = ({ itinerary, packageData }: IProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const router = useRouter();

  const handleDownloadPdf = () => {
    const data = { ...packageData, itinerary };
    localStorage.setItem("pdf_itinerary_data", JSON.stringify(data));
    router.push("/download-itinerary");
  };

  return (
    <section id="itinerary" className="max-w-5xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="space-y-2">
          <span className="text-primary-600 font-bold uppercase tracking-widest text-sm">
            The Journey
          </span>
          <h2 className="text-5xl font-black text-gray-900 tracking-tight">
            Trip Itinerary
          </h2>
        </div>

        <button
          onClick={handleDownloadPdf}
          className="group flex items-center gap-3 bg-primary-500 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300"
        >
          <HiOutlineDocumentArrowDown size={22} />
          <span>Download PDF Guide</span>
        </button>
      </div>

      <div className="relative space-y-4">
        {itinerary?.map((day, i) => {
          const isOpen = activeIndex === i;

          return (
            <div key={day?.id || i} className="group">
              <div
                className={`border rounded-xl transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? "bg-white border-gray-200"
                    : "bg-gray-50/50 border-transparent hover:bg-white hover:border-gray-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-8 text-left"
                  onClick={() => setActiveIndex(isOpen ? null : i)}
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`text-sm font-black w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isOpen
                          ? "bg-primary-600 text-white"
                          : "bg-white text-gray-400 border border-gray-100"
                      }`}
                    >
                      {day?.day < 10 ? `0${day?.day}` : day?.day}
                    </span>
                    <h3
                      className={`text-xl font-bold ${
                        isOpen ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {day?.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`transition-transform duration-500 ${
                      isOpen ? "rotate-180 text-primary-600" : "text-gray-300"
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-8 pb-8 space-y-8">
                      <RichText
                        content={day?.description}
                        className="text-gray-600 leading-relaxed text-lg border-l-4 border-primary-500 pl-4"
                      />

                      <div className="rounded-xl ">
                        <div className="py-2">
                          <div className="divide-y divide-gray-100">
                            <SectionItem
                              icon={
                                <Activity
                                  size={18}
                                  className="text-blue-500"
                                />
                              }
                              label="Activities"
                              items={day.activities}
                            />
                            <SectionItem
                              icon={
                                <Utensils
                                  size={18}
                                  className="text-secondary-500"
                                />
                              }
                              label="Dining"
                              items={day.meals}
                            />
                            <SectionItem
                              icon={
                                <Bed size={18} className="text-red-500" />
                              }
                              label="Stay"
                              items={day.accommodations}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const SectionItem = ({ icon, label, items }: any) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="py-6 first:pt-0 last:pb-0 flex flex-col md:flex-row gap-4 md:gap-10">
      <div className="flex items-center gap-3 min-w-30 self-start">
        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
          {icon}
        </div>
        <span className="font-bold text-gray-900 text-sm">{label}</span>
      </div>

      <div className="flex-1 space-y-4">
        {items.map((item: any) => (
          <div key={item.id} className="relative">
            <h5 className="font-bold text-gray-800 text-base">{item.title}</h5>
            {item.description && (
              <RichText
                content={item.description}
                className="text-sm text-gray-500 mt-1 leading-relaxed"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;

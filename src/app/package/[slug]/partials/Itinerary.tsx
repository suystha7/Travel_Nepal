"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineDocumentArrowDown, HiChevronRight } from "react-icons/hi2";
import { Utensils, MapPin, CalendarDays } from "lucide-react";
import RichText from "@/utils/richText";

interface IProps {
  itinerary: any[];
  activity?: any[];
  meals?: any[];
  packageData?: any;
}

const Itinerary = ({
  itinerary,
  activity = [],
  meals = [],
  packageData,
}: IProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const router = useRouter();

  const handleDownloadPdf = () => {
    const data = {
      ...packageData,
      itinerary,
      activity,
      meals,
    };
    localStorage.setItem("pdf_itinerary_data", JSON.stringify(data));
    router.push("/download-itinerary");
  };

  return (
    <div id="itinerary" className="max-w-7xl mx-auto px-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            Trip Itinerary
          </h2>
        </div>

        <button
          onClick={handleDownloadPdf}
          className="group flex items-center gap-3 bg-primary-700 hover:bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-primary-200 active:scale-95"
        >
          <HiOutlineDocumentArrowDown
            size={22}
            className="group-hover:bounce"
          />
          <span>Export PDF</span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-linear-to-b from-primary-500 via-gray-200 to-transparent hidden md:block" />

        <div className="space-y-10">
          {itinerary.map((day, i) => {
            const isOpen = activeIndex === i;
            const dayActivities = activity?.filter(
              (act) => String(act?.itinerary?.id) === String(day?.id)
            );
            const dayMeals = meals?.filter(
              (meal) => String(meal?.itinerary?.id) === String(day.id)
            );

            return (
              <div key={day?.id || i} className="relative pl-0 md:pl-16">
                <div
                  className={`absolute left-0 top-0 w-12 h-12 rounded-full border-4 border-white shadow-sm  items-center justify-center z-10 transition-colors duration-300 hidden md:flex ${
                    isOpen
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <span className="text-sm font-black">{day?.day}</span>
                </div>

                <div
                  className={`group bg-white rounded-3xl transition-all duration-500 border ${
                    isOpen
                      ? "border-primary-100 shadow-2xl shadow-primary-50/50"
                      : "border-gray-100 hover:border-primary-200 shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex flex-col">
                      <span className="text-primary-600 font-bold text-xs uppercase tracking-tighter mb-1 md:hidden">
                        Day {day?.day}
                      </span>
                      <h3
                        className={`text-xl font-bold transition-colors ${isOpen ? "text-gray-900" : "text-gray-600 group-hover:text-primary-600"}`}
                      >
                        {day?.title}
                      </h3>
                    </div>
                    <HiChevronRight
                      size={24}
                      className={`transform transition-transform duration-300 text-gray-400 ${isOpen ? "rotate-90 text-primary-600" : ""}`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-500 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="px-4 space-y-6">
                      <div className="prose prose-gray max-w-none">
                        <RichText
                          content={day?.description || ""}
                          className="text-gray-600 leading-relaxed text-lg"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dayActivities.length > 0 && (
                          <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100/50">
                            <h4 className="flex items-center gap-2 text-xs font-black uppercase text-blue-700 mb-3 tracking-widest">
                              <MapPin size={14} /> Activities
                            </h4>
                            <div className="space-y-2">
                              {dayActivities.map((act: any) => (
                                <RichText
                                  key={act.id}
                                  content={act.description}
                                  className="text-sm font-semibold text-gray-800"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {dayMeals.length > 0 && (
                          <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-100/50">
                            <h4 className="flex items-center gap-2 text-xs font-black uppercase text-orange-700 mb-3 tracking-widest">
                              <Utensils size={14} /> Dining
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {dayMeals.map((meal: any) => (
                                <div key={meal.id} className="text-sm">
                                  <span className="font-bold text-orange-700">
                                    {meal.title}
                                  </span>
                                  <RichText
                                    content={meal.description}
                                    className="inline ml-1 text-gray-600"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;

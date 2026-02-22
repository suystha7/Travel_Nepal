"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { Utensils, MapPin, Bed, ChevronDown, ChevronUp } from "lucide-react";
import RichText from "@/utils/richText";

interface IProps {
  itinerary: any[];
  activity?: any[];
  meals?: any[];
  accommodations?: any[];
  packageData?: any;
}

const Itinerary = ({
  itinerary,
  activity = [],
  meals = [],
  accommodations = [],
  packageData,
}: IProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (itinerary?.length > 0) {
    setActiveIndex(0);
  }
  }, [itinerary]);

  const router = useRouter();

  const handleDownloadPdf = () => {
    const data = { ...packageData, itinerary, activity, meals, accommodations };
    localStorage.setItem("pdf_itinerary_data", JSON.stringify(data));
    router.push("/download-itinerary");
  };

  return (
    <div id="itinerary" className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            Trip Itinerary
          </h2>
          <p className="text-gray-500 mt-2">
            A day-by-day breakdown of your journey.
          </p>
        </div>
        <button
          onClick={handleDownloadPdf}
          className="flex items-center gap-2 bg-primary-700 hover:bg-black text-white px-6 py-3 rounded-full font-bold transition-all active:scale-95 shadow-lg"
        >
          <HiOutlineDocumentArrowDown size={20} />
          <span>Export PDF</span>
        </button>
      </div>

      <div className="relative border-l-2 border-dashed border-gray-200 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
        {itinerary.map((day, i) => {
          const isOpen = activeIndex === i;

          // Filter data for the specific day
          const dayActivities = activity?.filter(
            (act) => String(act?.itinerary?.id) === String(day?.id)
          );
          const dayMeals = meals?.filter(
            (meal) => String(meal?.itinerary?.id) === String(day.id)
          );
          const dayAccomm = accommodations?.filter(
            (acc) => String(acc?.itinerary?.id) === String(day.id)
          );

          return (
            <div key={day?.id || i} className="relative">
              {/* Day Badge */}
              <div
                className={`absolute -left-10 md:-left-17.5 top-0 w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center font-black text-sm transition-colors duration-300 ${
                  isOpen
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-400"
                }`}
              >
                {day?.day}
              </div>

              <div
                className="group cursor-pointer"
                onClick={() => setActiveIndex(isOpen ? null : i)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className={`text-2xl font-extrabold transition-colors ${
                      isOpen
                        ? "text-gray-900"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {day?.title}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className="text-gray-400" />
                  ) : (
                    <ChevronDown className="text-gray-400" />
                  )}
                </div>

                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    isOpen ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <RichText
                    content={day?.description}
                    className="text-gray-600 mb-6 text-lg"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dayActivities.length > 0 && (
                      <SectionCard
                        icon={<MapPin size={16} />}
                        label="Activities"
                        color="blue"
                        items={dayActivities}
                      />
                    )}

                    {dayMeals.length > 0 && (
                      <SectionCard
                        icon={<Utensils size={16} />}
                        label="Dining"
                        color="orange"
                        items={dayMeals}
                      />
                    )}

                    {dayAccomm.length > 0 && (
                      <div className="md:col-span-2">
                        <SectionCard
                          icon={<Bed size={16} />}
                          label="Accommodation"
                          color="purple"
                          items={dayAccomm}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SectionCard = ({ icon, label, color, items }: any) => {
  const colors: any = {
    blue: "bg-blue-50/50 text-blue-700 border-blue-100",
    orange: "bg-orange-50/50 text-orange-700 border-orange-100",
    purple: "bg-purple-50/50 text-purple-700 border-purple-100",
  };

  return (
    <div
      className={`p-5 rounded-2xl border ${colors[color]} transition-all hover:shadow-md`}
    >
      <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-[0.2em]">
        {icon} {label}
      </div>
      <div className="space-y-3">
        {items.map((item: any) => (
          <div key={item.id}>
            <span className="font-bold mr-2">{item.title}</span>
            <RichText
              content={item.description}
              className="inline text-gray-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;

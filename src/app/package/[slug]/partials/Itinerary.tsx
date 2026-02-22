"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { Utensils, Bed, ChevronDown, Mountain, Activity } from "lucide-react";
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
    <section id="itinerary" className="max-w-7xl mx-auto px-4">
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
          className="group flex items-center gap-3 bg-primary-700 hover:bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-2xl hover:-trangray-y-1 active:scale-95"
        >
          <HiOutlineDocumentArrowDown size={22} className="group-hover:animate-bounce" />
          <span>Download PDF Guide</span>
        </button>
      </div>

      <div className="relative space-y-6">
        <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-linear-to-b from-primary-200 via-gray-200 to-transparent hidden md:block" />

        {itinerary?.map((day, i) => {
          const isOpen = activeIndex === i;

          return (
            <div key={day?.id || i} className="relative pl-0 md:pl-14">
              <div
                className={`hidden md:flex absolute left-0 top-2 w-11 h-11 rounded-full border-2 z-10 items-center justify-center font-bold transition-all duration-500 ${
                  isOpen 
                    ? "bg-primary-600 border-primary-600 text-white  shadow-primary-200 scale-110" 
                    : "bg-white border-gray-200 text-gray-400"
                }`}
              >
                {day?.day}
              </div>

              <div
                className={`rounded-xl transition-all duration-500 ${
                  isOpen 
                    ? "bg-white border-gray-200" 
                    : "bg-gray-100/50 border-transparent hover:border-gray-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setActiveIndex(isOpen ? null : i)}
                >
                  <div className="flex flex-col gap-1">
                    <span className={`md:hidden text-xs font-bold uppercase tracking-tighter ${isOpen ? 'text-primary-600' : 'text-gray-400'}`}>
                      Day {day?.day}
                    </span>
                    <h3 className={`text-xl font-bold transition-colors ${isOpen ? "text-gray-900" : "text-gray-500"}`}>
                      {day?.title}
                    </h3>
                  </div>
                  <ChevronDown 
                    className={`transition-transform duration-500 text-gray-400 ${isOpen ? "rotate-180 text-primary-600" : ""}`} 
                  />
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 space-y-8">
                      <RichText
                        content={day?.description}
                        className="text-gray-600 leading-relaxed text-base"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {day.activities?.length > 0 && (
                          <SectionCard
                            icon={<Activity size={16} />}
                            label="Activities"
                            variant="indigo"
                            items={day.activities}
                          />
                        )}

                        {day.meals?.length > 0 && (
                          <SectionCard
                            icon={<Utensils size={16} />}
                            label="Dining"
                            variant="amber"
                            items={day.meals}
                          />
                        )}

                        {day.accommodations?.length > 0 && (
                          <div className="md:col-span-2">
                            <SectionCard
                              icon={<Bed size={16} />}
                              label="Stay & Accommodation"
                              variant="emerald"
                              items={day.accommodations}
                            />
                          </div>
                        )}
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

const SectionCard = ({ icon, label, variant, items }: any) => {
  const styles: any = {
    indigo: "bg-indigo-50/50 text-indigo-700 border-indigo-100",
    amber: "bg-amber-50/50 text-amber-700 border-amber-100",
    emerald: "bg-emerald-50/50 text-emerald-700 border-emerald-100",
  };

  return (
    <div className={`p-6 rounded-2xl border ${styles[variant]} backdrop-blur-sm`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-white">
          {icon}
        </div>
        <span className="text-base font-black tracking-widest">{label}</span>
      </div>

      <div className="space-y-3">
        {items.map((item: any) => (
          <div
            key={item.id}
            className="group/item bg-white/60 hover:bg-white border border-white/50 rounded-xl p-4 transition-all duration-300"
          >
            <h4 className="font-bold text-gray-900 text-base group-hover/item:text-primary-600 transition-colors">
              {item.title}
            </h4>
            {item.description && (
              <RichText
                content={item.description}
                className="text-sm text-gray-500 mt-2 leading-normal"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
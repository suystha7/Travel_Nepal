"use client";

import React from "react";
import { IPackageDetailsItinerary } from "../interface/IPackageDetails.interface";
import RichText from "@/utils/richText";

interface IOverview {
  overview: IPackageDetailsItinerary[];
}

const Overview = ({ overview }: IOverview) => {
  if (!overview || overview.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col gap-12">
        {overview.map((dayItem, index) => (
          <div
            key={dayItem?.id || index}
            className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start"
          >
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center bg-gray-900 text-white rounded-2xl w-14 h-14 shrink-0 transition-all duration-500 group-hover:bg-primary-600 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-200">
                  <span className="text-[10px] font-bold opacity-70 uppercase tracking-tighter">
                    Day
                  </span>
                  <span className="text-xl font-black leading-none">
                    {dayItem?.day}
                  </span>
                </div>
                <div className="h-px flex-1 bg-gray-200 group-hover:bg-primary-300 transition-colors duration-500" />
              </div>

              <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary-600 transition-colors duration-300 tracking-tight">
                {dayItem?.title}
              </h3>
            </div>

            <div className="md:col-span-8">
              <div className="relative bg-gray-50/50 rounded-[2.5rem] p-8 md:p-10 border border-transparent transition-all duration-500 group-hover:bg-white group-hover:border-gray-100 group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]">
                <RichText
                  content={dayItem.description || ""}
                  className="prose prose-gray max-w-none text-gray-600 prose-p:leading-relaxed prose-p:text-base prose-ul:space-y-2 prose-li:marker:text-primary-500 line-clamp-3"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;

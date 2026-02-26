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
      <div className="relative ml-4 md:ml-8 pl-8 space-y-10 border-l-2 border-dashed border-primary-200">
        {overview.map((dayItem, index) => (
          <div
            key={dayItem?.id || index}
            className="relative group cursor-pointer"
          >
            <div className="absolute -left-12 md:-left-15 top-0 flex items-center justify-center">
              <div className="bg-white p-1 rounded-full border-2 border-gray-100 group-hover:border-primary-500 transition-colors duration-500">
                <div className="flex flex-col items-center justify-center bg-gray-50 text-gray-900 rounded-full w-8 h-8 md:w-10 md:h-10 font-bold transition-all duration-500 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary-200">
                  <span className="text-sm md:text-xl">{dayItem?.day}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 py-3">
              <div className="flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-300">
                  {dayItem?.title}
                </h3>
              </div>

              <div className="relative overflow-hidden rounded-sm bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-6 md:p-8">
                  <RichText
                    content={dayItem.description || ""}
                    className="prose prose-sm md:prose-base prose-gray max-w-none text-gray-600 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;

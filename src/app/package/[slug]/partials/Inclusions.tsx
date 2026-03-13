"use client";

import React from "react";
import { CheckCircle2, XCircle, Info, ShieldCheck } from "lucide-react";
import {
  IPackageDetailsExclusion,
  IPackageDetailsInclusion,
} from "../interface/IPackageDetails.interface";
import RichText from "@/utils/richText";
import { IPackageNotice } from "../../interface/IPackageData.interface";

interface IProps {
  inclusions: IPackageDetailsInclusion[];
  exclusions: IPackageDetailsExclusion[];
  notices: IPackageNotice[];
}

const Inclusions: React.FC<IProps> = ({ inclusions, exclusions, notices }) => {
  return (
    <section id="inclusions" className="w-full bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10 flex items-center gap-4">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            Trip Particulars
          </h2>
        </div>

        <div className="">
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 my-6">
              <div className="flex items-start gap-3 md:w-48 shrink-0">
                <CheckCircle2 size={20} className="text-emerald-500" />
                <h3 className="font-bold text-sm uppercase tracking-widest text-emerald-500">
                  Included
                </h3>
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-4 flex-1">
                {inclusions?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 min-w-60 flex-1"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <RichText
                      content={item?.description || ""}
                      className="text-gray-600 text-sm leading-relaxed prose-p:m-0"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-16 my-6">
              <div className="flex items-start gap-3 md:w-48 shrink-0">
                <XCircle size={20} className="text-rose-500" />
                <h3 className="font-bold text-sm uppercase tracking-widest text-rose-500">
                  Excluded
                </h3>
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-4 flex-1">
                {exclusions?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 min-w-60 flex-1"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                    <RichText
                      content={item?.description || ""}
                      className="text-gray-600 text-sm leading-relaxed prose-p:m-0"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-16 my-6">
              <div className="flex items-start gap-3 md:w-48 shrink-0">
                <Info size={20} className="text-yellow-500" />
                <h3 className="font-bold text-sm uppercase tracking-widest text-yellow-500">
                  Good to know
                </h3>
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-4 flex-1">
                {notices?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 min-w-60 flex-1"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <RichText
                      content={item?.description || ""}
                      className="text-gray-600 text-sm leading-relaxed prose-p:m-0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inclusions;

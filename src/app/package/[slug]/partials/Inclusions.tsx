"use client";

import React from "react";
import { CheckCircle2, XCircle, Info } from "lucide-react";
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

const ColumnHeader = ({
  title,
  icon: Icon,
  colorClass,
}: {
  title: string;
  icon: any;
  colorClass: string;
}) => (
  <div className="flex items-center mb-6">
    <div
      className={`p-2 ${colorClass}  transition-transform group-hover:scale-110 duration-300`}
    >
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
  </div>
);

const Inclusions: React.FC<IProps> = ({ inclusions, exclusions, notices }) => {
  return (
    <section id="inclusions" className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-2">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            Trip Particulars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-tertiary-50/50 rounded-3xl p-8 border border-tertiary-100 hover:border-tertiary-200 transition-all duration-300 group">
            <ColumnHeader
              title="Good to Know"
              icon={Info}
              colorClass="text-tertiary-600"
            />
            <ul className="space-y-5">
              {notices?.map((item, index) => (
                <li key={index} className="flex gap-3">
                  {/* <Info
                    size={18}
                    className="text-tertiary-600 shrink-0 mt-0.5"
                  /> */}
                  <RichText
                    content={item?.description || ""}
                    className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none prose-p:m-0"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary-50/50 rounded-3xl p-8 border border-primary-100 hover:border-primary-300 transition-all duration-300 group shadow-sm">
            <ColumnHeader
              title="What's Included"
              icon={CheckCircle2}
              colorClass="text-primary-700"
            />
            <ul className="space-y-5">
              {inclusions?.map((item, index) => (
                <li key={index} className="flex gap-3">
                  {/* <CheckCircle2
                    size={18}
                    className="text-primary-600 shrink-0 mt-0.5"
                  /> */}
                  <RichText
                    content={item?.description || ""}
                    className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none prose-p:m-0"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50/50 rounded-3xl p-8 border border-rose-100 hover:border-rose-300 transition-all duration-300 group shadow-sm">
            <ColumnHeader
              title="What's Excluded"
              icon={XCircle}
              colorClass="text-rose-700"
            />
            <ul className="space-y-5">
              {exclusions?.map((item, index) => (
                <li key={index} className="flex gap-3">
                  {/* <XCircle
                    size={18}
                    className="text-rose-500 shrink-0 mt-0.5"
                  /> */}
                  <RichText
                    content={item?.description || ""}
                    className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none prose-p:m-0"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inclusions;

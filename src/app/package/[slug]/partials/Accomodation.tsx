"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, BedDouble, Scan, Info, ChevronRight } from "lucide-react";
import { IAccommodation } from "../interface/IPackageDetails.interface";
import RichText from "@/utils/richText";

const Accomodation = ({
  accomodation: acc,
}: {
  accomodation: IAccommodation[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const current = acc.find((a) => a.id === selectedId) || acc[0];

  const handleOpen = (id: string) => {
    setSelectedId(id);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div id="accommodation" className="w-full py-2">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
          Stay Experience
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {acc.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpen(item.id)}
            className="group relative h-75 rounded-4xl overflow-hidden cursor-pointer bg-gray-100"
          >
            <Image
              src={item.image || "/placeholder.png"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                {item.type}
              </span>
              <h3 className="text-xl font-bold mt-3 leading-tight group-hover:text-primary-400 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <span className="text-xs font-bold uppercase tracking-widest">
                  View Details
                </span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            onClick={handleClose}
          />

          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[3rem] shadow-2xl flex flex-col md:flex-row animate-in zoom-in duration-300">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 hover:bg-primary-500 hover:text-white transition-all"
            >
              <X size={20} />
            </button>

            <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
              <Image
                src={current.image || "/placeholder.png"}
                alt={current.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="flex items-center gap-2 text-primary-600 mb-2">
                <BedDouble size={18} />
                <span className="text-xs font-black uppercase tracking-[0.2em]">
                  {current.type}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-6">
                {current.title}
              </h3>

              <div className="flex gap-4 mb-8">
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <Scan size={16} className="text-gray-400" />
                  <span className="text-xs font-bold text-gray-600">
                    Spacious Room
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <Info size={16} className="text-gray-400" />
                  <span className="text-xs font-bold text-gray-600">
                    Top Rated
                  </span>
                </div>
              </div>

              <RichText
                content={current.description || ""}
                className="text-gray-500 text-base md:text-lg leading-relaxed
                  [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-6 [&_li]:mb-3
                  [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.65em]
                  [&_li]:before:w-2 [&_li]:before:h-2 [&_li]:before:rounded-full [&_li]:before:bg-primary-500"
              />

              <button
                onClick={handleClose}
                className="mt-10 w-full md:w-auto px-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-600 transition-colors"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accomodation;

"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { exclusiveHolidayData } from "@/data/exclusiveHolidayData";
import { ArrowLeft, ArrowRight } from "lucide-react";

const PackageSlider = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index < exclusiveHolidayData.length - 1) setIndex(index + 1);
    else setIndex(0);
  };
  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
    else setIndex(exclusiveHolidayData.length - 1);
  };

  return (
    <div className="flex flex-row gap-10 my-100 relative">
      <div className="my-10 relative flex-1">
        <p className="typography-sub-h1-regular mb-3 -mt-50 ml-[38%]">
          {exclusiveHolidayData[index].title}
        </p>
        <p className="typography-large-body-light ml-[38%]">
          {exclusiveHolidayData[index].description}
        </p>

        <div className="absolute left-[40%] bottom-[50%] z-30 overflow-visible">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 285}px)` }}
          >
            {exclusiveHolidayData.map((item, i) => {
              const isCurrent = i === index;
              const isAdjacent = i === index - 1 || i === index + 1;

              return (
                <motion.div
                  key={item.id}
                  layout
                  onClick={() => setIndex(i)}
                  animate={
                    isCurrent
                      ? {
                          width: 240,
                          height: 330,
                          y: -50,
                          scale: 1,
                          x: 0,
                          zIndex: 30,
                          opacity: 1,
                        }
                      : isAdjacent
                        ? {
                            width: 240,
                            height: 330,
                            y: 0,
                            scale: 0.95,
                            x: 0,
                            zIndex: 20,
                            opacity: 1,
                          }
                        : {
                            width: 260,
                            height: 355,
                            y: 0,
                            x: 0,
                            scale: 1,
                            zIndex: 5,
                            opacity: 0,
                          }
                  }
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className={`relative rounded-3xl overflow-hidden shadow-[0_0_12px_0_#0000003D] cursor-pointer mr-6 ${
                    !isCurrent && !isAdjacent ? "pointer-events-none" : ""
                  }`}
                >
                  <Image
                    src={item?.image}
                    alt="image"
                    fill
                    className="object-cover"
                  />
                  {isCurrent && (
                    <figcaption>
                      <h3 className="absolute -bottom-10 font-semibold left-32 typography-h6-regular -translate-x-1/2 text-white px-3 py-1">
                        {item.title}
                      </h3>
                    </figcaption>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="absolute right-4 -top-96 flex gap-3 z-50">
          <button
            onClick={prevSlide}
            className="bg-[#F2F2F2] text-grey-600 text-lg font-bold p-2 hover:px-3 rounded-full hover:bg-white transition disabled:opacity-50"
            disabled={index <= 0}
          >
            <ArrowLeft />
          </button>
          <button
            onClick={nextSlide}
            disabled={index >= exclusiveHolidayData.length - 1}
            className="bg-[#F2F2F2] text-grey-600 text-lg font-bold p-2 hover:px-3 rounded-full hover:bg-white transition disabled:opacity-50"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageSlider;

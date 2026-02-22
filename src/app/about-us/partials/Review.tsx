"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Title from "@/core/common/Title";
import { ITestimonialsRecord } from "@/app/(home)/partials/interface/ITestimonials";
import { ReviewModal } from "@/app/(home)/partials/ReviewModal";

interface WhyLoveUsProps {
  testimonialsData: ITestimonialsRecord[];
}

const Review = ({ testimonialsData }: WhyLoveUsProps) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonialsData.length, isPaused]);

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const idx =
        (index + i + testimonialsData.length) % testimonialsData.length;
      cards.push({ ...testimonialsData[idx], position: i });
    }
    return cards;
  };

  return (
    <section
      className="pb-12 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 mt-14">
        <Title
          label="Testimoinals"
          primaryText="What our"
          highlightText="guest says"
        />

        <div className="relative h-112.5 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {getVisibleCards().map((item) => {
              const isActive = item.position === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    x: item.position * 420,
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.4,
                    zIndex: isActive ? 30 : 10,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                    mass: 1,
                  }}
                  className="absolute w-85 md:w-125 cursor-pointer"
                  onClick={() =>
                    !isActive &&
                    setIndex(
                      (prev) =>
                        (prev + item.position + testimonialsData.length) %
                        testimonialsData.length
                    )
                  }
                >
                  <div
                    className={`
                    relative p-6 rounded-2xl transition-all duration-700
                    ${
                      isActive
                        ? "bg-linear-to-br from-secondary-50 to-tertiary-50 shadow-xl border border-white"
                        : "bg-white/40 overflow-hidden border border-primary-100"
                    }
                  `}
                  >
                    {!isActive && (
                      <div className="absolute inset-0 z-20 backdrop-blur-md bg-white/20 transition-opacity duration-700" />
                    )}

                    <Quote
                      className={`absolute top-5 right-4 w-20 h-20 transition-opacity duration-500 
                      ${isActive ? "opacity-[0.05] text-primary-500" : "opacity-0"}`}
                    />

                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30">
                      <div
                        className={`
                          relative w-20 h-20 rounded-full transition-transform duration-500
                          ${isActive ? "scale-110 ring-2 ring-primary-500" : "scale-100 opacity-5"}
                        `}
                      >
                        <Image
                          src={item?.image || "/placeholder-user.png"}
                          alt={item?.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    </div>

                    <div
                      className={`flex flex-col items-center justify-center text-center transition-all duration-700 ${!isActive ? "blur-[2px]" : ""}`}
                    >
                      <div className="flex flex-col items-center mt-10">
                        <div
                          className={`transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-5"}`}
                        >
                          <h4 className="text-xl font-bold text-gray-900 tracking-tight">
                            {item?.name}
                          </h4>
                          <div className="flex justify-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < (item?.rating || 0)
                                    ? "text-secondary-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="my-6 relative z-10">
                        <p
                          className={`
                          font-normal leading-6 line-clamp-3
                          ${isActive ? "text-gray-500 text-base" : "text-gray-400"}
                        `}
                        >
                          {`${item?.message?.replace(/<[^>]*>/g, "")}`}
                        </p>

                        {isActive && (
                          <ReviewModal
                            rating={item?.rating}
                            name={item?.name}
                            image={item?.image}
                            message={item?.message}
                            trigger={
                              <button className="mt-4 text-primary-600 font-normal hover:underline transition-all">
                                View More
                              </button>
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-3">
          {testimonialsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 transition-all duration-500 rounded-full ${
                i === index ? "w-10 bg-primary-600" : "w-2 bg-gray-300"
              }`}
            >
              <span className="sr-only">Slide {i + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;

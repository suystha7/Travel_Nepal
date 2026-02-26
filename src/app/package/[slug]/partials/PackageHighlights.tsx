"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import RichText from "@/utils/richText";

interface IProps {
  highlights?: { title: string; description?: string }[];
  imageGallery?: { image: string }[];
}

const PackageHighlights = ({ highlights = [], imageGallery = [] }: IProps) => {
  const [active, setActive] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = Math.min(highlights.length, 5);

  const startAutoPlay = useCallback(() => {
    if (totalSlides <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % totalSlides);
    }, 8000);
  }, [totalSlides]);

  useEffect(() => {
    if (highlights.length > 0) {
      startAutoPlay();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoPlay, highlights]);

  const handleInteraction = (index: number) => {
    setActive(index);
    startAutoPlay();
  };

  if (!highlights || highlights.length === 0) return null;

  const currentImage = imageGallery[active % imageGallery.length]?.image;

  return (
    <div className="bg-white py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-16 flex lg:flex-col justify-center lg:justify-between items-center py-4 lg:border-r border-gray-100 order-2 lg:order-1">
            <div className="flex lg:flex-col gap-4 md:gap-8 pb-2 lg:pb-0">
              {highlights.slice(0, totalSlides).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleInteraction(i)}
                  className={`text-xs md:text-sm font-bold transition-all duration-300 min-w-10 ${
                    active === i
                      ? "text-primary-500 scale-125 lg:scale-150"
                      : "text-gray-300 hover:text-gray-900"
                  }`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center order-3 lg:order-2 w-full text-center lg:text-left">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`bg-num-${active}`}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-black text-gray-100/50 leading-[0.8] absolute -top-10 md:-top-20 left-1/2 -translate-x-1/2 lg:left-[-15%] lg:translate-x-0 z-0 pointer-events-none select-none whitespace-nowrap overflow-hidden"
                  style={{ WebkitTextStroke: "1px #f3f4f6" }}
                >
                  {active + 1}
                </motion.h2>
              </AnimatePresence>

              <div className="relative z-10 space-y-6 md:space-y-8">
                <div className="h-20 md:h-32 lg:h-35 overflow-hidden flex items-center justify-center lg:justify-start">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                        {highlights[active]?.title}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center lg:justify-start"
                  >
                    <RichText
                      content={highlights[active]?.description || ""}
                      className="text-gray-500 text-sm md:text-lg leading-relaxed border-t-4 lg:border-t-0 lg:border-l-4 border-primary-500 pt-4 lg:pt-0 lg:pl-6 max-w-xl text-center lg:text-left"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[45%] relative aspect-square md:aspect-video lg:aspect-square xl:aspect-video group order-1 lg:order-3">
            <div className="relative w-full h-full overflow-hidden z-10 rounded-2xl md:rounded-3xl shadow-xl bg-gray-50">
              <AnimatePresence mode="wait" initial={false}>
                {currentImage ? (
                  <motion.div
                    key={active}
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    animate={{ clipPath: "inset(0 0 0% 0)" }}
                    exit={{ clipPath: "inset(100% 0 0 0)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <motion.div
                      className="relative h-full w-full"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2 }}
                    >
                      <Image
                        src={currentImage}
                        alt={highlights[active]?.title || "Highlight"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300">
                    No Image Available
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageHighlights;

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import RichText from "@/utils/richText";
import PackageGallery from "./PackageGallery";

interface IProps {
  highlights?: { title: string; description?: string }[];
  imageGallery?: { image: string }[];
}

const PackageHighlights = ({
  highlights = [],
  imageGallery = [],
}: IProps) => {
  const [active, setActive] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = Math.min(highlights.length, imageGallery.length, 5);

  const currentImage =
    imageGallery.length > 0
      ? imageGallery[active % imageGallery.length]?.image
      : "";

  const startAutoPlay = useCallback(() => {
    if (totalSlides === 0) return;

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % totalSlides);
    }, 8000);
  }, [totalSlides]);

  const handleInteraction = (index: number) => {
    setActive(index);
    startAutoPlay();
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoPlay]);

  if (totalSlides === 0) return null;

  return (
    <div className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-stretch gap-16">
          <div className="lg:w-16 flex lg:flex-col justify-between items-center py-4 border-b lg:border-b-0 lg:border-r border-gray-100">
            <div className="flex lg:flex-col gap-6 max-h-7xl my-auto">
              {highlights.slice(0, totalSlides).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleInteraction(i)}
                  className={`text-sm font-bold transition-all duration-300 ${
                    active === i
                      ? "text-primary-500 scale-125"
                      : "text-gray-300 hover:text-gray-900"
                  }`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="relative">
              <motion.h2
                className="text-[6rem] md:text-[10rem] font-black text-gray-100 leading-[0.8] absolute -top-16 -left-4 z-0 pointer-events-none select-none"
                style={{ WebkitTextStroke: "1px #f3f4f6" }}
              >
                {active + 1}
              </motion.h2>

              <div className="relative z-10 space-y-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900">
                      {highlights[active]?.title}
                    </h3>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <RichText
                      content={highlights[active]?.description || ""}
                      className="text-gray-500 text-base leading-relaxed border-l-4 border-primary-500 pl-6"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="lg:w-[45%] relative aspect-video group">
            <div className="relative w-full aspect-video overflow-hidden z-10 rounded-4xl">
              <PackageGallery images={imageGallery} activeIndex={active} />

              {currentImage && (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    animate={{ clipPath: "inset(0 0 0% 0)" }}
                    exit={{ clipPath: "inset(100% 0 0 0)" }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <motion.div
                      className="relative h-full w-full overflow-hidden rounded-4xl"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2 }}
                    >
                      <Image
                        src={currentImage}
                        alt="Gallery Highlight"
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageHighlights;
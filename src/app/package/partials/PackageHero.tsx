"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ui6 from "@/assest/ui6.png";
import RichText from "@/utils/richText";
import { IHeroRecord } from "@/app/package/interface/IHeroSection";

const PackageHero = ({ packageHero }: { packageHero: IHeroRecord[] }) => {
  const [index] = useState(0);
  const currentItem = packageHero?.[0];
  const sliderImages = currentItem?.image || [];

  const mainImage = sliderImages[index]?.image || null;

  return (
    <div className="relative w-full">
      <figure className="relative h-[50vh] w-full overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          {mainImage && (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={mainImage}
                alt="Hero Background"
                fill
                priority
                className="object-cover brightness-[0.6]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 w-full max-w-5xl px-6 text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl mb-6 drop-shadow-lg">
              {currentItem?.title}
            </h1>

            <RichText
              content={currentItem?.description || ""}
              className="typography-large-body-regular text-gray-100 line-clamp-4 leading-relaxed max-w-3xl mx-auto text-xl"
            />
          </motion.div>

          {sliderImages.length > 1 && (
            <div className="mt-12 hidden lg:flex gap-6 justify-center items-center">
              {sliderImages.slice(0, 2).map((item: any, i: number) => (
                <motion.div
                  key={item.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 h-48 w-36 ${
                    i === index
                      ? "scale-110 border-white/40 z-20"
                      : "opacity-70"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt="preview"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </figure>

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <Image
          src={ui6}
          alt="decoration"
          width={80}
          height={80}
          className="animate-bounce-slow"
        />
      </div>
    </div>
  );
};

export default PackageHero;

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import Title from "@/core/common/Title";
import DOMPurify from "dompurify";
import world from "@/assest/world.png";

const removeEmptyParagraphs = (htmlString: string) =>
  htmlString.replace(/<p>\s*<\/p>/g, "");

const sanitizeHtml = (html: string) => {
  if (typeof window === "undefined") return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "br", "strong", "b", "em", "i", "ul", "li", "ol"],
  });
};

interface TopToursProps {
  topTours: any[];
}

export default function TopTours({ topTours }: TopToursProps) {
  const [index, setIndex] = useState(0);
  const TOP_TOURS = 5;

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % topTours.length);
  }, [topTours.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getTopTours = () => {
    const result = [];
    for (let i = 0; i < Math.min(TOP_TOURS, topTours.length); i++) {
      const tourIndex = (index + i) % topTours.length;
      result.push({
        data: topTours[tourIndex],
        originalIndex: tourIndex,
      });
    }
    return result;
  };

  if (!topTours || !topTours.length) return null;

  const activePackage = topTours[index];
  const topTour = getTopTours();

  return (
    <div className="w-full pb-12 relative overflow-hidden px-4">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <Image
            src={world}
            alt="World Map"
            fill
            className="object-contain p-8"
            priority
          />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <Title
          label="Top 5 Featured"
          primaryText="Your Next"
          highlightText="Destinations"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mt-12">
          <div className="lg:col-span-4 space-y-8 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePackage?.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary-500 font-bold text-sm tracking-widest uppercase">
                    <Calendar size={16} />
                    <span>Best time to visit</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black leading-tight text-primary-900">
                    {activePackage?.name}
                  </h2>
                </div>

                <div className="text-gray-600 text-lg leading-relaxed border-l-4 border-primary-500 pl-6">
                  {activePackage?.description ? (
                    <div
                      className="line-clamp-4"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(
                          removeEmptyParagraphs(activePackage.description)
                        ),
                      }}
                    />
                  ) : (
                    <p>
                      Explore the beauty of nature during this perfect season.
                    </p>
                  )}
                </div>

                <Link
                  href={`/package/${activePackage?.slug}`}
                  className="inline-block"
                >
                  <button className="group flex items-center gap-3 bg-secondary-500 text-white px-8 py-4 rounded-full transition-all hover:bg-primary-500 ">
                    <span className="font-bold uppercase text-xs tracking-widest">
                      Explore Now
                    </span>
                    <ArrowUpRight
                      className="transition-transform group-hover:rotate-45"
                      size={18}
                    />
                  </button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="flex items-center justify-center lg:justify-start gap-4 h-125">
              {topTour.map((item) => {
                const isCenter = item.originalIndex === index;

                return (
                  <motion.div
                    key={item.data.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      width: isCenter ? "350px" : "120px",
                      height: isCenter ? "450px" : "420px",
                      opacity: isCenter ? 1 : 0.4,
                      scale: 1,
                    }}
                    whileHover={{ opacity: 0.8 }}
                    transition={{
                      layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
                      opacity: { duration: 0.4 },
                    }}
                    onClick={() => setIndex(item.originalIndex)}
                    className={`relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl ${
                      isCenter
                        ? "z-20 ring-4 ring-white shadow-2xl"
                        : "z-10 hidden md:block"
                    }`}
                  >
                    <Image
                      src={item.data?.image || "/placeholder.png"}
                      alt={item.data.name}
                      fill
                      priority={isCenter}
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    <div
                      className={`absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${
                        isCenter ? "opacity-100" : "opacity-60"
                      }`}
                    />

                    <AnimatePresence>
                      {isCenter && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 10, opacity: 0 }}
                          className="absolute top-8 left-8 right-8 z-30"
                        >
                          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-xl text-white px-4 py-1 rounded-xl text-xs font-bold tracking-widest mb-3">
                            <MapPin size={14} />
                            {item?.data?.destination}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-16">
          {topTour.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`transition-all duration-500 rounded-full ${
                index === i
                  ? "w-12 h-2.5 bg-secondary-500"
                  : "w-2.5 h-2.5 bg-gray-300 hover:bg-secondary-200"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import Title from "@/core/common/Title";
import world from "@/assest/world.png";
import PackageImage from "@/assest/heritage.jpg";
import RichText from "@/utils/richText";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { IPackageDetailsData } from "@/app/package/[slug]/interface/IPackageDetails.interface";

interface TopToursProps {
  topTours: IPackageDetailsData[];
}

export default function TopTours({ topTours }: TopToursProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  if (!topTours || !topTours.length) return null;

  const activePackage = topTours[activeIndex];

  return (
    <div className="w-full py-12 relative overflow-hidden px-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
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
                  <h2 className="text-3xl md:text-4xl font-black leading-tight text-gray-900">
                    {activePackage?.name}
                  </h2>
                </div>

                <div className="text-gray-600 text-xl leading-relaxed border-l-4 border-primary-500 pl-3">
                  {activePackage?.description ? (
                    <RichText
                      content={activePackage.description}
                      className="text-gray-600 text-base leading-relaxed line-clamp-4"
                    />
                  ) : (
                    <p></p>
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

          <div className="lg:col-span-7 order-1 lg:order-2">
            <Swiper
              modules={[Autoplay, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1.5}
              loop={topTours.length > 2}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 2.2 },
              }}
              className="top-tours-swiper overflow-visible!"
            >
              {topTours.map((tour) => (
                <SwiperSlide key={tour.slug}>
                  {({ isActive }) => (
                    <div
                      className={`relative transition-all duration-500 rounded-3xl overflow-hidden shadow-2xl ${
                        isActive ? "h-112" : "h-100 mt-6 opacity-40 scale-90"
                      }`}
                    >
                      <Image
                        src={tour?.image || PackageImage}
                        alt={tour.name}
                        fill
                        className="object-cover transition-transform duration-1000 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase">
                          <MapPin size={12} />
                          {Array.isArray(tour?.city)
                            ? tour.city.join("")
                            : tour?.city}
                        </div>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .top-tours-swiper .swiper-pagination {
          position: relative;
          margin-top: 3rem;
        }
        .top-tours-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s;
        }
        .top-tours-swiper .swiper-pagination-bullet-active {
          width: 40px;
          border-radius: 5px;
          background: #ff5a5f;
        }
      `}</style>
    </div>
  );
}

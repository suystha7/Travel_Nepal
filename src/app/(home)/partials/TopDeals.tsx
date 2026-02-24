"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import Title from "@/core/common/Title";
import { IPackageRecord } from "@/app/package/interface/IPackageData.interface";
import FallbackImg from "@/assest/mountain.jpeg";
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import RichText from "@/utils/richText";

import "swiper/css";
import "swiper/css/pagination";

interface TopDealsProps {
  topDeals: IPackageRecord[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const TopDeals = ({ topDeals }: TopDealsProps) => {
  const renderCard = (topDeal: IPackageRecord) => (
    <motion.div
      variants={cardVariants}
      className="group relative cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 h-full"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={topDeal.main_image || FallbackImg}
          alt={topDeal.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
            <Star size={12} className="text-orange-500 fill-orange-500" />
            <span className="text-xs font-black text-gray-900">
              {topDeal.average_rating}
            </span>
          </div>
        </div>

        {/* <div className="absolute top-4 right-4">
          <div className="bg-primary-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-wider">
            {topDeal.package_type}
          </div>
        </div> */}

        {/* <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
          <p className="text-white text-xs font-medium leading-relaxed line-clamp-2">
            {topDeal.category} • {topDeal.duration} Days in{" "}
            {Array.isArray(topDeal.city)
              ? topDeal.city.join(", ")
              : topDeal.city}
          </p>
        </div> */}
      </div>

      <div className="p-5 flex flex-col h-[calc(100%-16rem)]">
        <div className="flex items-center gap-2 text-gray-400 mb-2">
          <MapPin size={12} className="text-primary-500" />
          <span className="text-[10px] font-bold uppercase tracking-wider truncate">
            {Array.isArray(topDeal.city) ? topDeal.city.join("") : topDeal.city}
          </span>
          <span className="mx-0.5 opacity-30">•</span>
          <Clock size={12} />
          <span className="text-[10px] font-bold whitespace-nowrap">
            {topDeal.duration} Days
          </span>
        </div>

        <Link href={`/package/${topDeal.slug}`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
            {topDeal.name}
          </h3>
        </Link>

        <div className="text-gray-600 text-sm leading-relaxed grow">
          {topDeal?.description ? (
            <RichText
              content={topDeal.description}
              className="text-gray-600 text-sm leading-relaxed line-clamp-2"
            />
          ) : (
            <p className="line-clamp-2">
              Explore the beauty of nature during this perfect season
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              Starting from
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-primary-500">
                Rs. {Number(topDeal.current_price).toLocaleString()}
              </span>
            </div>
          </div>

          <Link href={`/package/${topDeal.slug}`}>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden h-10 px-4 rounded-xl bg-secondary-500 text-white flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300 min-w-25"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
                Details
              </span>
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                <ArrowRight size={18} />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="px-4 md:px-12 lg:px-12 py-16 bg-secondary-50/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100/20 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <Title
          label="Top Deals"
          primaryText="Most Popular"
          highlightText="Adventures"
        />

        {topDeals && topDeals.length > 0 && (
          <Link href="/package" className="hidden md:block">
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-gray-900 font-bold border-b-2 border-primary-500 pb-1 text-sm"
            >
              View all <ArrowRight size={16} />
            </motion.div>
          </Link>
        )}
      </div>

      <div className="block md:hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.4}
          centeredSlides={true}
          loop={topDeals.length > 2}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="pb-12 top-deals-swiper"
        >
          {topDeals?.map((topDeal) => (
            <SwiperSlide key={topDeal.id}>{renderCard(topDeal)}</SwiperSlide>
          ))}
        </Swiper>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {topDeals?.map((topDeal) => (
          <React.Fragment key={topDeal.id}>
            {renderCard(topDeal)}
          </React.Fragment>
        ))}
      </motion.div>

      {topDeals && topDeals.length > 0 && (
        <div className="flex justify-center mt-6 md:hidden">
          <Link href="/package">
            <button className="px-8 py-3 rounded-xl bg-primary-500 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-3">
              View All
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default TopDeals;

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Title from "@/core/common/Title";
import { IPackageRecord } from "@/app/package/interface/IPackageData.interface";
import RichText from "@/utils/richText";

interface TopDealsProps {
  topDeals: IPackageRecord[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const TopDeals = ({ topDeals }: TopDealsProps) => {
  const showViewAll = topDeals?.length > 12;

  return (
    <section className="px-4 md:px-10 lg:px-20 mb-16 py-12 bg-secondary-50/60">
      <Title
        label="Top 12 Deals"
        primaryText="Most Popular"
        highlightText="Adventures"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {topDeals?.map((topDeal) => (
          <motion.div
            key={topDeal.id}
            variants={cardVariants}
            className="group flex flex-col h-full rounded-2xl overflow-hidden border bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-56 w-full overflow-hidden cursor-pointer">
              <Image
                src={topDeal.image || "/placeholder.png"}
                alt={topDeal.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                {topDeal.duration} days
              </div>

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-5 flex flex-col grow">
              <div className="grow">
                <Link href={`/package/${topDeal.slug}`}>
                  <h2 className="font-bold text-gray-900 text-lg line-clamp-2 hover:text-primary-600 transition-colors mb-3">
                    {topDeal.name}
                  </h2>
                </Link>

                <RichText
                  content={topDeal?.description || ""}
                  className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4 prose-p:m-0"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">
                  Starting from
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-secondary-500">
                    Rs. {Number(topDeal.current_price).toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-xs">/ person</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {showViewAll && (
        <div className="flex justify-center mt-12">
          <Link href="/package">
            <button className="h-12 px-10 rounded-full relative overflow-hidden group bg-primary-500 hover:bg-secondary-500 transition-colors duration-700">
              <span className="block text-white font-bold transition-all duration-700 group-hover:-translate-y-10 group-hover:opacity-0">
                View All Packages
              </span>

              <span className="absolute inset-0 flex justify-center items-center text-white font-bold translate-y-10 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                View All Packages
              </span>
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default TopDeals;

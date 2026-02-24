"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Tag } from "lucide-react";
import { motion, Variants } from "framer-motion";
import RichText from "@/utils/richText";
import FallbackImg from "@/assest/package1.png";
import { IPackageRecord } from "../../interface/IPackageData.interface";

interface RelatedPackageProps {
  relatedPackages:
    | (IPackageRecord[] | null)[]
    | IPackageRecord[]
    | null
    | undefined;
  categoryName: string;
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

const RelatedPackage: React.FC<RelatedPackageProps> = ({
  relatedPackages,
  categoryName,
}) => {
  let packages: IPackageRecord[] = relatedPackages
    ? relatedPackages
        .flatMap((pkg) => (Array.isArray(pkg) ? pkg : [pkg]))
        .filter((pkg): pkg is IPackageRecord => pkg !== null) // type guard
    : [];

  if (categoryName) {
    packages = packages.filter(
      (pkg) => pkg.category?.name.toLowerCase() === categoryName.toLowerCase()
    );
  }

  if (!packages.length) return null;

  return (
    <motion.div
      className="w-full my-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Related Packages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            variants={cardVariants}
            className="group p-4 transition-all duration-500 ease-in-out cursor-pointer bg-white rounded-2xl"
          >
            <div className="relative h-60 w-full overflow-hidden rounded-t-2xl">
              <Link href={`/package/${pkg.slug}`}>
                <Image
                  src={pkg.main_image || FallbackImg}
                  alt={pkg.name || "Tour Package"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>

              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-xs font-bold tracking-wide z-10">
                <MapPin size={14} />
                {Array.isArray(pkg.city)
                  ? pkg.city.map((c) => c.name).join(", ")
                  : pkg.city || "Unknown"}
              </div>
            </div>

            <div className="flex flex-col space-y-4 p-5 border rounded-b-2xl">
              <div className="flex flex-1 flex-col space-y-3">
                <div className="hidden lg:flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-900 font-medium">
                    <Tag size={16} />
                    {pkg.package_type?.name || "Unknown"}
                  </div>
                  <div className="flex items-center gap-1 text-gray-900 font-medium">
                    <Clock size={16} />
                    {pkg.duration} Days
                  </div>
                </div>

                <div className="flex items-start">
                  <Link href={`/package/${pkg.slug}`}>
                    <h2 className="line-clamp-1 cursor-pointer text-2xl font-bold text-gray-900 transition-colors hover:text-primary-600">
                      {pkg.name}
                    </h2>
                  </Link>
                </div>

                <RichText
                  content={pkg.description || ""}
                  className="line-clamp-2 text-base leading-relaxed text-gray-600"
                />
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <span className="text-xs text-primary-400 font-medium uppercase tracking-tight">
                    Price per person
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-1.5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-primary-900">
                          NPR {pkg.current_price}
                        </span>
                      </div>
                    </div>
                    {pkg.previous_price && (
                      <span className="text-xs text-gray-400 line-through">
                        Rs. {Number(pkg.previous_price).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <Link href={`/package/${pkg.slug}`}>
                  <button className="rounded-xl bg-secondary-400 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-secondary-500 active:scale-95">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RelatedPackage;

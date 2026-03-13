"use client";

import React from "react";
import { MapPin, Clock, Tags, ChevronRight, Mountain } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { IPackageDetailsData } from "../interface/IPackageDetails.interface";
import { useSession } from "next-auth/react";
import { useModal } from "@/core/context/ModalContext";
import { showErrorMessage } from "@/utils/toastMessage/toast.message";

interface IProps {
  packageData: IPackageDetailsData;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom quintic ease-out
      staggerChildren: 0.12,
    },
  },
};

const BookNowSection: React.FC<IProps> = ({ packageData }) => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const { openModal } = useModal();

  const handleNotLoggedIn = () => {
    openModal("login");
    showErrorMessage("Please login to access this feature.");
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 relative z-30 -mt-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 p-6 lg:p-10">
          <div className="flex-1">
            <div className="flex flex-wrap gap-5 mb-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/50 text-blue-600 rounded-xl text-[12px] font-bold tracking-tight border border-blue-100/40">
                <MapPin size={14} strokeWidth={2.5} />{" "}
                {packageData?.destination}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50/50 text-purple-600 rounded-xl text-[12px] font-bold tracking-tight border border-purple-100/40">
                <Mountain size={14} strokeWidth={2.5} />{" "}
                {packageData?.package_type?.name}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50/50 text-emerald-600 rounded-xl text-[12px] font-bold tracking-tight border border-emerald-100/40">
                <Tags size={14} strokeWidth={2.5} />{" "}
                {packageData?.category?.name}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50/50 text-orange-600 rounded-xl text-[12px] font-bold tracking-tight border border-orange-100/40">
                <Clock size={14} strokeWidth={2.5} /> {packageData?.duration}{" "}
                Days
              </span>
            </div>
          </div>

          <div className="hidden lg:block w-px h-20 bg-gray-100" />

          <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-10">
            <div className="text-center lg:text-right whitespace-nowrap">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">
                Total Price
              </p>
              <div className="flex items-baseline justify-center lg:justify-end gap-2">
                <span className="text-4xl font-black text-gray-900 tracking-tight">
                  ${packageData?.current_price?.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-gray-500">AUD</span>
              </div>
              {packageData?.previous_price && (
                <p className="text-sm font-bold text-red-400/80 line-through">
                  ${packageData?.previous_price?.toLocaleString()}
                </p>
              )}
            </div>

            <div className="w-full sm:w-auto">
              {isLoggedIn ? (
                <Link href={`/user/book/${packageData?.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:min-w-40 bg-gray-900 text-white px-8 py-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 shadow-xl shadow-gray-200 transition-colors hover:bg-black"
                  >
                    Book Now <ChevronRight size={18} />
                  </motion.button>
                </Link>
              ) : (
                <motion.button
                  onClick={handleNotLoggedIn}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:min-w-40 bg-primary-500 text-white px-8 py-5 rounded-2xl font-bold text-sm shadow-xl shadow-primary-100"
                >
                  Book Now
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookNowSection;

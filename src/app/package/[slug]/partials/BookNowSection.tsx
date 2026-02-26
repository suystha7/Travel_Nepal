"use client";

import React, { useMemo } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  MapPin,
  Phone,
  Clock,
  Tags,
  ChevronRight,
  Mountain,
  CheckCircle2,
  Circle,
  CircleCheck,
} from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { IPackageDetailsData } from "../interface/IPackageDetails.interface";
import { useSession } from "next-auth/react";
import { useModal } from "@/core/context/ModalContext";
import { showErrorMessage } from "@/utils/toastMessage/toast.message";
import { IOrganizationData } from "@/app/contact-us/interface/IOrganizationInterface";

interface IProps {
  packageData: IPackageDetailsData;
  orgData?: IOrganizationData;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const BookNowSection: React.FC<IProps> = ({ packageData, orgData }) => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const { openModal } = useModal();

  const activities = useMemo(() => {
    if (!packageData?.itinerary) return [];

    const allActivities = packageData.itinerary.flatMap((day) => {
      if (Array.isArray(day?.activities)) {
        return day.activities.map((act: { title: string }) => act.title);
      }
      return [];
    });

    return Array.from(new Set(allActivities)).slice(0, 8);
  }, [packageData?.itinerary]);

  const handleNotLoggedIn = () => {
    openModal("login");
    showErrorMessage("Please login to access this feature.");
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 relative z-20 -mt-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-white border border-gray-200 rounded-3xl p-2 shadow-2xl shadow-gray-200/50 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-8 p-5 lg:p-8">
          <div className="flex-1 space-y-8 w-full">
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold tracking-wide border border-blue-100/50">
                <MapPin size={13} /> {packageData?.destination}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-[11px] font-bold tracking-wide border border-purple-100/50">
                <Mountain size={13} /> {packageData?.package_type?.name}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[11px] font-bold tracking-wide border border-emerald-100/50">
                <Tags size={13} /> {packageData?.category?.name}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[11px] font-bold tracking-wide border border-orange-100/50">
                <Clock size={13} /> {packageData?.duration} Days
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                Highlights & Activities
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3">
                {activities.map((title, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-2 group cursor-pointer"
                  >
                    <div className="shrink-0 w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors border border-gray-100">
                      <CircleCheck size={18} />
                    </div>
                    <span className="text-sm font-semibold text-gray-600 truncate group-hover:text-gray-900 transition-colors">
                      {title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-px h-32 bg-linear-to-b from-tertiary-500 via-secondary-300 to-tertiary-500" />

          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-center lg:items-end gap-6 min-w-70">
            <div className="text-center lg:text-right">
              <div className="flex items-baseline justify-center lg:justify-end gap-1.5">
                <span className="text-sm font-bold text-gray-400">NRP</span>
                <span className="text-4xl font-black text-gray-900 tracking-tight">
                  {packageData?.current_price?.toLocaleString()}
                </span>
              </div>
              {packageData?.previous_price && (
                <p className="text-xs font-bold text-red-400 line-through mt-0.5">
                  NRP {packageData?.previous_price?.toLocaleString()}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 w-full">
              {isLoggedIn ? (
                <Link href={`/user/book/${packageData?.id}`} className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#000" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary-500 text-white px-6 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    Book Now <ChevronRight size={18} />
                  </motion.button>
                </Link>
              ) : (
                <motion.button
                  onClick={handleNotLoggedIn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-primary-500 text-white px-6 py-4  rounded-xl font-bold text-sm"
                >
                  Book Now
                </motion.button>
              )}

              <div className="flex gap-2">
                <motion.a
                  href={`tel:${orgData?.phone}`}
                  whileHover={{ y: -3, backgroundColor: "#f9fafb" }}
                  className="p-4 bg-white border border-gray-200 rounded-2xl text-gray-600 transition-all shadow-sm"
                >
                  <Phone size={20} />
                </motion.a>
                <motion.a
                  href={`https://wa.me/${orgData?.phone}`}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="p-4 bg-[#25D366] text-white rounded-2xl transition-all shadow-lg shadow-green-100"
                >
                  <FaWhatsapp size={20} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookNowSection;

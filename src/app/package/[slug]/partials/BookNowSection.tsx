"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  Bed,
  Binoculars,
  CarFront,
  Coffee,
  MapPin,
  Phone,
  Clock,
  Tags,
  ChevronRight,
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

const packageDetail = [
  { id: 1, icon: Bed, label: "Hotel" },
  { id: 2, icon: Binoculars, label: "Sights" },
  { id: 3, icon: CarFront, label: "Transfer" },
  { id: 4, icon: Coffee, label: "Meals" },
];

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
      <div className="bg-white border rounded-3xl p-2 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-6 p-4 lg:p-6">
          <div className="flex-1 space-y-6 w-full">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-wide">
                <MapPin size={14} /> {packageData?.destination}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold tracking-wide">
                <Clock size={14} /> {packageData?.duration} Days
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-bold tracking-wide">
                <Tags size={14} /> {packageData?.category?.name}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {packageDetail.map((item) => (
                <div key={item.id} className="flex items-center gap-2 group">
                  <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                    <item.icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-px h-px lg:h-24 bg-linear-to-b from-transparent via-gray-200 to-transparent" />

          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-center lg:items-end gap-6 min-w-70">
            <div className="text-center lg:text-right">
              <div className="flex items-baseline justify-center lg:justify-end gap-2">
                <span className="text-3xl font-black text-gray-900">
                  <span className="text-sm font-medium text-gray-500 mr-1">
                    NRP
                  </span>
                  {packageData?.current_price?.toLocaleString()}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-400 line-through">
                NRP {packageData?.previous_price?.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {isLoggedIn ? (
                <Link
                  href={`/user/book/${packageData?.id || 1}`}
                  className="flex-1 sm:flex-none"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors shadow-xl"
                  >
                    Book Now <ChevronRight size={18} />
                  </motion.button>
                </Link>
              ) : (
                <motion.button
                  onClick={handleNotLoggedIn}
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 sm:flex-none bg-primary-500 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl"
                >
                  Book Now
                </motion.button>
              )}

              <div className="flex gap-2">
                <motion.a
                  href={`tel:${orgData?.phone}`}
                  whileHover={{ y: -3 }}
                  className="p-4 bg-white border border-gray-200 rounded-2xl text-gray-600 transition-all"
                >
                  <Phone size={20} />
                </motion.a>
                <motion.a
                  href={`https://wa.me/${orgData?.phone}`}
                  whileHover={{ y: -3 }}
                  className="p-4 bg-[#25D366] text-white rounded-2xl transition-all"
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

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, Tag } from "lucide-react";
import { useSession } from "next-auth/react";
import { IPackageRecord } from "../interface/IPackageData.interface";
import { useModal } from "@/core/context/ModalContext";
import { showErrorMessage } from "@/utils/toastMessage/toast.message";
import RichText from "@/utils/richText";
import FallbackImg from "@/assest/package1.png"

interface IProps {
  activeTab: string;
  content: IPackageRecord[];
}

const ListView: React.FC<IProps> = ({ content }) => {
  const { status } = useSession();
  const { openModal } = useModal();
  const isLoggedIn = status === "authenticated";

  const handleNotLoggedIn = () => {
    openModal("login");
    showErrorMessage("Please login to access this feature.");
  };

  return (
    <div className="flex flex-col gap-8 py-4">
      {content.map((packageItem) => (
        <div
          key={packageItem.id}
          className="group relative flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden cursor-pointer border border-primary-100 transition-all duration-300 ease-in-out"
        >
          <div className="relative w-full md:w-80 lg:w-100 h-64 md:h-auto overflow-hidden">
            <Link href={`/package/${packageItem?.slug}`}>
              <Image
                src={packageItem?.main_image || FallbackImg}
                alt={packageItem?.name || "Tour Package"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </Link>

            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-xs font-bold tracking-wide z-10">
              <MapPin size={14} className="text-white" />
              {Array.isArray(packageItem?.city)
                  ? packageItem.city.join(", ")
                  : packageItem?.city}
            </div>
          </div>

          <div className="flex flex-col flex-1 p-6 lg:p-8">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center gap-4 mb-3">
                <Link
                  href={`/package/${packageItem?.slug}`}
                  className="flex-1 hover:text-primary-600"
                >
                  <h2 className="text-xl lg:text-2xl font-bold line-clamp-1">
                    {packageItem?.name}
                  </h2>
                </Link>
                <div className="hidden lg:flex items-center gap-4 text-base">
                  <div className="flex items-center gap-1 text-primary-500 font-medium">
                    <Tag size={16} className="text-primary-500" />
                    {packageItem?.package_type}
                  </div>
                  <div className="flex items-center gap-1 text-primary-500 font-medium">
                    <Clock size={16} className="text-primary-500" />
                    {packageItem?.duration} Days
                  </div>
                </div>
              </div>

              <RichText
                content={packageItem?.description || ""}
                className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6"
              />

              <div className="mt-auto pt-6 border-t border-primary-50">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-primary-400 font-medium uppercase tracking-tight">
                      Price per person
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-primary-900">
                        NPR {packageItem?.current_price}
                      </span>
                    </div>
                    {packageItem?.previous_price && (
                      <span className="text-xs text-gray-400 line-through">
                        Rs.{" "}
                        {Number(packageItem?.previous_price).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {isLoggedIn ? (
                      <Link href={`/user/book/${packageItem?.id}`}>
                        <button className="rounded-xl bg-secondary-400 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-secondary-500 active:scale-95">
                          Book Now
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={handleNotLoggedIn}
                        className="rounded-xl bg-secondary-400 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-secondary-500 active:scale-95"
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListView;

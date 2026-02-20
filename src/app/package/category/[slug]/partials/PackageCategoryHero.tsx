"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ui6 from "@/assest/ui6.png";

interface IPackageImage {
  id: string | number;
  image: string;
  name?: string;
  description?: string;
}
const PackageHero = ({ packageImage }: { packageImage: IPackageImage }) => {
  return (
    <div>
      <figure className="relative min-h-[80vh] w-full mb-16">
        <AnimatePresence>
          <motion.div
            key={packageImage.id}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={packageImage?.image || "/placeholder.png"}
              alt="image"
              height={600}
              width={600}
              priority
              className="object-cover h-full w-full brightness-75"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute text-white md:top-[30%] top-[15%] flex md:flex-row flex-col justify-between w-full px-10 gap-10">
          <div className="md:w-1/2 pb-10 md:pb-0">
            <h2 className="typography-h2-light font-semibold bg-opacity-50">
              {packageImage?.name || "Good Tour"}
            </h2>
            {/* <p className="typography-large-body-regular md:mr-20 line-clamp-3">
              {packageImage?.description}
            </p> */}
          </div>
        </div>
      </figure>
      <Image
        src={ui6}
        alt=" "
        width={50}
        height={50}
        className="absolute w-23 h-30 left-[32%]"
      />
    </div>
  );
};

export default PackageHero;

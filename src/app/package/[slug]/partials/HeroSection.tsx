"use client";

import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";
import heroImage from "@/assest/april.png";

interface HeroSectionProps {
  title: string;
  image: string;
  breadcrumbs?: { label: string; href: string }[];
}

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants: Variants = {
  hidden: { scale: 1.2, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

function HeroSection({ title, image }: HeroSectionProps) {
  return (
    <figure className="relative h-[300px] md:h-100 w-full overflow-hidden bg-gray-900">
      <motion.div
        className="absolute inset-0 w-full h-full"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <Image
          src={image || heroImage}
          alt={title}
          fill
          priority
          className="object-cover brightness-[0.6]"
        />
      </motion.div>

      <figcaption className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
        <motion.div variants={titleVariants} initial="hidden" animate="visible">
          <h1 className="text-3xl md:text-5xl font-black drop-shadow-2xl max-w-4xl uppercase tracking-tight">
            {title}
          </h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-1.5 bg-white mx-auto mt-4 rounded-full"
          />
        </motion.div>
      </figcaption>

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
    </figure>
  );
}

export default HeroSection;

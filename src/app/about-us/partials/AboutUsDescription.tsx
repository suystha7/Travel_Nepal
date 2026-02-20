"use client";

import React from "react";
import Image from "next/image";
import { IAboutUsData } from "../interface/IAboutUs";
import RichText from "@/utils/richText";
import { motion } from "framer-motion";
import world from "@/assest/world.png";

interface AboutUsDescriptionProps {
  aboutUsData: IAboutUsData;
}

const AboutUsDescription = ({ aboutUsData }: AboutUsDescriptionProps) => {
  return (
    <section
      className="relative py-20 bg-white overflow-hidden"
      id="about-description"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary-500/20 to-transparent" />

      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-full lg:w-1/2 h-full pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <Image
            src={world}
            alt="World Map Background"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-24">
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="lg:sticky lg:top-32"
            >
              <div className="inline-flex items-center space-x-4 mb-6">
                <div className="h-px w-12 bg-primary-600" />
                <p className="text-sm font-black uppercase tracking-[0.3em] text-primary-600">
                  {aboutUsData?.sub_title}
                </p>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold text-primary-600 leading-tight  ">
                {aboutUsData?.title}
              </h2>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="prose prose-lg prose-primary max-w-none">
                <RichText
                  content={aboutUsData?.description || ""}
                  className="text-lg md:text-xl text-gray-600 leading-relaxed font-normal"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsDescription;

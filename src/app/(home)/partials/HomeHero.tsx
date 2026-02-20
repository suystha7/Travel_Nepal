"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  IoSearchOutline,
  IoCloseOutline,
  IoPlayOutline,
  IoPauseOutline,
} from "react-icons/io5";
import { motion, Variants, AnimatePresence } from "framer-motion";
import LocationDate from "./LocationDate";
import Image from "next/image";
import HeroImg from "@/assest/everest.jpg";
import RichText from "@/utils/richText";

interface HomeHeroProps {
  city?: { name: string; slug: string }[];
  videoSrc?: string;
  fallbackImage?: string;
  heroData?: HeroDataRecord[];
}

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const HomeHero: React.FC<HomeHeroProps> = ({
  city,
  heroData,
  videoSrc = "/goodtravel.mp4",
  fallbackImage = "/abc.jpg",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const hero = heroData && heroData.length > 0 ? heroData[0] : null;
  const finalVideoSrc = hero?.video || videoSrc;

  const toggleVideo = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  return (
    <div className="relative w-full h-screen md:h-[90vh] overflow-hidden bg-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        {!videoError && finalVideoSrc ? (
          <video
            ref={videoRef}
            src={finalVideoSrc}
            className="w-full h-full object-cover"
            onError={() => setVideoError(true)}
            poster={fallbackImage}
            playsInline
            muted
            autoPlay
            loop
            preload="metadata"
          />
        ) : (
          <Image
            fill
            src={hero?.image?.[0]?.url || HeroImg}
            alt={hero?.title || "Travel Hero"}
            priority
            className="object-cover"
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 text-center">
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-8"
        >
          <div className="space-y-4">
            <motion.h2
              variants={textItemVariants}
              className="text-white text-5xl sm:text-7xl font-black uppercase tracking-wider"
            >
              {hero?.subtitle}
            </motion.h2>

            <motion.div
              variants={textItemVariants}
              className="flex items-center justify-center gap-4"
            >
              <div className="h-px w-8 md:w-16 bg-white/50" />
              <RichText
                content={hero?.description || "Epic Journeys Await"}
                className="text-secondary-400 text-base font-medium italic tracking-[0.3em]"
              />
              <div className="h-px w-8 md:w-16 bg-white/50" />
            </motion.div>
          </div>

          <motion.button
            variants={textItemVariants}
            onClick={() => setIsSearchOpen(true)}
            className="group flex items-center gap-3 bg-white px-8 py-4 rounded-full text-black font-bold uppercase tracking-widest transition-all hover:bg-primary-500 hover:text-white active:scale-95 shadow-2xl"
          >
            <IoSearchOutline size={20} />
            Search Packages
          </motion.button>
        </motion.div>
      </div>

      {!videoError && finalVideoSrc && (
        <button
          onClick={toggleVideo}
          className="absolute bottom-8 right-8 z-30 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all active:scale-90"
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? (
            <IoPauseOutline size={24} />
          ) : (
            <IoPlayOutline size={24} />
          )}
        </button>
      )}

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl"
            >
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute -top-12 right-0 md:-right-12 text-white hover:text-primary-400 transition-colors"
              >
                <IoCloseOutline size={40} />
              </button>
              <LocationDate city={city} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeHero;

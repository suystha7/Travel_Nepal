"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import logo from "@/assest/logo/travel-logo.webp";
import UserSection from "./UserSection";
import HeaderClient from "./HeaderClient";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";

const Header = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;

    if (latest < 80) {
      setIsVisible(true);
      return;
    }

    if (latest > previous) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <HeaderClient>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 left-0 right-0 z-50 w-full bg-white border-b h-20 flex items-center"
      >
        <div className="padding-x flex items-center justify-between w-full h-16">
          <div className="shrink-0">
            <Link href="/" aria-label="Homepage" className="flex items-center group">
              <Image src={logo} alt="logo" className="w-36" priority />
            </Link>
          </div>

          <nav className="hidden lg:flex flex-1 justify-center mx-8">
            <div className="px-6 py-2">
              <Navbar />
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5">
              <UserSection />
            </div>
            <div className="w-10 lg:hidden" />
          </div>
        </div>
      </motion.header>
    </HeaderClient>
  );
};

export default Header;
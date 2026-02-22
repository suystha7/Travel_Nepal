"use client";

import React from "react";
import aboutUi from "@/assest/aboutUi.png";
import Image from "next/image";
import Link from "next/link";
import { MoveRight, Sparkles } from "lucide-react";

const SpecialOffer = () => {
  return (
    <section className="mb-20 pb-8 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary-50 text-tertiary-600 mb-6">
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Limited Availability
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-8">
            THE BIG <br />
            <span className="text-tertiary-500 relative">
              SEASON DEAL
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 20"
                fill="none"
              >
                <path
                  d="M5 15C100 5 200 5 295 15"
                  stroke="#FBBF24"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.3"
                />
              </svg>
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-md mb-10">
            Unlock exclusive benefits and elevate your travel experience with
            our hand-picked seasonal offers designed for the bold explorer.
          </p>

          <Link href="/contact-us" className="inline-block group">
            <div className="flex items-center gap-6">
              <button className="relative overflow-hidden bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg transition-all group-hover:bg-tertiary-600 group-hover:pr-14">
                Get it now
                <MoveRight className="absolute right-4 top-1/2 -trangray-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </button>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter">
                  Valid until
                </p>
                <p className="text-sm font-black text-gray-900">Dec 31, 2025</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-tertiary-200/30 rounded-full blur-[100px] animate-pulse" />

          <div className="relative z-10 group">
            <div className="relative  overflow-hidden">
              <Image
                src={aboutUi}
                alt="Special Offer"
                width={400}
                height={400}
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute -bottom-2 left-0 p-6 flex flex-col items-center min-w-35 animate-bounce-slow">
              <span className="text-4xl font-black text-gray-900">25%</span>
              <span className="text-[10px] font-bold text-tertiary-600 uppercase tracking-[0.2em] bg-tertiary-50 px-2 py-1 rounded-md">
                Instant Off
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;

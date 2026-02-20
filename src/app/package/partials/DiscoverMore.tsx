import Title from "@/core/common/Title";
import Image from "next/image";
import React from "react";
import national from "@/assest/national.jpg";
import international from "@/assest/international.jpg";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const DISCOVER_DATA = [
  {
    title: "National",
    subtitle: "Hidden Gems of Nepal",
    description:
      "Explore the beauty of Nepal with our curated national tour packages.",
    image: national,
    link: "/package?country=nepal",
  },
  {
    title: "International",
    subtitle: "The Global Frontier",
    description:
      "Discover global destinations with our premium international travel experiences.",
    image: international,
    link: "/package?type=international",
  },
];

const DiscoverMore = () => {
  return (
    <div className="padding-x py-16 bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-center mb-4 gap-6">
        <Title
          label="Boundless Horizons"
          primaryText="Discover "
          highlightText="Nepal & Beyond"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {DISCOVER_DATA.map((item, index) => (
          <div
            key={index}
            className="group relative flex flex-col h-[500px] overflow-hidden rounded-xl cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
              priority={index === 0}
            />

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

            <div className="absolute top-8 right-8 z-20">
              <Link href={item.link}>
                <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500 rotate-45 group-hover:rotate-0">
                  <ArrowUpRight size={28} />
                </div>
              </Link>
            </div>

            <div className="mt-auto relative z-10 p-8 md:p-12 translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
              <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                <span className="text-tertiary-400 font-bold uppercase tracking-[0.3em] text-xs mb-3 block">
                  {item.subtitle}
                </span>
                <h3 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-lg leading-relaxed max-h-0 group-hover:max-h-32 overflow-hidden transition-all duration-700 opacity-0 group-hover:opacity-100">
                  {item.description}
                </p>

                <Link href={item.link} className="inline-block mt-6">
                  <span className="text-white font-bold text-sm uppercase tracking-widest border-b-2 border-tertiary-500 pb-1">
                    Explore Destinations
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverMore;

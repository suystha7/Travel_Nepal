"use client";

import Image from "next/image";
import React, { useMemo } from "react";
import { Globe2, Compass, ArrowUpRight } from "lucide-react";
import { DUMMY_IMAGES } from "@/data/whoWeAre";
import RichText from "@/utils/richText";
import { useRouter } from "next/navigation";

interface TestimonialRecord {
  image: string;
  name?: string;
  rating?: number;
}

interface WhoWeAreProps {
  whoWeAreData: {
    title: string;
    images: { image: string }[];
    description: string;
  };
  stats: {
    total_packages: number;
    year_experience: number;
  };  
  testimonialData:
    | {
        records: TestimonialRecord[];
        rating: number;
      }
    | TestimonialRecord[];
}

const WhoWeAre = ({ whoWeAreData, stats, testimonialData }: WhoWeAreProps) => {
  const router = useRouter();

  const records = Array.isArray(testimonialData)
    ? testimonialData
    : testimonialData?.records || [];

  const avgRating = useMemo(() => {
    if (!records || records.length === 0) return "4.9";
    const total = records.reduce((acc, curr) => acc + (curr.rating || 0), 0);
    const avg = total / records.length;
    return avg > 0 ? avg.toFixed(1) : "4.9";
  }, [records]);

  const imagesArray = useMemo(() => {
    const extracted = (whoWeAreData?.images || [])
      .map((obj) => obj.image)
      .filter((img) => img && img.trim() !== "");
    
    return extracted.length > 0 ? extracted : DUMMY_IMAGES;
  }, [whoWeAreData?.images]);

  return (
    <section className="relative px-6 md:px-16 lg:px-24 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          <div className="w-full lg:w-[55%] relative">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7 pt-20">
                <div className="relative aspect-4/5 rounded-3xl overflow-hidden group">
                  <Image
                    src={imagesArray[0]}
                    alt="Main view"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900/40 to-transparent" />
                </div>
              </div>

              <div className="col-span-5 flex flex-col gap-4">
                <div className="relative aspect-square rounded-3xl overflow-hidden group">
                  <Image
                    src={imagesArray[1] || imagesArray[0]}
                    alt="Detail view"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-50 rounded-2xl text-primary-600">
                      <Globe2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Local Expertise</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Access to 500+ partners across 77 districts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-tertiary-50 rounded-2xl text-tertiary-600">
                      <Compass size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Tailored Paths</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Itineraries built for your pace.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 md:bottom-12 md:-left-12 bg-primary-600 p-8 rounded-3xl text-white shadow-2xl hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {(records.length > 0 ? records : [1, 2, 3]).slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-primary-600 bg-gray-200 overflow-hidden relative"
                    >
                      <Image
                        src={typeof item === 'object' ? (item.image || `https://i.pravatar.cc/100?img=${i + 10}`) : `https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xl font-black">{avgRating}/5</div>
                  <div className="text-[10px] uppercase font-bold tracking-tighter opacity-80">
                    Customer Rating
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-10 w-full lg:w-[45%]">
            <h2 className="text-5xl font-black text-gray-900 leading-[1.1] mb-8">
              {whoWeAreData?.title?.split(" ").map((word, index) =>
                index === 1 ? (
                  <span key={index} className="text-primary-600"> {word} </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h2>

            <div className="relative pl-6 border-l-2 border-primary-200">
              <RichText
                content={whoWeAreData?.description || "We architect experiences that linger in your memory."}
                className="text-gray-600 text-lg leading-relaxed max-w-xl prose prose-p:mb-4"
              />
            </div>

            <div className="mt-12 flex flex-wrap gap-8">
              <div className="group cursor-pointer">
                <div className="text-5xl font-black text-gray-900 group-hover:text-primary-600 transition-colors">
                  {stats?.year_experience || 0}
                </div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Years of Expertise
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="text-5xl font-black text-gray-900 group-hover:text-primary-600 transition-colors">
                  {stats?.total_packages || 0}
                </div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Total Packages
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/about-us")}
              className="mt-12 group flex items-center gap-6 bg-secondary-400 text-white pl-8 pr-2 py-2 rounded-full hover:bg-primary-600 transition-all duration-300"
            >
              <span className="font-bold uppercase text-xs tracking-widest">
                Explore About Us
              </span>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
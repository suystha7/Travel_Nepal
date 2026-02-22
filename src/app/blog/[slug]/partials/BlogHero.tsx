"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { formatDateLong } from "@/utils/formatDate";

const BlogHero = ({ blog, activeImageIndex, setActive, gallery }: any) => {
  const images =
    gallery?.length > 0
      ? gallery
      : [{ image: blog?.image || "/placeholder.png" }];

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev: number) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, setActive]);

  return (
    <header className="relative h-[90vh] w-full overflow-hidden bg-slate-950">
      {images.map((img: any, index: number) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={img.image || "/placeholder.png"}
            alt={`Slide ${index}`}
            fill
            className="object-cover scale-105 animate-slow-zoom"
            priority={index === 0}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent z-20" />

      <div className="absolute bottom-0 left-0 w-full p-8 md:p-20 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-8">
            <span className="bg-white/50 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-black tracking-[0.2em] mb-6 w-fit">
              {blog?.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white max-w-4xl">
              {blog?.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-6 text-slate-300 text-xs font-bold tracking-widest">
              <p>By {blog?.author || "Admin"}</p>
              <div className="w-1 h-1 bg-primary-500 rounded-full" />
              <p>{formatDateLong(blog?.created_at)}</p>
              <div className="w-1 h-1 bg-primary-500 rounded-full" />
              <p className="flex items-center gap-2">
                <Clock size={14} /> 10 MIN READ
              </p>
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="group relative h-1 w-12 overflow-hidden rounded-full bg-white/20 transition-all"
                  >
                    <div
                      className={`absolute inset-0 bg-primary-500 transition-transform duration-3000 ease-linear origin-left ${
                        i === activeImageIndex
                          ? "translate-x-0"
                          : "-translate-x-full"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slow-zoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s linear infinite alternate;
        }
      `}</style>
    </header>
  );
};

export default BlogHero;

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface PackageGalleryProps {
  images: { image: string }[];
  activeIndex: number;
}

const PackageGallery = ({ images, activeIndex }: PackageGalleryProps) => {
  const [current, setCurrent] = useState(activeIndex);

  useEffect(() => {
    setCurrent(activeIndex);
  }, [activeIndex]);

  if (!images?.length) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute inset-0 z-20 cursor-pointer" />
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay className="bg-black/80 backdrop-blur-3xl transition-all duration-300" />
        <DialogContent className="fixed left-1/2 top-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between border-none bg-transparent p-0 shadow-none outline-none py-12">
          <VisuallyHidden>
            <DialogTitle>Gallery View</DialogTitle>
          </VisuallyHidden>

          <div className="relative flex w-full flex-1 items-center justify-center px-4">
            <div className="relative flex-1 w-full flex items-center justify-center">
              <div className="relative h-[50vh] w-full">
                <Image
                  src={images[current]?.image}
                  alt="Gallery View"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="no-scrollbar flex w-full justify-center gap-3 overflow-x-auto px-6 py-8">
            {images.map((img, idx) => (
              <button
                key={`${img.image}-${idx}`}
                onClick={() => setCurrent(idx)}
                className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ease-out ${
                  current === idx
                    ? "border-white scale-105 ring-2 ring-white/20"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.image}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default PackageGallery;

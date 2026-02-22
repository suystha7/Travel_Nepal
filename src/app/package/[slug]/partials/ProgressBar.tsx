"use client";

import React, { useEffect, useState, useRef } from "react";

interface ScrollProgressBarProps {
  sections: { id: string; label: string }[];
}

export const ScrollProgressBar = ({ sections }: ScrollProgressBarProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = sections.map((s) => document.getElementById(s.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex((s) => s.id === entry.target.id);
            setActiveIndex(index);
            const activeItem = scrollRef.current?.children[
              index
            ] as HTMLElement;
            if (activeItem) {
              scrollRef.current?.scrollTo({
                left: activeItem.offsetLeft - 40,
                behavior: "smooth",
              });
            }
          }
        });
      },
      { threshold: 0.6, rootMargin: "-150px 0px -50% 0px" }
    );
    elements.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 160;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-[100px] md:top-[150px] z-30 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div
        ref={scrollRef}
        className="max-w-7xl mx-auto flex items-center gap-0 overflow-x-auto no-scrollbar"
      >
        {sections.map((section, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={`flex-shrink-0 flex flex-col items-center justify-center w-24 h-20 transition-all duration-300 border-b-2
                ${isActive ? "border-primary-600 bg-gray-50/50" : "border-transparent text-gray-400 hover:text-gray-600"}
              `}
            >
              <span
                className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isActive ? "text-primary-600" : "text-gray-300"}`}
              >
                Day
              </span>
              <span
                className={`text-xl font-light font-mono ${isActive ? "text-gray-900 font-bold" : ""}`}
              >
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export const ProgressBar = ({ count = 3 }: { count?: number }) => {
  const steps = Array.from({ length: count });

  return (
    <div className="w-full py-12 px-6">
      <div className="flex items-end gap-2 max-w-xl mx-auto h-12">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`flex-1 transition-all duration-500 rounded-t-sm
              ${index === 0 ? "h-full bg-primary-600" : "h-1/3 bg-gray-100 hover:h-1/2 hover:bg-gray-200"}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

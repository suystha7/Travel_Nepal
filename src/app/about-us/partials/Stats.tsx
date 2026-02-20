"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Calendar } from "lucide-react";
import { IoHappy } from "react-icons/io5";
import { MdTravelExplore } from "react-icons/md";
import { GoPackage } from "react-icons/go";

interface StatsProps {
  aboutUsStats?: {
    year_experience?: string | number;
    happy_travellers?: string | number;
    total_packages?: string | number;
    travel_history?: string | number;
  };
}

const Counter = ({ value }: { value: string | number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stringValue = String(value || "");
  const numericValue = parseInt(stringValue.replace(/\D/g, "")) || 0;
  const suffix = stringValue.replace(/[0-9]/g, "");

  const spring = useSpring(0, { mass: 1, stiffness: 40, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current));

  const [displayText, setDisplayText] = useState("0");

  useEffect(() => {
    if (isInView) spring.set(numericValue);
  }, [isInView, spring, numericValue]);

  useEffect(() => {
    return display.on("change", (latest) => {
      setDisplayText(latest.toLocaleString());
    });
  }, [display]);

  return (
    <span ref={ref}>
      {displayText}
      {suffix}
    </span>
  );
};

const Stats = ({ aboutUsStats }: StatsProps) => {
  const summaryData = [
    {
      icon: Calendar,
      number: aboutUsStats?.year_experience ?? "6",
      description: "Yrs Experience",
      color: "from-blue-600 to-cyan-500",
      position: "lg:translate-y-0",
    },
    {
      icon: IoHappy,
      number: aboutUsStats?.happy_travellers ?? "100",
      description: "Happy Travellers",
      color: "from-orange-500 to-rose-400",
      position: "lg:translate-y-16",
    },
    {
      icon: GoPackage,
      number: aboutUsStats?.total_packages ?? "80",
      description: "Total Packages",
      color: "from-emerald-500 to-teal-400",
      position: "lg:translate-y-0",
    },
    {
      icon: MdTravelExplore,
      number: aboutUsStats?.travel_history ?? "1K",
      description: "Travel History",
      color: "from-violet-600 to-indigo-400",
      position: "lg:translate-y-16",
    },
  ];

  return (
    <section className="relative overflow-hidden pb-24">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {summaryData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`${item.position}`}
              >
                <div className="group relative p-8 rounded-4xl bg-white border border-slate-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-inherit transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <Icon size={26} />
                  </div>

                  <div className="space-y-1">
                    <div className="text-5xl font-black text-slate-900 tracking-tight">
                      <Counter value={item.number} />
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.15em]">
                      {item.description}
                    </p>
                  </div>

                  <div className="absolute bottom-6 right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                    <Icon size={80} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;

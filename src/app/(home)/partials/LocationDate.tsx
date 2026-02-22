"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, ChevronDown } from "lucide-react";
import { DateRange } from "react-date-range";
import { motion, Variants } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchBox from "@/core/common/SearchBox";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const formatDate = (d: Date) => d.toISOString().slice(0, 10);

interface IProps {
  city?: { name: string; slug: string }[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const LocationDate = ({ city = [] }: IProps) => {
  const router = useRouter();

  const [selectedCity, setSelectedCity] = useState<{
    name: string;
    slug: string;
  } | null>(null);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const hasDateSelected =
    dateRange[0].startDate.getTime() !== dateRange[0].endDate.getTime();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.set("search", selectedCity.slug);
    if (hasDateSelected) {
      params.set("start_date", formatDate(dateRange[0].startDate));
      params.set("end_date", formatDate(dateRange[0].endDate));
    }
    router.push(`/package?${params.toString()}`);
  };

  return (
    <motion.div
      className="w-full max-w-sm mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col gap-4 p-5 bg-transparent border rounded-xl">
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-white">
            Destination
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center w-full gap-3 px-5 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group border border-transparent hover:border-gray-200">
                <MapPin size={18} className="text-primary-500" />
                <div className="flex flex-col items-start overflow-hidden">
                  <span
                    className={`text-sm font-bold truncate ${selectedCity ? "text-gray-900" : "text-gray-400"}`}
                  >
                    {selectedCity ? selectedCity.name : "Where are you going?"}
                  </span>
                </div>
                <ChevronDown
                  size={14}
                  className="ml-auto text-gray-400 group-hover:text-primary-500 transition-colors"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="center"
              className="w-80 p-3 mt-2 rounded-3xl shadow-2xl border-gray-100"
            >
              <div className="space-y-3">
                <SearchBox
                  className="bg-gray-100 border-none rounded-xl"
                  placeholder="Search city..."
                />
                <div className="max-h-52 overflow-y-auto custom-scrollbar">
                  {city.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => setSelectedCity(c)}
                      className="flex items-center gap-3 w-full p-3 hover:bg-primary-50 rounded-xl transition-colors text-left"
                    >
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700">
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-white">
            Travel Dates
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center w-full gap-3 px-5 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group border border-transparent hover:border-gray-200">
                <Calendar size={18} className="text-primary-500" />
                <span
                  className={`text-sm font-bold ${hasDateSelected ? "text-gray-900" : "text-gray-400"}`}
                >
                  {hasDateSelected
                    ? `${formatDate(dateRange[0].startDate)} — ${formatDate(dateRange[0].endDate)}`
                    : "Select duration"}
                </span>
                <ChevronDown
                  size={14}
                  className="ml-auto text-gray-400 group-hover:text-primary-500 transition-colors"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="center"
              className="w-auto p-0 mt-2 rounded-3xl shadow-2xl border-gray-100 overflow-hidden"
            >
              <DateRange
                editableDateInputs
                onChange={(item: any) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                rangeColors={["#7c3aed"]}
                minDate={new Date()}
                className="text-sm"
              />
            </PopoverContent>
          </Popover>
        </motion.div>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          className="flex items-center justify-center w-full gap-3 bg-primary-500 hover:bg-secondary-500 text-white rounded-xl py-4 mt-2 transition-all shadow-lg hover:shadow-primary-500/20"
        >
          <Search size={20} strokeWidth={3} />
          <span className="font-bold tracking-wide">Search Packages</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LocationDate;

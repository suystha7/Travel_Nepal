"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useURLFilter } from "./useCategoryFilter";
import { Range, getTrackBackground } from "react-range";
import { RotateCcw, Calendar, Tag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MIN = 100;
const MAX = 5000;
const STEP = 100;

interface Props {
  tripTypes: Array<{ id: string | number; slug: string; name: string }>;
  duration: Array<string | number>;
}

const PriceRangeSection = ({ tripTypes, duration }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setFilter, getFilter } = useURLFilter();

  const initialMin = Number(getFilter("min_price") || MIN);
  const initialMax = Number(getFilter("max_price") || MAX);

  const [values, setValues] = useState<number[]>([initialMin, initialMax]);

  const tripType = getFilter("trip_type", "all");
  const activeDuration = getFilter("duration", "all");

  useEffect(() => {
    setValues([
      Number(getFilter("min_price") || MIN),
      Number(getFilter("max_price") || MAX),
    ]);
  }, [getFilter]);

  const handleSliderFinalChange = useCallback(
    (vals: number[]) => {
      setFilter("min_price", vals[0]);
      setFilter("max_price", vals[1]);
    },
    [setFilter]
  );

  const handleReset = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const trackBackground = useMemo(
    () =>
      getTrackBackground({
        values,
        colors: ["#e5e7eb", "#ed9759", "#e5e7eb"],
        min: MIN,
        max: MAX,
      }),
    [values]
  );

  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-4 ">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
              Budget Range
            </label>
            <span className="text-sm font-bold text-primary-600">
              Rs.{values[0]} — Rs.{values[1]}
            </span>
          </div>
          <div className="px-2 pt-5">
            <Range
              step={STEP}
              min={MIN}
              max={MAX}
              values={values}
              onChange={(vals) => setValues(vals)}
              onFinalChange={handleSliderFinalChange}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-1 w-full rounded-full transition-all"
                  style={{ background: trackBackground }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  className={`h-5 w-5 rounded-full bg-white border-2 border-primary-500 shadow-md outline-none transition-all overflow-hidden ${
                    isDragged ? "shadow-lg" : "hover:scale-110"
                  }`}
                />
              )}
            />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] px-1">
            Duration
          </label>
          <Select
            value={activeDuration || "all"}
            onValueChange={(val) =>
              setFilter("duration", val === "all" ? null : val)
            }
          >
            <SelectTrigger className="w-full h-11 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-primary-500/20 transition-all">
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-gray-400" />
                <SelectValue placeholder="Any Duration" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="all">Any Duration</SelectItem>
              {duration.map((d) => (
                <SelectItem key={d} value={String(d)}>
                  {d} Days
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="lg:col-span-3 space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] px-1">
            Trip Type
          </label>
          <Select
            value={tripType || "all"}
            onValueChange={(val) =>
              setFilter("trip_type", val === "all" ? null : val)
            }
          >
            <SelectTrigger className="w-full h-11 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-primary-500/20 transition-all">
              <div className="flex items-center gap-2">
                <Tag size={15} className="text-gray-400" />
                <SelectValue placeholder="All Types" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 shadow-xl">
              <SelectItem value="all">All Trip Types</SelectItem>
              {tripTypes.map((item) => (
                <SelectItem key={item.id} value={item.slug}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="lg:col-span-2">
          <button
            onClick={handleReset}
            className="w-full h-11 flex items-center justify-center gap-2 text-gray-500 border border-gray-200 text-[11px] font-bold rounded-xl hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300 transition-all active:scale-[0.97] uppercase tracking-widest"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSection;

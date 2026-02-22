"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { usePathname } from "next/navigation";

const formatDate = (d: Date) => d.toISOString().slice(0, 10);

const DateDropDown = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DropdownMenuTrigger className="flex flex-row gap-2 cursor-pointer">
        <div>
          <p className="typography-sub-h2-medium text-grey-900">Date</p>
          <p className="typography-mid-body-light text-grey-400">
            {dateRange[0].startDate.toLocaleDateString()} -{" "}
            {dateRange[0].endDate.toLocaleDateString()}
          </p>
        </div>
        <ChevronDown className="inline ml-1 w-4 h-4 text-grey-900" />
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="w-auto p-4 bg-white shadow-xl border rounded-xl"
      >
        <DateRange
          editableDateInputs={true}
          onChange={(item: any) => {
            const selection = item.selection;
            setDateRange([selection]);

            if (selection.startDate && selection.endDate) {
              const start = formatDate(selection.startDate);
              const end = formatDate(selection.endDate);

              const params = new URLSearchParams(window.location.search);
              params.set("start_date", start);
              params.set("end_date", end);

              const shouldAddPackage =
                !pathname.startsWith("/package") &&
                params.has("start_date") &&
                params.has("end_date");

              const basePath = shouldAddPackage
                ? `/package${pathname === "/" ? "" : pathname}`
                : pathname;

              // router.replace(`${basePath}?${params.toString()}`);
              window.history.pushState(
                {},
                "",
                `${basePath}?${params.toString()}`
              );
            }
          }}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          minDate={startOfToday}
          className="w-fit"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateDropDown;

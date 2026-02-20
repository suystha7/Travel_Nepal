"use client";

import SearchBox from "@/core/common/SearchBox";
import React from "react";
import PackageView from "./PackageViewType";
import { useSearchParams } from "next/navigation";

interface FilterSectionProps {
  totalItems: number;
}

const FilterSection: React.FC<FilterSectionProps> = ({ totalItems }) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const displayTitle = searchQuery || "All Packages";

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-gray-900 capitalize tracking-tight">
          {displayTitle}
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Found {totalItems.toLocaleString()}{" "}
          {totalItems === 1 ? "package" : "packages"}
          {searchQuery && (
            <span>
              {" "}
              for{" "}
              <span className="text-gray-900 underline decoration-gray-200 underline-offset-4 italic">
                "{searchQuery}"
              </span>
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="grow md:grow-0 md:min-w-70">
          <SearchBox placeholder="Search packages..." />
        </div>
        <div className="h-10 w-px bg-gray-200 mx-1 hidden md:block" />
        <PackageView />
      </div>
    </div>
  );
};

export default FilterSection;

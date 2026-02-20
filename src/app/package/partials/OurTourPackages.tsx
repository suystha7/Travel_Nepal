"use client";

import React, { useState, useMemo, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterSection from "./FilterSection";
import PriceRangeSection from "./PriceRangeSection";
import { getValidTab } from "@/utils/getValidTabs";
import { PackageViewType, PackageViewTypeTabs } from "./PackageViewType";
import ListView from "./ListView";
import GridView from "./GridView";
import Title from "@/core/common/Title";
import { IPackageRecord } from "../interface/IPackageData.interface";
import Pagination from "./Pagination";

interface IProps {
  packageData: IPackageRecord[];
  tripTypes: any[];
  totalRecords: number;
  currentPage: number;
  perPage: number;
}

const OurTourPackages: React.FC<IProps> = ({
  packageData = [],
  tripTypes,
  totalRecords,
  currentPage,
  perPage,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filterOpen, setFilterOpen] = useState(false);

  const uniqueDurations = useMemo(() => {
    return Array.from(new Set(packageData.map((p) => p.duration))).sort(
      (a, b) => Number(a) - Number(b)
    );
  }, [packageData]);

  const updateQueryParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) params.delete(key);
        else params.set(key, value);
      });
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const goToPage = (page: number) => updateQueryParams({ p: page.toString() });

  const changePerPage = (value: number) =>
    updateQueryParams({
      page_size: value.toString(),
      p: "1",
    });

  const viewType = useMemo(
    () =>
      getValidTab(
        searchParams.get("view"),
        PackageViewTypeTabs,
        PackageViewTypeTabs[0]?.id
      ) as PackageViewType,
    [searchParams]
  );

  const activeTabLabel = useMemo(
    () =>
      PackageViewTypeTabs?.find((item) => item.id === viewType)?.label || "",
    [viewType]
  );

  const renderViewContent = () => {
    const props = { activeTab: activeTabLabel, content: packageData };
    return viewType === "list" ? (
      <ListView {...props} />
    ) : (
      <GridView {...props} />
    );
  };

  return (
    <div className="padding-x relative py-20">
      <Title
        label="Ready to Explore?"
        primaryText="Our"
        highlightText="Tour Packages"
      />

      <div className="flex flex-col gap-5 mt-10">
        <div className="w-full">
          <FilterSection totalItems={totalRecords} />

          <hr className="my-6 border-gray-200" />

          <div className="hidden md:block my-8">
            <PriceRangeSection
              tripTypes={tripTypes}
              duration={uniqueDurations}
            />
          </div>

          <div className="min-h-100">{renderViewContent()}</div>
        </div>
      </div>

      <div className="">
        <Pagination
          currentPage={currentPage}
          totalRecords={totalRecords}
          perPage={perPage}
          goToPage={goToPage}
          changePerPage={changePerPage}
        />
      </div>

      <button
        onClick={() => setFilterOpen(true)}
        className="fixed bottom-6 right-6 z-40 md:hidden bg-primary-600 text-white px-8 py-3.5 rounded-full shadow-2xl font-bold tracking-tight active:scale-95 transition-transform"
      >
        Adjust Filters
      </button>

      {filterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in"
            onClick={() => setFilterOpen(false)}
          />
          <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[2.5rem] shadow-2xl md:hidden animate-in slide-in-from-bottom duration-300"
            style={{ maxHeight: "90vh" }}
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              <button
                onClick={() => setFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto pb-12">
              <PriceRangeSection
                tripTypes={tripTypes}
                duration={uniqueDurations}
              />
              <button
                onClick={() => setFilterOpen(false)}
                className="w-full mt-8 bg-primary-600 text-white py-4 rounded-xl font-bold"
              >
                Show Results
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OurTourPackages;

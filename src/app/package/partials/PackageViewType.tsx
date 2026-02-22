"use client";

import React from "react";
import { Grid3x3, List } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getValidTab, ITabConfig } from "@/utils/getValidTabs";

export type PackageViewType = "list" | "grid";

export const PackageViewTypeTabs: ITabConfig<PackageViewType>[] = [
  {
    id: "grid",
    label: "Grid",
    icon: Grid3x3,
  },
  {
    id: "list",
    label: "List",
    icon: List,
  },
];

const PackageView: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const viewTypeParams = searchParams.get("view");
  const viewType = getValidTab(
    viewTypeParams,
    PackageViewTypeTabs,
    PackageViewTypeTabs[0]?.id
  );

  const handleValueChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("view", value);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="hidden md:block">
      <Tabs value={viewType} onValueChange={handleValueChange}>
        <TabsList className="grid w-25 grid-cols-2 h-10 bg-gray-50 border border-gray-100 rounded-xl p-1">
          {PackageViewTypeTabs.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="rounded-lg data-[state=active]:bg-white transition-all"
            >
              {item.icon && <item.icon size={16} />}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PackageView;

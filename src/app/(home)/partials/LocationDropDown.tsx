"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MapPin } from "lucide-react";
import SearchBox from "@/core/common/SearchBox";

interface IProps {
  city?: { name: string; slug: string }[];
}
const LocationDropDown: React.FC<IProps> = ({ city }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row gap-2">
          <div>
            <p className="typography-sub-h2-medium text-grey-900">Location</p>
            <p className="typography-mid-body-light text-grey-400">
              Where are you going
            </p>
          </div>
          <ChevronDown className="inline ml-1 w-4 h-4 text-grey-900" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="start"
          className="w-52 p-4 bg-white shadow-xl border rounded-xl space-y-4"
        >
          <SearchBox
            className="rounded-lg w-full placeholder:typography-large-body placeholder:text-grey-200 pl-2"
            placeholder="Search By Place..."
          />
          {city && (
            <div className="max-h-40 overflow-y-auto custom-scrollbar">
              {city.map((c, index) => (
                <div
                  key={index}
                  data-name={c?.name ?? ""}
                  onClick={() => {
                    const params = new URLSearchParams(window.location.search);
                    params.set("search", c?.slug ?? "");
                    const query = params.toString();
                    const newUrl = query ? `/package?${query}` : "/package";
                    // router.push(newUrl);
                    window.history.pushState({}, "", newUrl);
                  }}
                  className="location-item py-2 px-3 w-full hover:bg-grey-100 rounded-lg cursor-pointer typography-mid-body-light text-grey-900 inline-flex gap-2"
                >
                  <MapPin className="text-grey-400" size={20} />
                  {c?.name}
                </div>
              ))}
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LocationDropDown;

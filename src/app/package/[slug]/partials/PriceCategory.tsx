import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MapPin } from "lucide-react";
import { HiChevronDown } from "react-icons/hi2";

const PriceCategory = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row gap-2">
          <div>
            <p className="typography-sub-h2-medium text-left text-grey-900">
              Price Category
            </p>
            <p className="typography-extra-large-body-light font-normal text-grey-500">
              Economy
            </p>
          </div>
          <HiChevronDown className="inline ml-1 text-grey-900" size={22} />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="start"
          className="w-52 p-4 bg-white shadow-xl border rounded-xl space-y-4"
        >
          <div className=" inline-flex gap-2">
            <MapPin className="text-grey-400" size={20} />
            Kathmandu
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PriceCategory;

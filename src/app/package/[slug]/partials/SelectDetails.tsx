import { HiChevronDown } from "react-icons/hi2";

import React from "react";

const SelectDetails = () => {
  return (
    <div className="shadow-[0px_0px_18px_0px_#0000000A] my-10 rounded-2xl border border-grey-50 md:rounded-lg md:border-0 px-3 py-4 md:p-7">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col md:flex-row gap-5 md:gap-10 lg:gap-14">
          <div>
            <p className="typography-large-body-regular text-grey-300 mb-2 flex justify-between">
              From City{" "}
              <HiChevronDown size={22} className=" ml-2 inline-block" />
            </p>
            {/* <LocationDropDown /> */}
            <p className="typography-extra-large-body-light font-normal text-grey-500">
              Upper Mustang
            </p>
          </div>
          <div>
            <p className="typography-large-body-regular text-grey-300 mb-2 flex justify-between">
              Price Category{" "}
              <HiChevronDown size={22} className="inline-block ml-2" />
            </p>
            <p className="typography-extra-large-body-light font-normal text-grey-500">
              Economy
            </p>
            {/* <PriceCategory /> */}
          </div>
          <div>
            <p className="typography-large-body-regular text-grey-300 mb-2 flex justify-between">
              Room & Guest{" "}
              <HiChevronDown size={22} className="inline-block ml-2" />
            </p>
            <p className="typography-extra-large-body-light font-normal text-grey-500">
              01 Room 02 Guests
            </p>
          </div>
          <div>
            <p className="typography-large-body-regular text-grey-300 mb-2 flex justify-between">
              Tour Date{" "}
              <HiChevronDown size={22} className="inline-block ml-2" />
            </p>
            <p className="typography-extra-large-body-light font-normal text-grey-500">
              11 Nov 25 Tue{" "}
            </p>
          </div>
        </div>
        <div>
          <button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-200 text-white typography-sub-h3-light px-6 py-2.5 md:py-1.5 rounded-lg mt-5 md:mt-0">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectDetails;

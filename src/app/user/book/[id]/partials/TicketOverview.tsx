import Image from "next/image";
import React from "react";
import rara from "@/assest/packagehero.png";
import { CalendarDaysIcon } from "lucide-react";

const TicketOverview = () => {
  return (
    <div className="border border-grey-50 rounded-3xl w-full p-6">
      <p className="typography-sub-h2-regular py-5 text-center">
        Your Ticket Overview
      </p>
      <div className="flex flex-row gap-4">
        <Image
          src={rara}
          alt="Tour Image"
          width={160}
          height={110}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-4">
          <p className="typography-sub-h1-regular font-medium text-grey-700">
            Rara
          </p>

          <p className="typography-extra-large-body inline-flex items-center gap-2">
            <CalendarDaysIcon className="text-yellow-500" />
            2023-08-15
          </p>
        </div>
      </div>
      <hr className="my-6 border-t border-grey-50" />

      <div className="flex justify-between items-center pb-5">
        <p className="typography-mid-body-light text-grey-400">
          Adult (18+) (Rs.8,500)
        </p>
        <p className="typography-mid-body-light text-grey-900">NPR.8,500</p>
      </div>
      <div className="flex justify-between items-center pb-5">
        <p className="typography-mid-body-light text-grey-400">Child (6-17)</p>
        <p className="typography-mid-body-light text-grey-900">NPR.2,000</p>
      </div>
      <div className="flex justify-between items-center pb-5">
        <p className="typography-mid-body-light text-grey-400">Infant (0-5) </p>
        <p className="typography-mid-body-light text-grey-900">NPR.0.00</p>
      </div>
      <hr className="my-6 border-t border-grey-50" />
      <div className="flex justify-between items-center">
        <p className="typography-sub-h1-regular font-medium text-grey-700">
          Total Price
        </p>
        <p className="typography-sub-h2-regular font-bold text-yellow-500">
          NRP 3,200
        </p>
      </div>
    </div>
  );
};

export default TicketOverview;

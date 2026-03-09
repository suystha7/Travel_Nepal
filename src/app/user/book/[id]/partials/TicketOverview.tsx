import Image from "next/image";
import React from "react";
import { CalendarDaysIcon } from "lucide-react";
import rara from "@/assest/packagehero.png";
import { ITicketOverviewProps } from "../interface/IBooking";

const TicketOverview: React.FC<ITicketOverviewProps> = ({ booking }) => {
  const adultPrice = booking.adult_price || 8500;
  const childPrice = booking.child_price || 2000;
  const infantPrice = booking.infant_price || 0;

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
            {booking.package_name || "Package Name"}
          </p>

          <p className="typography-extra-large-body inline-flex items-center gap-2">
            <CalendarDaysIcon className="text-yellow-500" />
            {booking.arrival_date} - {booking.departure_date}
          </p>
        </div>
      </div>

      <hr className="my-6 border-t border-grey-50" />

      <div className="flex justify-between items-center pb-5">
        <p className="typography-mid-body-light text-grey-400">
          Adult (18+) ({booking.adult_count} x {booking.currency}.{adultPrice})
        </p>
        <p className="typography-mid-body-light text-grey-900">
          {booking.currency}.{booking.adult_count * adultPrice}
        </p>
      </div>

      <div className="flex justify-between items-center pb-5">
        <p className="typography-mid-body-light text-grey-400">
          Child (6-17) ({booking.child_count} x {booking.currency}.{childPrice})
        </p>
        <p className="typography-mid-body-light text-grey-900">
          {booking.currency}.{booking.child_count * childPrice}
        </p>
      </div>

      <div className="flex justify-between items-center pb-5">
        <p className="typography-mid-body-light text-grey-400">
          Infant (0-5) ({booking.infant_count} x {booking.currency}.
          {infantPrice})
        </p>
        <p className="typography-mid-body-light text-grey-900">
          {booking.currency}.{booking.infant_count * infantPrice}
        </p>
      </div>

      <hr className="my-6 border-t border-grey-50" />

      <div className="flex justify-between items-center">
        <p className="typography-sub-h1-regular font-medium text-grey-700">
          Total Price
        </p>
        <p className="typography-sub-h2-regular font-bold text-yellow-500">
          {booking.currency}.{booking.total_amount}
        </p>
      </div>
    </div>
  );
};

export default TicketOverview;

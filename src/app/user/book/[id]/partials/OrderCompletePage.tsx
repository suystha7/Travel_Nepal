import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const OrderCompletePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center px-4 py-8 h-screen">
      <div className="flex flex-col items-center gap-3 sm:gap-4 text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <Check className="bg-primary-500 size-16 rounded-full text-white p-3" />
        <p className="typography-h6-regular font-semibold">
          Your Order is complete!{" "}
        </p>
        <p className="typography-extra-large-body">
          You will be receiving a confirmation email with order details.{" "}
        </p>
        <Link href="/">
          <div className="mt-4 typography-sub-h3 font-medium text-primary-500 border border-primary-500 rounded-[50px] px-7 py-3">
            Go to the Homepage
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OrderCompletePage;

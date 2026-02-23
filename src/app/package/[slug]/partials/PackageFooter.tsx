"use client";

import { useModal } from "@/core/context/ModalContext";
import { showErrorMessage } from "@/utils/toastMessage/toast.message";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo } from "react";

const PackageFooter = ({ price }: { price: string }) => {
  const { status } = useSession();
  const { openModal } = useModal();
  const isLoggedIn = status === "authenticated";

  const { totalPrice, taxAmount } = useMemo(() => {
    const basePrice = parseFloat(price.replace(/,/g, "")) || 0;
    const tax = basePrice * 0.13;
    return {
      taxAmount: tax.toLocaleString(),
      totalPrice: Math.floor(basePrice + tax).toLocaleString(),
    };
  }, [price]);

  const handleNotLoggedIn = () => {
    openModal("login");
    showErrorMessage("Please login to access this feature.");
  };

  const formatCurrency = (num: number) =>
    `${num.toLocaleString("en-NP", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const ButtonContent = () => (
    <button className="bg-primary-500 px-8 py-2.5 text-white rounded-md font-bold hover:bg-primary-600 transition-all cursor-pointer shadow-lg shadow-primary-500/20 active:scale-95">
      Book Now
    </button>
  );

  return (
    <div className="sticky bottom-4 z-20 bg-white flex items-center justify-between py-4 max-w-2xl mx-auto px-8 rounded-xl border border-gray-200">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1 font-bold">
          <span className="text-base font-bold text-gray-500">NPR</span>
          <span className="font-black text-gray-900 text-3xl">
            {formatCurrency(parseFloat(totalPrice.replace(/,/g, "")))}
          </span>
        </div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Inc. 13% VAT (NPR{" "}
          {formatCurrency(parseFloat(taxAmount.replace(/,/g, "")))})
        </p>
      </div>

      {isLoggedIn ? (
        <Link href="/user/book/1">
          <ButtonContent />
        </Link>
      ) : (
        <div onClick={handleNotLoggedIn}>
          <ButtonContent />
        </div>
      )}
    </div>
  );
};

export default PackageFooter;

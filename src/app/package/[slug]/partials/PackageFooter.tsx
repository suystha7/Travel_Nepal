"use client";
import { useModal } from "@/core/context/ModalContext";
import { showErrorMessage } from "@/utils/toastMessage/toast.message";
import { useSession } from "next-auth/react";
import Link from "next/link";

const PackageFooter = ({ price }: { price: string }) => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const { openModal } = useModal();

  const handleNotLoggedIn = () => {
    openModal("login");
    showErrorMessage("Please login to access this feature.");
  };

  return (
    <>
      <div className="sticky bottom-4 z-20 bg-white flex items-center justify-between shadow-md py-5 max-w-2xl mx-auto px-6 rounded-3xl">
        <p className="typography-h6-regular font-medium">NRP {price}|-</p>
        {isLoggedIn ? (
          <Link href="/user/book/1">
            <button className="bg-primary-500 px-6 py-2 text-white rounded-md typography-sub-h3-light hover:bg-primary-400 cursor-pointer">
              Book Now
            </button>
          </Link>
        ) : (
          <div
            onClick={handleNotLoggedIn}
            className="bg-primary-500 px-6 py-2 text-white rounded-md typography-sub-h3-light hover:bg-primary-400 cursor-pointer"
          >
            Book Now
          </div>
        )}
      </div>
    </>
  );
};

export default PackageFooter;

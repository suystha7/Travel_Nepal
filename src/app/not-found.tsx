import Image from "next/image";
import notFound from "@/assest/notFound.png";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center px-4 h-screen">
      <div className="flex flex-col items-center gap-3 sm:gap-4 text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <Image
          src={notFound}
          alt="No Tickets"
          width={500}
          height={500}
          className="w-40 sm:w-56 md:w-72 lg:w-96 h-auto object-contain"
        />
        <p className="typography-h3-regular text-grey-800 ">Page Not Found </p>
        <p className="typography-extra-large-body font-light text-grey-600 ">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        <Link href="/">
          <div className="mt-4 typography-mid-body bg-primary-500 border text-white rounded-[50px] px-7 py-3">
            Home Page
          </div>
        </Link>
      </div>
    </div>
  );
}

import Image from "next/image";
import React from "react";
import emptyTicket from "@/assest/emptyTicket.png";

const EmptyTicketPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="flex flex-col items-center gap-3 sm:gap-4 text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <Image
          src={emptyTicket}
          alt="No Tickets"
          width={500}
          height={500}
          className="w-40 sm:w-56 md:w-72 lg:w-96 h-auto object-contain"
        />
        <p className="typography-sub-h1-regular font-light text-grey-500 text-sm sm:text-base md:text-lg lg:text-xl">
          You don&apos;t have any tickets yet. Start planning your next trip!
        </p>
      </div>
    </div>
  );
};

export default EmptyTicketPage;

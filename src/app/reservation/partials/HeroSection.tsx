import Image from "next/image";
import React from "react";
import reservationHero from "@/assest/reservationHero.png";
import { CalendarRange, Users } from "lucide-react";

const reservationTypes = [
  { title: "Hotel Booking", icon: CalendarRange },
  { title: "Car Rental", icon: CalendarRange },
  { title: "Tour Packages", icon: Users },
  { title: "Flight Booking", icon: Users },
];

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={reservationHero}
        alt="Reservations Hero Image"
        fill
        className="object-cover"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            {/* Left/Text column */}
            <div className="w-full lg:w-1/2 text-white">
              <h2 className="typography-h3-regular font-medium mb-2 text-2xl sm:text-3xl md:text-4xl">
                Your Smooth Travels
              </h2>

              <p className="typography-h2-light font-semibold mb-4 text-2xl sm:text-3xl md:text-4xl">
                Start Here
              </p>

              <p className="typography-extra-large-body my-6 sm:my-8 text-base sm:text-lg md:text-xl leading-relaxed w-full sm:w-11/12">
                Rent your perfect car and enjoy a smooth ride to your
                destination. Choose from our wide selection of vehicles.
              </p>

              <div className="mt-6 sm:mt-8">
                <div className="typography-extra-large-body text-white bg-grey-700 inline-block px-8 py-3 rounded-full shadow-md">
                  Need any Reservation for your trip?
                  <p className="typography-h6-regular font-bold ml-2">
                    Contact Us!
                  </p>
                </div>
              </div>
            </div>

            {/* Right/Types column */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {reservationTypes.map((type) => (
                  <div key={type.title} className="flex">
                    <div className="bg-white/80 inline-flex gap-2 typography-sub-h2-regular rounded-3xl shadow-[0px_4px_4px_0px_#00000057] items-center justify-center px-4 py-2 m-1 text-black w-full">
                      <type.icon className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-sm sm:text-base">{type.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

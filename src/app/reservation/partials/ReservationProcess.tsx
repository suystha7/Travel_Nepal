// import React from "react";
// import { getStaticData } from "@/core/api/fetch";
// import PatientHeader from "./ReservationTabs";
// import ReservationTabs from "./ReservationTabs";
// // import { getReservationData } from "../hooks/useGetReservation";
// // import { usePathname, useSearchParams } from "next/navigation";
// // import { useRouter } from "next/router";

// const reservationProcess = [
//   "Once you've confirmed the arrival dates for your package, please notify the designated executive. They will send you an email containing all the necessary details, including our account number and a link to make your advance payment on our website. We accept all major credit and debit cards, though please note there is a 2.5% fee for card transactions. Your advance reservation will be activated upon payment.",
//   "We will check the availability of your selected hotels and inform you if any are unavailable, offering alternative options along with the price differences. After your reservation is confirmed, you will receive a hotel voucher. This process typically takes one to two weeks, as we need to secure email confirmation from the hotel before issuing the voucher.",
//   "Cab details will be sent via SMS one day prior to your arrival. For pickups in Cochin, you will be greeted and transported to our customer relationship center, where we will discuss your package, clarify all commitments, and collect the remaining balance.",
//   "This personal touch ensures a smoother experience and fosters better relationships. You can settle your balance using cash, debit card, credit card, or bank transfer; please note that we do not accept cheques.",
//   "If you prefer not to meet us or if your flight does not land in Cochin, please inform us in advance and complete your payment before your arrival. We are here to assist you with everything you need during your visit.",
// ];

// const ReservationProcess = async () => {
//   const reservationTypes = [
//     { name: "Air Ticket", type: "air_ticket", data: "air_ticket" },
//     { name: "Car Booking", type: "car_booking", data: "car_booking" },
//     { name: "Hotel Booking", type: "hotel_booking", data: "hotel_booking" },
//     {
//       name: "Holiday Booking",
//       type: "holiday_booking",
//       data: "holiday_booking",
//     },
//   ];
//   // const searchParams = useSearchParams();
//   // const pathname = usePathname();
//   // const router = useRouter();

//   // const handleClick = (tabId: string) => {
//   //   const params = new URLSearchParams(searchParams.toString());
//   //   params.set("patient-tab", tabId);
//   //   const query = params.toString();
//   //   router.push(`${pathname}${query ? `?${query}` : ""}`);
//   // };

//   const params = "?type=holiday_booking";

//   const reservationData = await getStaticData(`/reservation${params}`);
//   console.log(reservationData);

//   // <ReservationTabs />;
//   // const { reservationData } = await getReservationData();
//   return (
//     <div className="padding-x mt-[50rem]">
//       <h1 className="typography-h5-semibold text-primary-500 text-center">
//         Reservation Process
//       </h1>
//       {/* <PatientHeader /> */}
//       <div className="flex flex-wrap justify-center items-center gap-10 my-14">
//         {reservationTypes.map((type, index) => (
//           <div key={index} className="flex items-center justify-center">
//             <h2 className="typography-sub-h3 mb-0">{type.name}</h2>
//           </div>
//         ))}
//       </div>

//       {reservationProcess.map((step, index) => (
//         <div key={index} className="mt-4">
//           <p className="typography-large-body font-light text-center text-grey-600">
//             {step}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReservationProcess;
"use client";
import ReservationContent from "./ReservationContent";
import ReservationTabs from "./ReservationTabs";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// import ReservationContent from "./ReservationContent";

interface ReservationPageProps {
  dataByType: any;
}

export default function ReservationPage({ dataByType }: ReservationPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeTab = searchParams.get("type") ?? "air_ticket";

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", tabId);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="padding-x mt-[10rem]">
      <h1 className="text-center typography-h5-semibold font-bold text-primary-500">
        Reservation Process
      </h1>

      <ReservationTabs activeTab={activeTab} onChange={handleTabChange} />

      <ReservationContent activeTab={activeTab} dataByType={dataByType} />
    </div>
  );
}

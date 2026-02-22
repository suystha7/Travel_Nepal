import React from "react";
import HeroSection from "./partials/HeroSection";
import ReservationProcess from "./partials/ReservationProcess";
import FAQs from "../contact-us/partials/FAQs";
import GetInTouch from "../contact-us/partials/GetInTouch";
import SendUsMessage from "../contact-us/partials/SendUsMessage";
import { getContactUsData } from "../contact-us/hooks/useGetContactUsData";
import { getOrgData } from "../../core/hooks/useGetOrgData";
import { endpoints } from "@/core/api/endpoints";
import { getStaticData } from "@/core/api/fetch";
import { ISeoResponse } from "@/interface/seoResponse";
import { createMetadata } from "@/utils/createMetadata";
import { getReservationData } from "./hooks/useGetReservation";

export async function generateMetadata() {
  try {
    const response = await getStaticData<ISeoResponse>(
      endpoints.SEO.RESERVATION
    );
    const seoRecord = response?.data?.records?.[0] ?? null;
    return createMetadata(seoRecord);
  } catch (error) {
    return createMetadata(null);
  }
}

const Page = async () => {
  const results = await Promise.allSettled([
    getContactUsData(),
    getOrgData(),
    getReservationData(),
  ]);

  const contactData =
    results[0].status === "fulfilled" ? results[0].value : null;
  const orgResponse =
    results[1].status === "fulfilled" ? results[1].value : null;
  const reservationData =
    results[2].status === "fulfilled" ? results[2].value : null;

  const faqs = contactData?.faqData?.data?.records ?? [];
  const orgInfo = orgResponse?.orgData?.data ?? null;
  const reservationContent = reservationData?.dataByType ?? null;

  return (
    <div>
      <HeroSection />
      <ReservationProcess dataByType={reservationContent} />

      {/* Visual representation of the booking/reservation flow */}

      {/* <FAQs faqData={faqs} /> */}

      <div className="padding-x my-[6rem] flex flex-col md:flex-row justify-between gap-32">
        <div className="w-full md:w-1/2 md:m-10">
          <SendUsMessage />
        </div>
        <div className="w-full md:w-1/2 md:mx-16">
          <GetInTouch organization={orgInfo} />
        </div>
      </div>
    </div>
  );
};

export default Page;

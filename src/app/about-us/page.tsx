import React from "react";
import AboutHero from "./partials/AboutHero";
import AboutUsDescription from "./partials/AboutUsDescription";
import { getAboutUsData } from "./hooks/useGetAboutUsData";
import { endpoints } from "@/core/api/endpoints";
import { getStaticData } from "@/core/api/fetch";
import { ISeoResponse } from "@/interface/seoResponse";
import { createMetadata } from "@/utils/createMetadata";
import Stats from "./partials/Stats";
import WhyUs from "./partials/WhyUs";
import MissionVision from "./partials/MissionVision";
import Review from "./partials/Review";

export async function generateMetadata() {
  const { data } = await getStaticData<ISeoResponse>(endpoints.SEO.ABOUT_US);
  const seoRecord = data?.records?.[0] ?? null;
  return createMetadata(seoRecord);
}

const Page = async () => {
  try {
    const {
      aboutUsData,
      aboutUsHero,
      missionVisionData,
      whyUsData,
      testimonialsData,
    } = await getAboutUsData();

    return (
      <main>
        <AboutHero aboutHero={aboutUsHero?.data?.records ?? []} />

        <AboutUsDescription aboutUsData={aboutUsData?.data} />

        <Stats aboutUsStats={aboutUsData?.data?.stats} />

        <MissionVision
          missionVisionData={missionVisionData?.data?.mission_vision}
        />

        <WhyUs whyUsData={whyUsData?.data?.why_us} />

        <Review testimonialsData={testimonialsData?.data?.records ?? []} />
      </main>
    );
  } catch (error) {
    console.error("Failed to load About Us page:", error);
    return (  
      <div className="min-h-[60vh] flex items-center justify-center typography-h3-regular text-primary-500 border-t border-b">
        Something went wrong while loading the page.
      </div>
    );
  }
};

export default Page;

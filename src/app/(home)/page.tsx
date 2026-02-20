import TopDeals from "./partials/TopDeals";
import TopTours from "./partials/TopTours";
import WhoWeAre from "./partials/WhoWeAre";
import HomeHero from "./partials/HomeHero";
import { getAboutUsData } from "../about-us/hooks/useGetAboutUsData";
import { getHomeData } from "./hooks/useGetHomeData";
import { endpoints } from "@/core/api/endpoints";
import { getStaticData } from "@/core/api/fetch";
import { ISeoResponse } from "@/interface/seoResponse";
import { createMetadata } from "@/utils/createMetadata";

export async function generateMetadata() {
  const { data } = await getStaticData<ISeoResponse>(endpoints.SEO.HOME);
  const seoRecord = data?.records?.[0] ?? null;
  const meta = createMetadata(seoRecord);
  return meta;
}
const Page = async () => {
  try {
    const { isTopDeal, isTopTour, getCities, homeData } = await getHomeData();
    const { aboutUsData, testimonialsData } = await getAboutUsData();

    return (
      <div className="">
        <HomeHero
          city={getCities?.data?.records}
          heroData={homeData?.data?.records}
        />
        <WhoWeAre
          whoWeAreData={aboutUsData?.data?.who_we_are}
          stats={aboutUsData?.data?.stats}
          testimonialData={testimonialsData?.data?.records ?? []}
        />
        <TopDeals topDeals={isTopDeal?.data?.records} />
        <TopTours topTours={isTopTour?.data?.records} />
      </div>
    );
  } catch (error) {
    console.error("Error loading home page data:", error);
    return (
      <div className="min-h-[60vh] flex items-center justify-center typography-h3-regular text-primary-500 border-t border-b">
        Error loading home page data!!
      </div>
    );
  }
};

export default Page;

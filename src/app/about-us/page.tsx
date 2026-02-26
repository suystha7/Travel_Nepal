import { getAboutUsData } from "./hooks/useGetAboutUsData";
import AboutHero from "./partials/AboutHero";
import AboutUsDescription from "./partials/AboutUsDescription";
import MissionVision from "./partials/MissionVision";
import Review from "./partials/Review";
import Stats from "./partials/Stats";
import WhyUs from "./partials/WhyUs";

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
      <main className="overflow-x-hidden">
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

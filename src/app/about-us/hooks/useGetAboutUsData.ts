import { endpoints } from "@/core/api/endpoints";
import { safeFetch } from "@/utils/safeFetch";

export const getAboutUsData = async () => {
  const aboutUsHero = await safeFetch(endpoints.BREADCRUMB.ABOUT_US);
  const aboutUsData = await safeFetch(endpoints.ABOUT.ABOUT_US);
  const whyUsData = await safeFetch(endpoints.ABOUT.ABOUT_US);
  const missionVisionData = await safeFetch(endpoints.ABOUT.ABOUT_US);
  const testimonialsData = await safeFetch(endpoints.ABOUT.TESTIMONIAL);
  const teamData = await safeFetch(endpoints.ABOUT.TEAM);
  return {
    aboutUsHero,
    aboutUsData,
    testimonialsData,
    teamData,
    missionVisionData,
    whyUsData,
  };
};

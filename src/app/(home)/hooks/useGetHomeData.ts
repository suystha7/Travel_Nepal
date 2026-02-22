import { endpoints } from "@/core/api/endpoints";
// import { getStaticData } from "@/core/api/fetch";
import { safeFetch } from "@/utils/safeFetch";

export const getHomeData = async () => {
  const homeData = await safeFetch(endpoints.BREADCRUMB.HOME);
  const isTopTour = await safeFetch(endpoints.TOP_TOUR);
  const isTopDeal = await safeFetch(endpoints.TOP_DEAL);

  const getCities = await safeFetch(endpoints.PACKAGE.CITY);
  return { homeData, isTopTour, isTopDeal, getCities };
};

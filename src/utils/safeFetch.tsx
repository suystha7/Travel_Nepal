import { getStaticData } from "@/core/api/fetch";

export const safeFetch = async (endpoint: string) => {
  try {
    return await getStaticData(endpoint);
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error);
    return null;
  }
};

// import { endpoints } from "@/core/api/endpoints";
// import { getStaticData } from "@/core/api/fetch";

// export const getHomePageData = async () => {
//   const safeFetch = async (endpoint: string) => {
//     try {
//       return await getStaticData(endpoint);
//     } catch (error) {
//       console.error(`Failed to fetch data from ${endpoint}:`, error);
//       return null;
//     }
//   };

//   const homedata = await safeFetch(endpoints.ABOUT_US);
//     const whatweOfferData = await safeFetch(endpoints.SERVICE);
//     const howWeWorkData = await safeFetch(endpoints.HOW_WORKS);
//     const expertsData = await safeFetch(endpoints.EXPERTS);
//     const blogData = await safeFetch(endpoints.BLOG);
//     const showcaseData = await safeFetch(endpoints.STATS);
//     const testimonialData = await safeFetch(endpoints.SUCESS_STORY);
//     const homeGalleryData = await safeFetch(endpoints.HOME_GALLERY);
//     const footerData = await safeFetch(endpoints.SETTING);
//     const locationData = await safeFetch(endpoints.CENTER);
//   return {
//     homedata,
//     whatweOfferData,
//     howWeWorkData,
//     expertsData,
//     blogData,
//     showcaseData,
//     testimonialData,
//     homeGalleryData,
//     footerData,
//     locationData,
//   };
// };

// import { getCategories } from "@/core/hooks/useGetCategories";
// import { buildDynamicMenu } from "./dynamicMenus";
// import { getPackageData } from "@/app/package/[slug]/hooks/useGetPackageData";

// const { packageType } = await getCategories();
// const packageData = await getPackageData();

// const dynamicMenu = buildDynamicMenu({
//   packageType: packageType?.data?.records || [],
//   packages: packageData?.data?.records || [],
// });

// export const PATH = {
//   HOME: "/",

//   MENUS: {
//     HOME: "/",
//     ...dynamicMenu,
//     // NATIONAL_TOURS: {
//     //   EVEREST_REGION: {
//     //     EVEREST_BASE_CAMP_ADVENTURE_15_DAYS: "",
//     //     EVEREST_BASE_CAMP_EXPEDITION: "",
//     //     EVEREST_BASE_CAMP_JOURNEY: "",
//     //     EVEREST_BASE_CAMP_TREKKING_TOUR: "",
//     //     EVEREST_BASE_CAMP_TREKKING_EXPLORATION: "",
//     //   },
//     //   KANCHANJUNGA_REGION: {
//     //     KANCHANJUNGA_BASE_CAMP_TREK: "",
//     //     KANCHANJUNGA_CIRCUIT_TREK: "",
//     //   },
//     //   ANNAPURNA_REGION: {
//     //     ANNAPURNA_BASE_CAMP_TREK: "",
//     //     ANNAPURNA_CIRCUIT_TREK: "",
//     //     ANNAPURNA_SANCTUARY_TREK: "",
//     //     GHT_TREK: "",
//     //   },
//     //   LANGTANG_REGION: {
//     //     LANGTANG_VALLEY_TREK: "",
//     //     LANGTANG_GOSAINKUNDA_TREK: "",
//     //   },
//     //   MAKALU_REGION: {
//     //     MAKALU_BASE_CAMP_TREK: "",
//     //   },
//     //   EASTERN_REGION: {
//     //     SINGALILA_RIDGE_TREK: "",
//     //     TAMANG_HERITAGE_TREK: "",
//     //   },
//     //   WESTERN_REGION: {
//     //     RARA_LAKE_TREK: "",
//     //   },
//     // },
//     // INTERNATIONAL_TOURS: {
//     //   THAILAND: "/international-tours/thailand",
//     //   MALDIVES: "/international-tours/maldives",
//     // },
//     PACKAGES: "/package",
//     ABOUT_US: "/about-us",
//     BLOG: "/blog",
//     CONTACT_US: "/contact-us",
//   },
// };

import { endpoints } from "@/core/api/endpoints";
import { getStaticData } from "@/core/api/fetch";

// export const getPackageData = async () => {
//   const PackageData = await getStaticData(`${endpoints.PACKAGE.LIST}`);

//   return PackageData;
// };
export const getPackageData = async (search = "") => {
  const url = search
    ? `${endpoints.PACKAGE.LIST}?search=${encodeURIComponent(search)}`
    : `${endpoints.PACKAGE.LIST}`;

  const packageData = await getStaticData(url);

  return packageData;
};

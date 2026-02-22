// import { endpoints } from "@/core/api/endpoints";
// import { getStaticData } from "@/core/api/fetch";

// export const getPackageData = async () => {
//   const PackageData = await getStaticData(endpoints.PACKAGE.LIST);

//   return PackageData;
// };
// import { endpoints } from "@/core/api/endpoints";
// import { getStaticData } from "@/core/api/fetch";

// export const getPackageData = async (
//   page?: number,
//   perPage?: number,
//   search?: string
// ) => {
//   const url = new URL(endpoints.PACKAGE.LIST);

//   if (page !== undefined) url.searchParams.set("page", page.toString());
//   if (perPage !== undefined)
//     url.searchParams.set("perPage", perPage.toString());

//   if (search) url.searchParams.set("search", search);

//   const data = await getStaticData(url.toString());
//   return data;
// };
import { endpoints } from "@/core/api/endpoints";
import { getStaticData } from "@/core/api/fetch";

export const getPackageData = async (
  search = "",
  page: number = 1,
  page_size: number = 10,
  min_price?: number,
  max_price?: number,
  max_rating?: number,
  min_rating?: number,
  duration?: number,
  package_type?: string,
  country?: string,
  start_date?: string,
  end_date?: string
) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (page) params.append("p", page.toString());
  if (page_size) params.append("page_size", page_size.toString());
  if (min_price !== undefined) params.append("min_price", min_price.toString());
  if (max_price !== undefined) params.append("max_price", max_price.toString());
  if (duration !== undefined) params.append("duration", duration.toString());
  if (package_type !== undefined) params.append("package_type", package_type);
  if (country !== undefined) params.append("country", country);
  if (start_date !== undefined) params.append("start_date", start_date);
  if (end_date !== undefined) params.append("end_date", end_date);

  if (min_rating !== undefined)
    params.append("min_rating", min_rating.toString());
  if (max_rating !== undefined)
    params.append("max_rating", max_rating.toString());

  const url = `${endpoints.PACKAGE.LIST}?${params.toString()}`;

  const packageData = await getStaticData(url);

  return packageData;
};

import { safeFetch } from "@/utils/safeFetch";

export const getCategories = async () => {
  const packageType = await safeFetch("/package-type");
  const categoryData = await safeFetch("/package-category");
  const countryData = await safeFetch("/country");

  return { categoryData, packageType, countryData };
};

import { endpoints } from "@/core/api/endpoints";
import { getStaticData } from "@/core/api/fetch";

export const getPackageByCategory = async (
  slug: string,
  search = "",
  page: number = 1,
  page_size: number = 10
) => {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  params.set("p", String(page));
  params.set("page_size", String(page_size));

  const url = `${endpoints.PACKAGE.BY_CATEGORY}${slug}?${params.toString()}`;

  return await getStaticData(url);
};

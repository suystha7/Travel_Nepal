import { endpoints } from "@/core/api/endpoints";
// import { getStaticData } from "@/core/api/fetch";
import { safeFetch } from "@/utils/safeFetch";

export const getBlogData = async () => {
  const blogData = await safeFetch(endpoints.BREADCRUMB.BLOG);

  const blogs = await safeFetch(endpoints.BLOG.LIST);

  return { blogData, blogs };
};

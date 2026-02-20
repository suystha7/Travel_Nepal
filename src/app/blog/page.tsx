import React from "react";
import BlogHero from "./partials/BlogHero";
import Blog from "./partials/Blog";
import { getBlogData } from "./hooks/useGetBlogData";
import { endpoints } from "@/core/api/endpoints";
import { getStaticData } from "@/core/api/fetch";
import { ISeoResponse } from "@/interface/seoResponse";
import { createMetadata } from "@/utils/createMetadata";

export async function generateMetadata() {
  const { data } = await getStaticData<ISeoResponse>(endpoints.SEO.BLOG);
  const seoRecord = data?.records?.[0] ?? null;
  const meta = createMetadata(seoRecord);
  return meta;
}

const Page = async () => {
  try {
    const { blogData, blogs } = await getBlogData();

    return (
      <div>
        <BlogHero blogHero={blogData?.data?.records} />

        <Blog blog={blogs?.data?.records} />
      </div>
    );
  } catch (error) {
    console.error("Error loading blog page data:", error);
    return (
      <div className="min-h-[60vh] flex items-center justify-center typography-h3-regular text-primary-500 border-t border-b">
        Error loading blog page data!!
      </div>
    );
  }
};

export default Page;

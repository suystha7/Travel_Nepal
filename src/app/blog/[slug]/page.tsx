import React from "react";
import { getStaticData } from "@/core/api/fetch";
import RelatedArticles from "./partials/RelatedArticles";
import BlogDetails from "./partials/BlogDetails";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const blogDetailsData = await getStaticData(`/blog/${slug}`);
  const blogData = await getStaticData("/blog");

  console.log("blog", blogDetailsData?.data?.records);

  return (
    <>
      <BlogDetails blogDetailsData={blogDetailsData?.data} />
      <RelatedArticles relatedBlogs={blogData?.data?.records || []} />
    </>
  );
};

export default page;

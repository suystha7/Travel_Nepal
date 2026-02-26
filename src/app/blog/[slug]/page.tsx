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

  return (
    <>
      <BlogDetails blogDetailsData={blogDetailsData?.data} />
      <RelatedArticles
        relatedBlogs={blogDetailsData?.data?.related_blogs || []}
      />
    </>
  );
};

export default page;

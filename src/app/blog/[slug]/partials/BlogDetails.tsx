"use client";

import React, { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { IBlogRecord } from "../../interface/IBlogInterface";
import BlogHero from "./BlogHero";
import BlogStats from "./BlogStats";
import BlogTOC from "./BlogTOC";
import RichText from "@/utils/richText";

const BlogDetails = ({ blogDetailsData }: { blogDetailsData: IBlogRecord }) => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [active, setActive] = useState(0);
  const [localLikeCount, setLocalLikeCount] = useState(
    blogDetailsData?.like || 0
  );
  const [isLiked, setIsLiked] = useState(false);

  const imageGallery = blogDetailsData?.blog_images || [];

  const handleLikeToggle = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLocalLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));

    try {
      await fetch(`/api/blogs/${blogDetailsData.id}/like`, { method: "POST" });
    } catch (error) {
      setIsLiked(!newLikedState);
      setLocalLikeCount((prev) => (!newLikedState ? prev + 1 : prev - 1));
    }
  };

  const { processedContent, tocItems } = useMemo(() => {
    const rawHtml = blogDetailsData?.description || "";
    const items: string[] = [];
    let count = 0;

    const htmlWithIds = rawHtml.replace(
      /<(b|strong|h[1-6])([^>]*)>(.*?)<\/\1>/gi,
      (match, tag, attrs, content) => {
        const text = content.replace(/<[^>]+>/g, "").trim();
        if (text) {
          const id = `section-${count++}`;
          items.push(text);
          return `<${tag}${attrs} id="${id}" class="scroll-mt-32">${content}</${tag}>`;
        }
        return match;
      }
    );

    return { processedContent: htmlWithIds, tocItems: items };
  }, [blogDetailsData?.description]);

  return (
    <main className="bg-white min-h-screen">
      <BlogHero
        blog={blogDetailsData}
        activeImageIndex={active}
        setActive={setActive}
        gallery={imageGallery}
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 py-20">
        <article className="lg:col-span-8 overflow-hidden">
          <RichText
            content={processedContent}
            className="prose prose-slate max-w-none 
              prose-headings:font-bold prose-headings:text-slate-900 
              prose-p:text-slate-700 prose-p:leading-8 
              prose-img:rounded-2xl prose-a:text-primary-600 hover:prose-a:text-primary-500"
          />
        </article>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-8">
            <BlogStats
              id={blogDetailsData?.blog_slug || ""}
              title={blogDetailsData?.title || "Blog Post"}
              likes={localLikeCount}
              views={blogDetailsData?.views || 0}
              isLiked={isLiked}
              isLoggedIn={isLoggedIn}
              onLikeToggle={handleLikeToggle}
            />
            {tocItems.length > 0 && <BlogTOC items={tocItems} />}
          </div>
        </aside>
      </div>
    </main>
  );
};

export default BlogDetails;

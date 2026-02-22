import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import { IBlogRecord } from "../interface/IBlogInterface";
import RichText from "@/utils/richText";
import { BlogCard } from "./BlogCard";

interface BlogProps {
  blog: IBlogRecord[];
}

const Blog: React.FC<BlogProps> = ({ blog }) => {
  const displayLimit = 12;
  const hasMore = blog.length > displayLimit;
  const visibleBlogs = blog.slice(0, displayLimit);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
          {visibleBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-16">
            <Link
              href="/blog"
              className="group relative h-14 px-10 flex items-center justify-center bg-gray-900 rounded-full overflow-hidden transition-all duration-300 hover:ring-4 hover:ring-gray-100"
            >
              <div className="relative z-10 flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest">
                <span>See More</span>
              </div>
              <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Blog);

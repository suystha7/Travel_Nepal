import Image from "next/image";
import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import { IBlogRecord } from "../interface/IBlogInterface";
import RichText from "@/utils/richText";
import BlogImage from "@/assest/blog1.png";

interface BlogCardProps {
  blog: IBlogRecord;
}

export const BlogCard = ({ blog }: BlogCardProps) => (
  <Link
    href={`/blog/${blog.blog_slug}`}
    className="group flex flex-col h-full bg-white transition-all duration-300"
  >
    <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
      <Image
        src={blog.image || BlogImage}
        alt={blog.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute top-4 left-4 z-10">
        <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white shadow-sm font-bold tracking-wider">
          {blog.category || "General"}
        </span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-white shadow-sm">
          <Eye size={16} className="text-white" />
          <span className="text-xs font-bold">{blog.views || 0}</span>
        </div>
        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-white shadow-sm">
          <Heart size={16} className="text-white" />
          <span className="text-xs font-bold">{blog.like || 0}</span>
        </div>
      </div>
    </div>

    <div className="flex flex-col grow border-x border-b border-gray-100 p-6 rounded-b-2xl shadow-sm group-hover:shadow-md transition-shadow">
      <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-1">
        {blog.title}
      </h3>

      <div className="grow">
        <RichText
          content={blog.description || "No description available."}
          className="text-gray-600 text-sm line-clamp-3 leading-relaxed"
        />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-sm font-bold text-primary-500">
          By {blog?.author || "Staff"}
        </span>

        <time className="text-sm font-bold text-primary-500">
          {new Date(blog.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>
    </div>
  </Link>
);

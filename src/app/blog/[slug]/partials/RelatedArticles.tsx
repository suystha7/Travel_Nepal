import React from "react";
import { BlogCard } from "../../partials/BlogCard";
import { IBlogRecord } from "../../interface/IBlogInterface";

interface RelatedArticlesProps {
  relatedBlogs: IBlogRecord[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ relatedBlogs }) => {
  if (!relatedBlogs || relatedBlogs.length === 0) return null;

  return (
    <div className="border-t">
      <div className="py-10 max-w-7xl mx-auto">
        <p className="typography-h6-regular font-bold mb-10 px-4 md:px-0">
          Related Blogs
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedBlogs.slice(0, 5).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedArticles;

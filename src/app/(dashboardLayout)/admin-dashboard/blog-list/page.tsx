/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetblogQuery } from "@/redux/features/blog/blogApi";
import BlogCard, { BlogCardProps } from "../components/BlogCard";

const BlogList = () => {
  const { data } = useGetblogQuery({});
  const BlogData = data?.data?.result || [];

  return (
    <section className="py-16" id="blogs">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Latest Blog Posts
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BlogData.map((blog: BlogCardProps) => (
            <BlogCard key={blog?._id} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;

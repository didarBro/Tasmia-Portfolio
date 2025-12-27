import React, { useState } from "react";
import BlogCard from "./BlogCard";
import { useGetblogQuery } from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types/blog.types";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

const BlogSection: React.FC = () => {
  const { data, isLoading } = useGetblogQuery({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const blogs = data?.data?.result || [];

  // Sample categories - replace with your actual categories
  const categories = ["All", "Development", "Design", "DevOps", "Career"];

  const filteredBlogs = blogs.filter((blog: TBlog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || blog.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 "
      id="blogs"
    >
      <div className="mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-5 font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
            Exploring the World of Blogs
          </h2>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/50  border-slate-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-slate-200"
              />
              <Search
                className="absolute left-3 top-2.5 text-slate-400"
                size={18}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0  flex-nowrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-green-500 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl text-slate-400 mb-4">
              No matching blog posts found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 "
          >
            {filteredBlogs.map((blog: TBlog) => (
              <BlogCard
                key={blog?._id}
                {...blog}
                readTime={`${Math.ceil(
                  blog.description.length / 800
                )} min read`}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;

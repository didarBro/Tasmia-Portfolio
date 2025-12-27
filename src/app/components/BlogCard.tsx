import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  _id?: string;
  title: string;
  description: string;
  date: string;
  img: string;
  readTime?: string;
  category?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  _id,
  title,
  description,
  date,
  img,
  readTime = "5 min read",
  category = "Development",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-slate-800/80 backdrop-blur rounded-xl overflow-hidden shadow-lg text-slate-200 border border-slate-700/50 h-full flex flex-col"
    >
      <div className="relative overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <Image
            className="w-full h-64 object-cover"
            height={400}
            width={600}
            src={img}
            alt={title}
          />
          <div className="absolute top-4 right-4">
            <span className="bg-green-500/90 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              {category}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-sm text-slate-400 mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{readTime}</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-3 text-slate-100 line-clamp-2 hover:text-green-400 transition-colors">
          {title}
        </h3>

        <p className="mb-4 text-slate-400 line-clamp-3">{description}</p>

        <div className="mt-auto">
          <Link
            href={`/blog/${_id}`}
            className="inline-flex items-center text-green-400 font-medium hover:text-green-300 transition-colors group"
          >
            Read more
            <ArrowRight
              size={16}
              className="ml-1 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;

"use client";

import { useGetSingleblogQuery } from "@/redux/features/blog/blogApi";
import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleblogQuery(id);

  const { title, description, date, img } = data?.data || {};

  return (
    <div>
      <div className="max-w-screen-xl mt-10 mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* Image */}
        {img ? (
          <Image
            className="w-full h-96 object-cover"
            src={img}
            alt={title || "Blog Image"}
            width={800}
            height={800}
          />
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {title || "Untitled Blog"}
          </h2>
          {/* Date */}
          <p className="text-sm text-gray-500 mb-4">
            {date || "No Date Provided"}
          </p>
          {/* Description */}
          <p className="text-gray-700 text-base">
            {description || "No description available for this blog."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

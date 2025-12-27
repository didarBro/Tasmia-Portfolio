"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGetSingleprojectQuery } from "@/redux/features/project/projectApi";
import { useParams } from "next/navigation";
import {
  ExternalLink,
  Github,
  Monitor,
  Code,
  Calendar,
  Cpu,
  Layout,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ProjectDetailsCard = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleprojectQuery(id);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const {
    title,
    description,
    technologies,
    clientCode,
    serverCode,
    liveLink,
    date,
    category,
    type,
    challenges,
    features,
  } = data?.data || {};

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <div className="py-10 px-4 bg-black min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        {/* Hero Section with Live Preview */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-800">
          <div className="relative">
            {/* Preview Image or Iframe */}
            <div className="w-full h-64 md:h-96 lg:h-[500px] overflow-hidden bg-gray-800">
              {liveLink ? (
                <iframe
                  src={liveLink}
                  className="w-full h-full border-none"
                  title={title}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <Layout size={64} className="text-gray-600" />
                </div>
              )}
            </div>

            {/* Live Site Button */}
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-medium px-4 py-2 rounded-lg shadow-lg"
              >
                <Monitor size={18} />
                <span>View Live</span>
              </motion.button>
            </a>
          </div>

          {/* Project Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Left Column - Main Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {title}
                </h1>

                {/* Description with Read More toggle */}
                <div className="mt-4">
                  <div className="text-gray-300 text-lg">
                    {showFullDescription
                      ? description
                      : truncateText(description, 300)}
                  </div>
                  {description && description.length > 300 && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="mt-2 text-green-500 hover:text-green-400 flex items-center gap-1 font-medium"
                    >
                      {showFullDescription ? (
                        <>
                          <span>Read Less</span>
                          <ChevronUp size={18} />
                        </>
                      ) : (
                        <>
                          <span>Read More</span>
                          <ChevronDown size={18} />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                    <Cpu size={20} className="text-green-500" /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies?.map(
                      (tech: string, index: React.Key | null | undefined) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-800 text-gray-200 border border-gray-700 rounded-full text-sm font-medium"
                        >
                          {tech.trim()}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Key Features */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                    <Layout size={20} className="text-green-500" /> Key Features
                  </h3>
                  <div className="text-gray-300">{features}</div>
                </div>
              </div>

              {/* Right Column - Project Details */}
              <div className="md:w-64 lg:w-80 space-y-6 p-6 bg-gray-800 rounded-xl border border-gray-700">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-green-500" />
                      <div>
                        <span className="block text-sm text-gray-400">
                          Completed
                        </span>
                        <span className="font-medium text-white">{date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Briefcase size={18} className="text-green-500" />
                      <div>
                        <span className="block text-sm text-gray-400">
                          Category
                        </span>
                        <span className="font-medium text-white">
                          {category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Code size={18} className="text-green-500" />
                      <div>
                        <span className="block text-sm text-gray-400">
                          Type
                        </span>
                        <span className="font-medium text-white">{type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <a
                    href={clientCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg border border-gray-600"
                    >
                      <Github size={18} />
                      <span>Client Repository</span>
                    </motion.button>
                  </a>

                  <a
                    href={serverCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg border border-gray-600"
                    >
                      <Github size={18} />
                      <span>Server Repository</span>
                    </motion.button>
                  </a>

                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-medium py-3 px-4 rounded-lg"
                    >
                      <ExternalLink size={18} />
                      <span>Visit Website</span>
                    </motion.button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Challenges Section */}
        <div className="rounded-xl overflow-hidden shadow-lg bg-gray-900 p-6 md:p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">
            Development Challenges
          </h2>
          <div className="text-gray-300 leading-relaxed">{challenges}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsCard;

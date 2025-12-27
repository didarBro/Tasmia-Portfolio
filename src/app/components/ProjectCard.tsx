import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TProject } from "@/types/types.project";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const ProjectCard = ({ project }: { project: TProject }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <motion.div
      className="mb-12 rounded-xl overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient ring */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>

      <div className="relative flex flex-col md:flex-row border border-gray-700 rounded-xl overflow-hidden bg-gray-900 backdrop-blur-sm shadow-xl">
        {/* Left Side: Live Preview in iframe with gradient overlay */}
        <div
          className="md:w-1/2 h-64 md:h-auto overflow-hidden relative"
          data-aos="fade-right"
        >
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full overflow-hidden relative group"
            >
              <iframe
                src={project.liveLink}
                className="h-full w-full border-none"
                title={project.title}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              ></iframe>

              {/* Overlay with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300"></div>

              {/* Preview label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                <span className="text-sm font-medium text-white">
                  Live Preview
                </span>
              </div>
            </motion.div>
          </a>
        </div>

        {/* Right Side: Content with better spacing and animations */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between relative">
          {/* Animated border line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

          <div data-aos="fade-left" className="mb-6">
            {/* Project title with gradient */}
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              {project.title}
            </h3>

            {/* Description with fade-in effect */}
            <motion.p
              className="text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0.8 }}
            >
              {project.description?.slice(0, 220)}
              {project.description && project.description.length > 220 && "..."}
            </motion.p>

            {/* Technologies with pill style */}
            <div className="mb-6">
              <h4
                className="text-lg font-medium text-white mb-3"
                data-aos="zoom-in"
              >
                Technologies:
              </h4>
              <div
                className="flex flex-wrap gap-2"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1 text-xs font-medium bg-gray-800 text-gray-200 rounded-full border border-gray-700"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons with improved styling and animations */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href={project.clientCode}
              target="_blank"
              rel="noopener noreferrer"
              data-aos="zoom-in-up"
            >
              <motion.button
                className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg flex items-center justify-center gap-1.5 shadow-lg shadow-blue-900/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:block">Client</span>
              </motion.button>
            </Link>

            <Link
              href={project.serverCode}
              target="_blank"
              rel="noopener noreferrer"
              data-aos="zoom-in-up"
              data-aos-delay="100"
            >
              <motion.button
                className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg flex items-center justify-center gap-1.5 shadow-lg shadow-purple-900/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:block">Server</span>
              </motion.button>
            </Link>

            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              data-aos="zoom-in-up"
              data-aos-delay="200"
            >
              <motion.button
                className="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-lg flex items-center justify-center gap-1.5 shadow-lg shadow-green-900/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                <span className="hidden sm:block">Live</span>
              </motion.button>
            </Link>

            <Link
              href={`/project/${project?._id}`}
              data-aos="zoom-in-up"
              data-aos-delay="300"
            >
              <motion.button
                className="w-full px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg flex items-center justify-center gap-1.5 shadow-lg shadow-amber-900/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:block">Details</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  FaBriefcase, 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaChevronDown, 
  FaChevronUp,
  FaInfoCircle
} from "react-icons/fa";

type TimelineItem = {
  id: string;
  type: "work" | "education";
  title: string;
  organization: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string[];
  grade?: string;
  major?: string;
};

const Timeline = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  const timelineData: TimelineItem[] = [
    // Work Experience
    {
      id: "work-1",
      type: "work",
      title: "SQA Engineer",
      organization: "Startsmartz Technologies",
      location: "Dhaka, Bangladesh",
      duration: "Dec 2024 - Present",
      startDate: "2024-12",
      endDate: "present",
      description: [
        "Finding bugs, writing test cases, and distributing work on the planner",
        "Test plan, Test Case Design, and Execution",
        "Load testing and performance testing",
        "Prepare Automated test script with Cypress and Playwright"
      ]
    },
    {
      id: "work-2",
      type: "work",
      title: "Researcher",
      organization: "Advanced Machine Intelligence Research Lab",
      location: "Dhaka, Bangladesh",
      duration: "April 2024 - Present (Part-time)",
      startDate: "2024-04",
      endDate: "present",
      description: [
        "Data Collection for research projects",
        "Document Writing and Research Project Planning",
        "Contributing to machine learning research initiatives"
      ]
    },
    {
      id: "work-3",
      type: "work",
      title: "SQA Intern",
      organization: "Dream71 Bangladesh Ltd",
      location: "Dhaka, Bangladesh",
      duration: "Nov 2023 - March 2024",
      startDate: "2023-11",
      endDate: "2024-03",
      description: [
        "Documentation Analysis and Bug Findings",
        "Test plan, Test Case Design, and Execution",
        "Functional and regression testing of web applications"
      ]
    },
    {
      id: "work-4",
      type: "work",
      title: "Project Coordinator Intern",
      organization: "Battery Low Interactive Limited",
      location: "Dhaka, Bangladesh",
      duration: "July 2023 - October 2023",
      startDate: "2023-07",
      endDate: "2023-10",
      description: [
        "Collaborating with Experienced Game Developers",
        "Assist in Implementing Game Features",
        "Writing Content for Different Gaming Projects"
      ]
    },
    // Education
    {
      id: "edu-1",
      type: "education",
      title: "Bachelor of Science in Computer Science & Engineering",
      organization: "American International University of Bangladesh",
      location: "Dhaka, Bangladesh",
      duration: "2019 - 2023",
      startDate: "2019",
      endDate: "2023",
      description: [
        "Graduated with honors in Computer Science & Engineering",
        "Focused on Software Engineering, Data Structures, and Algorithms",
        "Completed thesis on Deep Learning for Agricultural Applications"
      ],
      grade: "CGPA: 3.26/4.00",
      major: "Computer Science & Engineering"
    },
    {
      id: "edu-2",
      type: "education",
      title: "Higher Secondary Certificate (HSC)",
      organization: "Viqarunnisa Noon School & College",
      location: "Dhaka, Bangladesh",
      duration: "2017 - 2019",
      startDate: "2017",
      endDate: "2019",
      description: [
        "Science Group with excellent academic performance",
        "Focused on Physics, Chemistry, Mathematics, and Biology"
      ],
      grade: "GPA: 4.58/5.00",
      major: "Science"
    },
    {
      id: "edu-3",
      type: "education",
      title: "Secondary School Certificate (SSC)",
      organization: "Viqarunnisa Noon School & College",
      location: "Dhaka, Bangladesh",
      duration: "2015 - 2017",
      startDate: "2015",
      endDate: "2017",
      description: [
        "Science Group with outstanding results",
        "Achieved perfect GPA score"
      ],
      grade: "GPA: 5.00/5.00",
      major: "Science"
    }
  ];

  const toggleItemExpansion = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const descriptionVariants = {
    collapsed: { 
      opacity: 0,
      height: 0,
      marginTop: 0
    },
    expanded: { 
      opacity: 1,
      height: "auto",
      marginTop: "1rem"
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" id="timeline">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
            My Journey
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
            A comprehensive timeline of my educational background and professional experience in Software Quality Assurance
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
            <FaInfoCircle className="text-blue-400" />
            <span className="text-gray-300 text-sm">Click on any item to view detailed information</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 via-blue-500 to-green-400 opacity-30"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const isExpanded = expandedItems.has(item.id);
              
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      onClick={() => toggleItemExpansion(item.id)}
                      className={`cursor-pointer bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border ${
                        item.type === "work" 
                          ? "border-green-500/30 hover:border-green-500/50" 
                          : "border-blue-500/30 hover:border-blue-500/50"
                      } shadow-xl hover:shadow-2xl transition-all duration-300`}
                    >
                      {/* Icon and Type Badge */}
                      <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-full ${
                            item.type === "work"
                              ? "bg-gradient-to-br from-green-400 to-emerald-600"
                              : "bg-gradient-to-br from-blue-400 to-blue-600"
                          } text-white shadow-lg`}
                        >
                          {item.type === "work" ? (
                            <FaBriefcase className="text-xl" />
                          ) : (
                            <FaGraduationCap className="text-xl" />
                          )}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.type === "work"
                              ? "bg-green-900/50 text-green-300"
                              : "bg-blue-900/50 text-blue-300"
                          }`}
                        >
                          {item.type === "work" ? "Work Experience" : "Education"}
                        </span>
                      </div>

                      {/* Title and Organization */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className={`text-lg font-medium mb-3 ${
                        item.type === "work" ? "text-green-400" : "text-blue-400"
                      }`}>
                        {item.organization}
                      </p>

                      {/* Duration and Location */}
                      <div className={`flex flex-wrap gap-4 mb-4 text-gray-400 text-sm ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-500" />
                          <span>{item.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-500" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* Grade/Major for Education - Always visible for education */}
                      {item.type === "education" && (item.grade || item.major) && (
                        <div className={`mb-4 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                          {item.major && (
                            <p className="text-gray-300 font-medium">
                              <span className="text-blue-400">Major:</span> {item.major}
                            </p>
                          )}
                          {item.grade && (
                            <p className="text-gray-300 font-medium">
                              <span className="text-blue-400">Grade:</span> {item.grade}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Expand/Collapse Button */}
                      <div className={`flex items-center gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                        <button
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            item.type === "work"
                              ? "text-green-400 hover:bg-green-900/30"
                              : "text-blue-400 hover:bg-blue-900/30"
                          }`}
                        >
                          {isExpanded ? (
                            <>
                              Show Less
                              <FaChevronUp />
                            </>
                          ) : (
                            <>
                              View Details
                              <FaChevronDown />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Description - Animated Expand/Collapse */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            variants={descriptionVariants}
                            className={`overflow-hidden ${index % 2 === 0 ? "md:text-right" : ""}`}
                          >
                            <div className="pt-4 border-t border-gray-700">
                              <h4 className={`text-lg font-semibold mb-3 ${
                                item.type === "work" ? "text-green-400" : "text-blue-400"
                              }`}>
                                Key Responsibilities & Achievements:
                              </h4>
                              <ul className="space-y-2 text-gray-300">
                                {item.description.map((desc, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className={`${
                                      item.type === "work" ? "text-green-400" : "text-blue-400"
                                    } mt-1 flex-shrink-0 ${index % 2 === 0 ? "md:order-2" : ""}`}>
                                      •
                                    </span>
                                    <span className="flex-1">{desc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex w-2/12 justify-center items-center">
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className={`w-6 h-6 rounded-full border-4 ${
                        item.type === "work"
                          ? "bg-green-400 border-green-600"
                          : "bg-blue-400 border-blue-600"
                      } shadow-lg z-10 cursor-pointer`}
                      onClick={() => toggleItemExpansion(item.id)}
                    ></motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Expand All / Collapse All Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center gap-4"
        >
          <button
            onClick={() => {
              const allIds = timelineData.map(item => item.id);
              setExpandedItems(new Set(allIds));
            }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            Expand All
          </button>
          <button
            onClick={() => setExpandedItems(new Set())}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            Collapse All
          </button>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          variants={containerVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Years of Experience", value: "2.5+", color: "green" },
            { label: "Educational Degrees", value: "3", color: "blue" },
            { label: "Companies Worked", value: "4", color: "green" },
            { label: "Research Publications", value: "3", color: "blue" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-5 text-center border-l-4 ${
                stat.color === "green" ? "border-green-500" : "border-blue-500"
              } hover:bg-gray-800 transition-colors duration-300`}
            >
              <h4 className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </h4>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Timeline;
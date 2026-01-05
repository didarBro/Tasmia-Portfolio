/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Define proper types
export type TSkills = {
  _id: string;
  name: string;
  level: number;
  img: string;
};

type TDisplaySkill = {
  _id?: string;
  name: string;
  level: number;
  img?: string;
  category?: string;
};

type TSkillCategory =
  | "all"
  | "automation"
  | "manual-testing"
  | "programming"
  | "tools-platforms"
  | "performance-security";

const TechnicalSkills = () => {
  const [activeTab, setActiveTab] = useState<TSkillCategory>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  // Ref for scroll animation
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Static skills data
  const staticSkillsData: TSkills[] = [
    { _id: "1", name: "Cypress", level: 85, img: "/images/cypress.png" },
    { _id: "2", name: "Playwright", level: 80, img: "/images/playwright.png" },
    { _id: "3", name: "Manual Testing", level: 90, img: "/images/testing.png" },
    {
      _id: "4",
      name: "Test Case Design",
      level: 88,
      img: "/images/test-case.png",
    },
    { _id: "5", name: "JavaScript", level: 75, img: "/images/javascript.png" },
    { _id: "6", name: "Python", level: 70, img: "/images/python.png" },
    { _id: "7", name: "Postman", level: 85, img: "/images/postman.png" },
    { _id: "8", name: "JMeter", level: 75, img: "/images/jmeter.png" },
    { _id: "9", name: "Jira", level: 90, img: "/images/jira.png" },
    { _id: "10", name: "TestRail", level: 80, img: "/images/testrail.png" },
    {
      _id: "11",
      name: "API Testing",
      level: 85,
      img: "/images/api-testing.png",
    },
    { _id: "12", name: "Java", level: 65, img: "/images/java.png" },
    { _id: "13", name: "MySQL", level: 70, img: "/images/mysql.png" },
    { _id: "14", name: "PostgreSQL", level: 72, img: "/images/postgresql.png" },
    { _id: "15", name: "GitHub", level: 85, img: "/images/github.png" },
    { _id: "16", name: "OWASP ZAP", level: 60, img: "/images/owasp.png" },
    {
      _id: "17",
      name: "Performance Testing",
      level: 75,
      img: "/images/performance.png",
    },
    { _id: "18", name: "JEST", level: 70, img: "/images/jest.png" },
    { _id: "19", name: "Pytest", level: 68, img: "/images/pytest.png" },
    {
      _id: "20",
      name: "Load Testing",
      level: 78,
      img: "/images/load-testing.png",
    },
  ];

  const categories: TSkillCategory[] = [
    "all",
    "automation",
    "manual-testing",
    "programming",
    "tools-platforms",
    "performance-security",
  ];

  const getSkillCategory = (skillName: string): TSkillCategory => {
    const automationSkills = [
      "Cypress",
      "Playwright",
      "Selenium",
      "Automation",
      "Test Script",
      "API Testing",
      "JEST",
      "Pytest",
    ];

    const manualTestingSkills = [
      "Manual Testing",
      "Test Case",
      "Test Plan",
      "Bug Tracking",
      "Jira",
      "TestRail",
      "Regression",
      "UAT",
      "Smoke Testing",
    ];

    const programmingSkills = [
      "JavaScript",
      "Python",
      "Java",
      "C++",
      "C",
      "TypeScript",
      "Node.js",
    ];

    const toolsPlatforms = [
      "Postman",
      "JMeter",
      "GitHub",
      "VS Code",
      "Android Studio",
      "Excel",
      "Trello",
      "Teams Planner",
      "BrowserStack",
      "PageSpeed",
      "MySQL",
      "PostgreSQL",
    ];

    const performanceSecurity = [
      "Performance Testing",
      "Load Testing",
      "Security Testing",
      "OWASP",
      "ZAP",
      "JMeter",
      "RestAssured",
    ];

    const skillLower = skillName.toLowerCase();

    if (automationSkills.some((s) => skillLower.includes(s.toLowerCase())))
      return "automation";
    if (manualTestingSkills.some((s) => skillLower.includes(s.toLowerCase())))
      return "manual-testing";
    if (programmingSkills.some((s) => skillLower.includes(s.toLowerCase())))
      return "programming";
    if (toolsPlatforms.some((s) => skillLower.includes(s.toLowerCase())))
      return "tools-platforms";
    if (performanceSecurity.some((s) => skillLower.includes(s.toLowerCase())))
      return "performance-security";

    return "tools-platforms";
  };

  const filteredSkills = staticSkillsData.filter((skill: TSkills) => {
    if (activeTab === "all") return true;
    return getSkillCategory(skill.name) === activeTab;
  });

  const formatCategoryName = (category: TSkillCategory): string => {
    const names: Record<TSkillCategory, string> = {
      all: "All Skills",
      automation: "Automation Testing",
      "manual-testing": "Manual Testing",
      programming: "Programming",
      "tools-platforms": "Tools & Platforms",
      "performance-security": "Performance & Security",
    };
    return names[category];
  };

  const displaySkills: TDisplaySkill[] = filteredSkills.map(
    (skill: TSkills) => ({
      _id: skill._id,
      name: skill.name,
      level: skill.level,
      img: skill.img,
      category: getSkillCategory(skill.name),
    })
  );

  // Enhanced card animation with scroll detection
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.85,
      rotateX: -15,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.08, // Stagger based on index
      },
    }),
    hover: {
      y: -10,
      scale: 1.03,
      rotateX: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        type: "spring",
        stiffness: 60,
        damping: 15,
        delay: 0.3,
      },
    }),
  };

  return (
    <div
      id="skills"
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
        >
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg blur opacity-30"></div>
            <h2 className="relative text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                SQA & Technical Skills
              </span>
            </h2>
          </div>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Software Quality Assurance expertise with proficiency in automation,
            manual testing, and modern testing tools
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden group ${
                activeTab === category
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl shadow-green-500/30"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              {formatCategoryName(category)}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid with Scroll Animation */}
        <div ref={containerRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {displaySkills.map((skill: TDisplaySkill, index: number) => {
                const isExpert = skill.level >= 90;
                const isAdvanced = skill.level >= 80;

                return (
                  <SkillCard
                    key={skill._id || skill.name}
                    skill={skill}
                    index={index}
                    isExpert={isExpert}
                    isAdvanced={isAdvanced}
                    hoveredSkill={hoveredSkill}
                    setHoveredSkill={setHoveredSkill}
                    cardVariants={cardVariants}
                    progressBarVariants={progressBarVariants}
                    getSkillCategory={getSkillCategory}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats Summary */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            {
              label: "Testing Tools",
              value: displaySkills.filter(
                (s: TDisplaySkill) =>
                  s.category === "automation" ||
                  s.category === "manual-testing" ||
                  s.category === "performance-security"
              ).length,
            },
            {
              label: "Expert Level",
              value: displaySkills.filter((s: TDisplaySkill) => s.level >= 80)
                .length,
            },
            {
              label: "Projects Tested",
              value: 12,
            },
            {
              label: "Bug Detection Rate",
              value: "98%",
              isPercentage: true,
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-5 text-center border-l-4 border-green-500 hover:bg-gray-800 transition-colors duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h4 className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </h4>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Separate SkillCard component for individual scroll animation
const SkillCard = ({
  skill,
  index,
  isExpert,
  isAdvanced,
  hoveredSkill,
  setHoveredSkill,
  cardVariants,
  progressBarVariants,
  getSkillCategory,
}: any) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onMouseEnter={() => setHoveredSkill(skill._id || skill.name)}
      onMouseLeave={() => setHoveredSkill(null)}
      className="relative group"
      style={{ perspective: "1000px" }}
    >
      {isExpert && (
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {isAdvanced && !isExpert && (
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"
          animate={{
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <div className="relative bg-gray-800/80 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/50 group-hover:border-green-500/50 transition-all duration-300 h-full flex flex-col">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        <div className="relative p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.div
                className="relative"
                animate={{
                  rotate:
                    hoveredSkill === (skill._id || skill.name)
                      ? [0, 10, -10, 0]
                      : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-2 flex items-center justify-center border border-gray-600/50 group-hover:border-green-500/50 transition-colors duration-300">
                  {skill.img ? (
                    <motion.img
                      src={skill.img}
                      alt={skill.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      whileHover={{ scale: 1.1 }}
                    />
                  ) : (
                    <span className="text-green-400 font-bold text-xl">
                      {skill.name.charAt(0)}
                    </span>
                  )}
                </div>

                {isExpert && (
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-green-300 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                  {skill.name}
                </h3>
                <span className="text-xs text-gray-400">
                  {skill.category || getSkillCategory(skill.name)}
                </span>
              </div>
            </div>

            <motion.span
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg ${getLevelBadgeColor(
                skill.level
              )}`}
              animate={
                isExpert
                  ? {
                      boxShadow: [
                        "0 0 0 0 rgba(74, 222, 128, 0.7)",
                        "0 0 0 10px rgba(74, 222, 128, 0)",
                        "0 0 0 0 rgba(74, 222, 128, 0)",
                      ],
                    }
                  : {}
              }
              transition={
                isExpert
                  ? {
                      duration: 2,
                      repeat: Infinity,
                    }
                  : {}
              }
            >
              {getLevelLabel(skill.level)}
            </motion.span>
          </div>

          <div className="mb-6 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-300">
                Proficiency
              </span>
              <div className="flex items-center">
                {isExpert && (
                  <motion.div
                    className="mr-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-xs text-yellow-400">🔥</span>
                  </motion.div>
                )}
                <motion.span
                  className="text-sm font-bold text-green-400"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {skill.level}%
                </motion.span>
              </div>
            </div>

            <div className="h-2.5 bg-gray-900/80 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className={`h-full ${getProgressBarColor(
                  skill.level
                )} rounded-full relative`}
                variants={progressBarVariants}
                custom={skill.level}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.div
                  className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["0%", "300%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.5,
                  }}
                />
              </motion.div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-400 text-sm">
              <motion.svg
                className="w-4 h-4 mr-2 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                animate={
                  hoveredSkill === (skill._id || skill.name)
                    ? { rotate: 360 }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </motion.svg>
              {getExperienceText(skill.level)}
            </div>

            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0 }}
              animate={
                hoveredSkill === (skill._id || skill.name) ? { scale: 1 } : {}
              }
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </motion.div>
          </div>

          {isExpert && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400/50 rounded-full"
                  initial={{
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                  }}
                  animate={{
                    y: [null, -20, 0],
                    x: [null, Math.sin(i) * 10],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + i,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Utility functions
function getLevelLabel(level: number): string {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 70) return "Proficient";
  if (level >= 60) return "Competent";
  return "Learning";
}

function getLevelBadgeColor(level: number): string {
  if (level >= 90)
    return "bg-gradient-to-r from-yellow-600/90 to-orange-600/90 text-yellow-100";
  if (level >= 80)
    return "bg-gradient-to-r from-emerald-700/90 to-green-700/90 text-emerald-100";
  if (level >= 70)
    return "bg-gradient-to-r from-teal-700/90 to-cyan-700/90 text-teal-100";
  if (level >= 60)
    return "bg-gradient-to-r from-blue-700/90 to-indigo-700/90 text-blue-100";
  return "bg-gradient-to-r from-gray-700/90 to-gray-800/90 text-gray-300";
}

function getProgressBarColor(level: number): string {
  if (level >= 90)
    return "bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500";
  if (level >= 80) return "bg-gradient-to-r from-emerald-500 to-green-500";
  if (level >= 70) return "bg-gradient-to-r from-teal-500 to-cyan-500";
  if (level >= 60) return "bg-gradient-to-r from-blue-500 to-indigo-500";
  return "bg-gradient-to-r from-gray-500 to-gray-600";
}

function getExperienceText(level: number): string {
  if (level >= 90) return "3+ years experience";
  if (level >= 80) return "2-3 years experience";
  if (level >= 70) return "1-2 years experience";
  if (level >= 60) return "6-12 months experience";
  return "Building experience";
}

export default TechnicalSkills;
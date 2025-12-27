// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable react/no-unescaped-entities */
// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useGetSkillsQuery } from "@/redux/features/skills/skillsApi";
// import DynamicLoading from "./DynamicLoading";

// // type
// export type TSkills = {
//   _id: string;
//   name: string;
//   level: number;
//   img: string;
// };

// const TechnicalSkills = () => {
//   const { data, isLoading } = useGetSkillsQuery({});
//   const skillsData = data?.data?.result;
//   const [activeTab, setActiveTab] = useState("all");

//   // Create skill categories
//   const categories = ["all", "frontend", "backend", "database", "tools"];

//   // This would ideally come from the API, but for demo purposes we'll simulate categories
//   const getSkillCategory = (skillName: string) => {
//     const frontendSkills = [
//       "React",
//       "Next.js",
//       "HTML",
//       "CSS",
//       "JavaScript",
//       "TypeScript",
//       "Angular",
//       "Vue",
//     ];
//     const backendSkills = [
//       "Node.js",
//       "Express",
//       "Django",
//       "Flask",
//       "Ruby on Rails",
//       "PHP",
//     ];
//     const databaseSkills = [
//       "MongoDB",
//       "PostgreSQL",
//       "MySQL",
//       "Firebase",
//       "Redis",
//       "SQLite",
//     ];

//     if (frontendSkills.some((s) => skillName.includes(s))) return "frontend";
//     if (backendSkills.some((s) => skillName.includes(s))) return "backend";
//     if (databaseSkills.some((s) => skillName.includes(s))) return "database";
//     return "tools";
//   };

//   // Filter skills based on active tab
//   const filteredSkills = skillsData?.filter((skill: TSkills) => {
//     if (activeTab === "all") return true;
//     return getSkillCategory(skill.name) === activeTab;
//   });

//   return (
//     <div
//       id="skills"
//       className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20"
//     >
//       <div className="mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-5"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h2 className="text-4xl font-extrabold tracking-tight text-white">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
//               Technical Skills
//             </span>
//           </h2>
//         </motion.div>

//         {/* Category Tabs */}
//         {isLoading ? (
//           <DynamicLoading />
//         ) : (
//           <div
//             className="flex flex-wrap justify-center gap-2 mb-12"
//             data-aos="fade-up"
//           >
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setActiveTab(category)}
//                 className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                   activeTab === category
//                     ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
//                     : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                 }`}
//               >
//                 {category.charAt(0).toUpperCase() + category.slice(1)}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Skills Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {filteredSkills?.map((skill: TSkills, index: number) => (
//             <motion.div
//               key={skill._id}
//               data-aos="zoom-in"
//               data-aos-delay={`${index * 50}`}
//               whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
//               className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700"
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     {skill.img && (
//                       <div className="w-10 h-10 bg-gray-700 rounded-lg p-2 flex items-center justify-center">
//                         <img
//                           src={skill.img}
//                           alt={skill.name}
//                           className="w-full h-full object-contain"
//                         />
//                       </div>
//                     )}
//                     <h3 className="text-lg font-bold text-white">
//                       {skill.name}
//                     </h3>
//                   </div>

//                   <span
//                     className={`
//                     px-2 py-1 rounded-lg text-xs font-semibold 
//                     ${getLevelBadgeColor(skill.level)}
//                   `}
//                   >
//                     {getLevelLabel(skill.level)}
//                   </span>
//                 </div>

//                 <div className="mt-4">
//                   <div className="relative pt-1">
//                     <div className="flex mb-2 items-center justify-between">
//                       <div>
//                         <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-200 bg-green-900">
//                           Proficiency
//                         </span>
//                       </div>
//                       <div className="text-right">
//                         <span className="text-xs font-semibold inline-block text-green-200">
//                           {skill.level}%
//                         </span>
//                       </div>
//                     </div>

//                     <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
//                       <motion.div
//                         className={`h-full ${getProgressBarColor(skill.level)}`}
//                         initial={{ width: 0 }}
//                         animate={{ width: `${skill.level}%` }}
//                         transition={{ duration: 1.2, delay: index * 0.1 }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Experience Info */}
//                 <div className="mt-4 flex items-center text-gray-400 text-sm">
//                   <svg
//                     className="w-4 h-4 mr-1"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   {getExperienceText(skill.level)}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Summary Statistics (commented out) */}
//         {/* <div
//           className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
//           data-aos="fade-up"
//         >
//           {[
//             { label: "Total Skills", value: skillsData?.length || 0 },
//             {
//               label: "Expert Level",
//               value:
//                 skillsData?.filter((s: TSkills) => s.level >= 90).length || 0,
//             },
//             {
//               label: "Advanced",
//               value:
//                 skillsData?.filter(
//                   (s: TSkills) => s.level >= 70 && s.level < 90
//                 ).length || 0,
//             },
//             {
//               label: "Growing",
//               value:
//                 skillsData?.filter((s: TSkills) => s.level < 70).length || 0,
//             },
//           ].map((stat, idx) => (
//             <div
//               key={idx}
//               className="bg-gray-800 rounded-lg p-4 text-center border-t-4 border-green-500"
//             >
//               <h4 className="text-3xl font-bold text-white">{stat.value}</h4>
//               <p className="text-gray-400 text-sm">{stat.label}</p>
//             </div>
//           ))}
//         </div> */}
//       </div>
//     </div>
//   );
// };

// // Utility functions
// function getLevelLabel(level: number) {
//   if (level >= 90) return "Expert";
//   if (level >= 80) return "Advanced";
//   if (level >= 70) return "Proficient";
//   if (level >= 50) return "Intermediate";
//   return "Learning";
// }

// function getLevelBadgeColor(level: number) {
//   if (level >= 90) return "bg-green-900 text-green-200";
//   if (level >= 80) return "bg-emerald-900 text-emerald-200";
//   if (level >= 70) return "bg-teal-900 text-teal-200";
//   if (level >= 50) return "bg-lime-900 text-lime-200";
//   return "bg-amber-900 text-amber-200";
// }

// function getProgressBarColor(level: number) {
//   if (level >= 90) return "bg-gradient-to-r from-green-600 to-green-400";
//   if (level >= 80) return "bg-gradient-to-r from-emerald-600 to-emerald-400";
//   if (level >= 70) return "bg-gradient-to-r from-teal-600 to-teal-400";
//   if (level >= 50) return "bg-gradient-to-r from-lime-600 to-lime-400";
//   return "bg-gradient-to-r from-amber-500 to-amber-300";
// }

// function getExperienceText(level: number) {
//   if (level >= 90) return "5+ years experience";
//   if (level >= 80) return "3-5 years experience";
//   if (level >= 70) return "2-3 years experience";
//   if (level >= 50) return "1-2 years experience";
//   return "Building experience";
// }

// export default TechnicalSkills;




/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGetSkillsQuery } from "@/redux/features/skills/skillsApi";
import DynamicLoading from "./DynamicLoading";

// type
export type TSkills = {
  _id: string;
  name: string;
  level: number;
  img: string;
};

const TechnicalSkills = () => {
  const { data, isLoading } = useGetSkillsQuery({});
  const skillsData = data?.data?.result;
  const [activeTab, setActiveTab] = useState("all");

  // Updated categories to match SQA/Testing focus from CV
  const categories = [
    "all",
    "automation",
    "manual-testing",
    "programming",
    "tools-platforms",
    "performance-security"
  ];

  // Categorize skills based on SQA/Testing focus
  const getSkillCategory = (skillName: string) => {
    const automationSkills = [
      "Cypress",
      "Playwright",
      "Selenium",
      "Automation",
      "Test Script"
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
      "Smoke Testing"
    ];
    
    const programmingSkills = [
      "JavaScript",
      "Python",
      "Java",
      "C++",
      "C",
      "TypeScript",
      "Node.js"
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
      "PageSpeed"
    ];
    
    const performanceSecurity = [
      "Performance Testing",
      "Load Testing",
      "Security Testing",
      "OWASP",
      "ZAP",
      "JMeter",
      "RestAssured"
    ];
    
    const databaseSkills = [
      "MySQL",
      "PostgreSQL",
      "Database",
      "MongoDB",
      "Redis"
    ];

    const skillLower = skillName.toLowerCase();
    
    // Check each category
    if (automationSkills.some(s => skillLower.includes(s.toLowerCase()))) return "automation";
    if (manualTestingSkills.some(s => skillLower.includes(s.toLowerCase()))) return "manual-testing";
    if (programmingSkills.some(s => skillLower.includes(s.toLowerCase()))) return "programming";
    if (toolsPlatforms.some(s => skillLower.includes(s.toLowerCase()))) return "tools-platforms";
    if (performanceSecurity.some(s => skillLower.includes(s.toLowerCase()))) return "performance-security";
    if (databaseSkills.some(s => skillLower.includes(s.toLowerCase()))) return "tools-platforms"; // Group databases with tools
    
    return "tools-platforms"; // Default fallback
  };

  // Filter skills based on active tab
  const filteredSkills = skillsData?.filter((skill: TSkills) => {
    if (activeTab === "all") return true;
    return getSkillCategory(skill.name) === activeTab;
  });

  // Function to format category display names
  const formatCategoryName = (category: string) => {
    const names: Record<string, string> = {
      "all": "All Skills",
      "automation": "Automation Testing",
      "manual-testing": "Manual Testing",
      "programming": "Programming",
      "tools-platforms": "Tools & Platforms",
      "performance-security": "Performance & Security"
    };
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Example skills data structure if you want to predefine some SQA skills
  const defaultSqaSkills = [
    { name: "Cypress", level: 85, category: "automation" },
    { name: "Playwright", level: 80, category: "automation" },
    { name: "Manual Testing", level: 90, category: "manual-testing" },
    { name: "Test Case Design", level: 88, category: "manual-testing" },
    { name: "JavaScript", level: 75, category: "programming" },
    { name: "Python", level: 70, category: "programming" },
    { name: "Postman", level: 85, category: "tools-platforms" },
    { name: "JMeter", level: 75, category: "performance-security" },
    { name: "Jira", level: 90, category: "tools-platforms" },
    { name: "TestRail", level: 80, category: "tools-platforms" },
    { name: "API Testing", level: 85, category: "automation" },
    { name: "Java", level: 65, category: "programming" },
    { name: "MySQL", level: 70, category: "tools-platforms" },
    { name: "PostgreSQL", level: 72, category: "tools-platforms" },
    { name: "GitHub", level: 85, category: "tools-platforms" },
    { name: "OWASP ZAP", level: 60, category: "performance-security" },
    { name: "Performance Testing", level: 75, category: "performance-security" },
    { name: "JEST", level: 70, category: "automation" },
    { name: "Pytest", level: 68, category: "automation" },
    { name: "Load Testing", level: 78, category: "performance-security" }
  ];

  // Use API data if available, otherwise use default SQA skills for demo
  const displaySkills = skillsData?.length > 0 ? filteredSkills : defaultSqaSkills.filter(skill => 
    activeTab === "all" || skill.category === activeTab
  );

  return (
    <div
      id="skills"
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
              SQA & Technical Skills
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Software Quality Assurance expertise with proficiency in automation, manual testing, and modern testing tools
          </p>
        </motion.div>

        {/* Category Tabs */}
        {isLoading ? (
          <DynamicLoading />
        ) : (
          <div
            className="flex flex-wrap justify-center gap-3 mb-12"
            data-aos="fade-up"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === category
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                }`}
              >
                {formatCategoryName(category)}
              </button>
            ))}
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displaySkills?.map((skill: TSkills | typeof defaultSqaSkills[0], index: number) => (
            <motion.div
              key={skill._id || skill.name}
              data-aos="zoom-in"
              data-aos-delay={`${index * 50}`}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-green-500/30 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {skill.img && (
                      <div className="w-10 h-10 bg-gray-700 rounded-lg p-2 flex items-center justify-center border border-gray-600">
                        <img
                          src={skill.img}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    {!skill.img && (
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-2 flex items-center justify-center border border-gray-600">
                        <span className="text-green-400 font-bold text-lg">
                          {skill.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {skill.name}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {getSkillCategory(skill.name)}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`
                    px-2 py-1 rounded-lg text-xs font-semibold 
                    ${getLevelBadgeColor(skill.level)}
                  `}
                  >
                    {getLevelLabel(skill.level)}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-200 bg-green-900/50">
                          Proficiency
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-green-200">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${getProgressBarColor(skill.level)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Experience Info */}
                <div className="mt-4 flex items-center text-gray-400 text-sm">
                  <svg
                    className="w-4 h-4 mr-1 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {getExperienceText(skill.level)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Summary for SQA */}
        <div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          data-aos="fade-up"
        >
          {[
            { 
              label: "Testing Tools", 
              value: displaySkills?.filter((s: any) => 
                getSkillCategory(s.name) === "automation" || 
                getSkillCategory(s.name) === "manual-testing" ||
                getSkillCategory(s.name) === "performance-security"
              ).length || 0 
            },
            {
              label: "Expert Level",
              value: displaySkills?.filter((s: any) => s.level >= 80).length || 0,
            },
            {
              label: "Projects Tested",
              value: 12, // From CV: 12+ projects mentioned
            },
            {
              label: "Bug Detection Rate",
              value: "98%",
              isPercentage: true
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-5 text-center border-l-4 border-green-500 hover:bg-gray-800 transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
              <h4 className="text-3xl font-bold text-white mb-1">
                {stat.value}{stat.isPercentage ? "" : ""}
              </h4>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Utility functions
function getLevelLabel(level: number) {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 70) return "Proficient";
  if (level >= 60) return "Competent";
  return "Learning";
}

function getLevelBadgeColor(level: number) {
  if (level >= 90) return "bg-gradient-to-r from-green-900 to-green-800 text-green-100";
  if (level >= 80) return "bg-gradient-to-r from-emerald-900 to-emerald-800 text-emerald-100";
  if (level >= 70) return "bg-gradient-to-r from-teal-900 to-teal-800 text-teal-100";
  if (level >= 60) return "bg-gradient-to-r from-blue-900 to-blue-800 text-blue-100";
  return "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300";
}

function getProgressBarColor(level: number) {
  if (level >= 90) return "bg-gradient-to-r from-green-500 to-green-400";
  if (level >= 80) return "bg-gradient-to-r from-emerald-500 to-emerald-400";
  if (level >= 70) return "bg-gradient-to-r from-teal-500 to-teal-400";
  if (level >= 60) return "bg-gradient-to-r from-blue-500 to-blue-400";
  return "bg-gradient-to-r from-gray-600 to-gray-500";
}

function getExperienceText(level: number) {
  if (level >= 90) return "3+ years experience";
  if (level >= 80) return "2-3 years experience";
  if (level >= 70) return "1-2 years experience";
  if (level >= 60) return "6-12 months experience";
  return "Building experience";
}

export default TechnicalSkills;
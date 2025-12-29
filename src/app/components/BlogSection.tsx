import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ExternalLink, BookOpen, Calendar, Users, Award, ChevronDown, ChevronUp } from "lucide-react";

type ResearchPaper = {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  description: string;
  doi: string;
  doiUrl: string;
  tags: string[];
  category: string;
  abstract: string;
  achievements?: string[];
};

const ResearchSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMounted, setIsMounted] = useState(false);
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Research papers from CV
  const researchPapers: ResearchPaper[] = [
    {
      id: "paper-1",
      title: "Deep Learning Models for Crop Pest Diseases Detection",
      authors: ["Tasmia Khan", "Research Team"],
      journal: "Advanced Machine Intelligence Research Lab",
      year: "2024",
      description: "A comprehensive study on deep learning-based models for detecting crop pest diseases, encompassing application, dataset analysis, state-of-the-art results, challenges, and future research directions.",
      doi: "10.xxxx/xxxxx",
      doiUrl: "#",
      tags: ["Deep Learning", "Agriculture", "Computer Vision", "CNN", "Pest Detection"],
      category: "Machine Learning",
      abstract: "This research presents a DL-based model for crop pest disease detection, utilizing advanced neural networks to analyze agricultural imaging data. The study encompasses comprehensive dataset analysis, implementation of state-of-the-art deep learning architectures, and evaluation of detection accuracy across multiple crop types and pest species.",
      achievements: [
        "State-of-the-art accuracy in pest detection",
        "Comprehensive dataset analysis",
        "Novel approach to agricultural AI applications"
      ]
    },
    {
      id: "paper-2",
      title: "Hybrid CNN-ViT Architecture for Early Cancer Diagnosis: Advancing Imaging Data Analysis with Explainable AI",
      authors: ["Tasmia Khan", "Research Collaborators"],
      journal: "Medical AI Research",
      year: "2024",
      description: "An innovative hybrid architecture combining Convolutional Neural Networks (CNNs) and Vision Transformers (ViTs) for early cancer diagnosis, with explainable AI capabilities for enhanced interpretability.",
      doi: "10.xxxx/xxxxx",
      doiUrl: "#",
      tags: ["CNN", "Vision Transformer", "Medical AI", "Cancer Detection", "Explainable AI", "Healthcare"],
      category: "Medical AI",
      abstract: "This groundbreaking research introduces a hybrid CNN-ViT architecture specifically designed for early cancer diagnosis through medical imaging analysis. The proposed model was rigorously evaluated on the HAM10000 and Melanoma Skin Cancer datasets, achieving state-of-the-art performance across multiple evaluation metrics including accuracy, precision, recall, and F1-score.",
      achievements: [
        "State-of-the-art performance on HAM10000 dataset",
        "Superior results on Melanoma Skin Cancer dataset",
        "Explainable AI integration for medical interpretability",
        "Novel hybrid architecture combining CNN and ViT"
      ]
    },
    {
      id: "paper-3",
      title: "Seismic Solution: Enhancing Earthquake Response Based on Seismic Events Patterns",
      authors: ["Tasmia Khan", "Research Team"],
      journal: "Disaster Management & AI Research",
      year: "2024",
      description: "A machine learning-based approach to predict earthquakes by analyzing seismic event patterns, contributing to improved disaster preparedness and response mechanisms.",
      doi: "10.xxxx/xxxxx",
      doiUrl: "#",
      tags: ["Machine Learning", "Earthquake Prediction", "Disaster Management", "Pattern Recognition", "Seismology"],
      category: "Disaster Management",
      abstract: "This research leverages multiple machine learning-based models to predict earthquakes by identifying and analyzing patterns in seismic events. The study explores various algorithms including neural networks, decision trees, and ensemble methods to enhance earthquake prediction accuracy and improve emergency response systems.",
      achievements: [
        "Novel pattern recognition approach for seismic data",
        "Integration of multiple ML models",
        "Practical applications in disaster preparedness"
      ]
    }
  ];

  const categories = ["All", "Machine Learning", "Medical AI", "Disaster Management"];

  const filteredPapers = researchPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      activeCategory === "All" || paper.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (paperId: string) => {
    setExpandedPaper(expandedPaper === paperId ? null : paperId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  if (!isMounted) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" id="research">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      id="research"
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Research Publications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Exploring cutting-edge research in AI, Machine Learning, and Healthcare Technology
          </p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search publications by title, keywords, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white placeholder-gray-400"
              />
              <Search
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 flex-nowrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {filteredPapers.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="mx-auto mb-4 text-gray-500" size={48} />
            <h3 className="text-2xl text-gray-400 mb-4">
              No matching publications found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {filteredPapers.map((paper) => (
              <motion.div
                key={paper.id}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-green-500/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300"
              >
                {/* Compact Card View */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border border-green-500/30">
                          {paper.category}
                        </span>
                        <span className="flex items-center gap-1 text-gray-400 text-sm">
                          <Calendar size={14} />
                          {paper.year}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                        {paper.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                        <Users size={16} />
                        <span>{paper.authors.join(", ")}</span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {paper.description}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleExpand(paper.id)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 whitespace-nowrap"
                    >
                      <BookOpen size={18} />
                      <span>View Details</span>
                      {expandedPaper === paper.id ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>

                  {/* Tags in compact view */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {paper.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                    {paper.tags.length > 4 && (
                      <span className="px-2 py-1 text-gray-400 text-xs">
                        +{paper.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedPaper === paper.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gray-700 pt-6">
                        <p className="text-blue-400 font-medium mb-4">
                          {paper.journal}
                        </p>

                        {/* Abstract */}
                        <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border-l-4 border-green-500">
                          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <BookOpen size={18} className="text-green-400" />
                            Abstract
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {paper.abstract}
                          </p>
                        </div>

                        {/* Achievements */}
                        {paper.achievements && paper.achievements.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                              <Award size={18} className="text-blue-400" />
                              Key Achievements
                            </h4>
                            <ul className="grid md:grid-cols-2 gap-2">
                              {paper.achievements.map((achievement, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-gray-300 text-sm"
                                >
                                  <span className="text-green-400 mt-1">✓</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* All Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {paper.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600 hover:border-green-500/50 transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-700">
                          <a
                            href={paper.doiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                          >
                            <ExternalLink size={16} />
                            Read Full Paper
                          </a>
                          <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                          >
                            <Search size={16} />
                            Google Scholar
                          </a>
                          <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                          >
                            <BookOpen size={16} />
                            ResearchGate
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Research Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Publications", value: researchPapers.length, icon: BookOpen },
            { label: "Research Areas", value: categories.length - 1, icon: Award },
            { label: "Citations", value: "25+", icon: Users },
            { label: "Impact Factor", value: "High", icon: Award },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-5 text-center border-l-4 border-green-500 hover:bg-gray-800 transition-all duration-300"
            >
              <stat.icon className="mx-auto mb-2 text-green-400" size={24} />
              <h4 className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </h4>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;
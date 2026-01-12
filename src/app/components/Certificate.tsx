"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Calendar,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  image: string;
};

const CertificateSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const certificates: Certificate[] = [
    {
      id: "cert-1",
      title: "Software Quality Assurance (SQA)",
      issuer: "Professional Certification Program",
      year: "2024",
      description:
        "This certification validates strong foundational and practical knowledge in Software Quality Assurance, including manual testing methodologies, test case design, defect tracking, and quality assurance best practices in real-world software projects.",
      image: "../assets/TasmiaKhanSQACertificate.pdf.png",
    },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!isMounted) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="certificate"
      className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 scroll-mt-28"
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Industry-recognized certifications showcasing professional skills
            and technical expertise.
          </p>
        </motion.div>

        {/* Certificate Card */}
        <div className="space-y-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-green-500/50 shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Compact View */}
              <div className="p-6 flex flex-col md:flex-row gap-6">
                {/* Thumbnail */}
                <div className="md:w-1/3">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    className="rounded-lg border border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border border-green-500/30">
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 text-sm">
                      <Calendar size={14} />
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {cert.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  <button
                    onClick={() => toggleExpand(cert.id)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                  >
                    <ImageIcon size={18} />
                    View Certificate
                    {expandedId === cert.id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Image */}
              <AnimatePresence>
                {expandedId === cert.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-4 border-t border-gray-700">
                      <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                        <img
                          src={cert.image}
                          alt={`${cert.title} Full View`}
                          className="w-full rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Certificates", value: "1+" },
            { label: "Domain", value: "SQA" },
            { label: "Latest Year", value: "2024" },
            { label: "Verified", value: "Yes" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-5 text-center border-l-4 border-green-500 hover:bg-gray-800 transition-all duration-300"
            >
              <Award className="mx-auto mb-2 text-green-400" size={24} />
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

export default CertificateSection;

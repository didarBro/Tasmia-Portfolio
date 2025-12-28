/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("17tasmiakhan@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-16 bg-gray-900" id="contact">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-2 mb-4"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Have an exciting project or idea you'd like to bring to life? Let's
            work together to create something amazing!
          </p>
        </motion.div>

        {/* Centered Contact Cards */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 justify-center items-stretch max-w-5xl mx-auto">
          {/* Get in Touch Card */}
          <motion.div
            variants={itemVariants}
            className="flex-1 bg-gray-800 p-5 md:p-6 rounded-xl border border-gray-700 shadow-xl hover:shadow-green-500/10 transition-all duration-300"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">
              Get in Touch
            </h3>
            <p className="text-gray-300 mb-5 md:mb-6">
              I'm always open to new opportunities and collaborations. Feel
              free to reach out through any of these channels.
            </p>

            <div className="space-y-5 md:space-y-6">
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 md:gap-4"
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-white flex-shrink-0">
                  <FaEnvelope className="text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-sm">Email</p>
                  <a
                    href="mailto:17tasmiakhan@gmail.com"
                    className="text-white font-medium hover:text-green-400 transition-colors block truncate"
                  >
                    17tasmiakhan@gmail.com
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border border-gray-600 hover:border-green-400/50 transition-all duration-300 shadow-md hover:shadow-green-500/20 flex-shrink-0"
                  aria-label="Copy email address"
                  title={copied ? "Copied!" : "Copy email"}
                >
                  {copied ? (
                    <FaCheck className="text-green-400 text-sm" />
                  ) : (
                    <FaCopy className="text-sm" />
                  )}
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Connect With Me Card */}
          <motion.div
            variants={itemVariants}
            className="flex-1 bg-gray-800 p-5 md:p-6 rounded-xl border border-gray-700 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">
              Connect With Me
            </h3>
            <p className="text-gray-300 mb-5 md:mb-6">
              Follow me on social media to stay updated with my latest
              projects and thoughts.
            </p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 md:gap-4"
            >
              <a
                href="https://www.linkedin.com/in/KhanTasmia/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-gray-300 hover:text-white border border-blue-500 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg md:text-xl transition-transform duration-300 hover:scale-110" />
              </a>

              <a
                href="https://wa.me/+8801621296671"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-gray-300 hover:text-white border border-green-600 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-lg md:text-xl transition-transform duration-300 hover:scale-110" />
              </a>

              <a
                href="https://www.facebook.com/share/1CsxTi79hD/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-gray-300 hover:text-white border border-blue-600 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FaFacebook className="text-lg md:text-xl transition-transform duration-300 hover:scale-110" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
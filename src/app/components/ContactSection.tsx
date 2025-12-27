/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Left Section - Contact Info */}
          <motion.div
            variants={containerVariants}
            className="lg:col-span-2 space-y-6 md:space-y-8 order-2 lg:order-1"
          >
            <motion.div
              variants={itemVariants}
              className="w-full bg-gray-800 p-5 md:p-6 rounded-xl border border-gray-700 shadow-xl hover:shadow-green-500/10 transition-all duration-300"
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
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-white">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a
                      href="mailto:Sumon.DevCoder@gmail.com"
                      className="text-white font-medium hover:text-green-400 transition-colors"
                    >
                      Sumon.DevCoder@gmail.com
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full bg-gray-800 p-5 md:p-6 rounded-xl border border-gray-700 shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
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
                  href="https://github.com/sumon-devCoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 hover:from-green-400 hover:to-emerald-600 text-gray-300 hover:text-white border border-gray-600 hover:border-green-400/50 transition-all duration-300 shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-lg md:text-xl transition-transform duration-300 hover:scale-110" />
                </a>

                <a
                  href="https://www.linkedin.com/in/sumon-devcoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-gray-300 hover:text-white border border-blue-500 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-lg md:text-xl transition-transform duration-300 hover:scale-110" />
                </a>

                <a
                  href="https://wa.me/+8801962878499"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-gray-300 hover:text-white border border-green-600 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="text-lg md:text-xl transition-transform duration-300 hover:scale-110" />
                </a>

                <a
                  href="https://facebook.com/sumon.devCoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-gray-300 hover:text-white border border-blue-600 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-1"
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-lg md:text-xl transition-transform duration-300 hover:scale-110" />
                </a>

                <a
                  href="https://instagram.com/sumon.devcoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-gray-300 hover:text-white border border-pink-600 hover:border-pink-500/50 transition-all duration-300 shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-lg md:text-xl transition-transform duration-300 hover:scale-110" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Section - Contact Form */}
          <motion.div
            variants={containerVariants}
            className="lg:col-span-3 order-1 lg:order-2"
          >
            <motion.div
              variants={itemVariants}
              className="w-full bg-gray-800 p-5 sm:p-6 md:p-8 rounded-xl border border-gray-700 shadow-xl"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">
                Send Me a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
                >
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={6}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <span>Send Message</span>
                    <FaPaperPlane className="text-sm" />
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 border-t border-gray-700 relative">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 bg-green-600 hover:bg-green-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>

      <div className="container mx-auto px-6">
        {/* Animated divider */}

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear}{" "}
            <span className="text-green-500">Sumon DevCoder</span>. All rights
            reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <Link
              href="/privacy"
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-gray-300 transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-gray-300 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { useEffect, useState, useRef } from "react";

interface Section {
  id: string;
  element: HTMLElement | null;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = (href: string) => {
    setActiveSection(href);
    if (isMenuOpen) setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const sections: Section[] = [
      { id: "home", element: null },
      { id: "skills", element: null },
      { id: "timeline", element: null },
      { id: "certificate", element: null }, // ✅ NEW
      { id: "research", element: null },
      { id: "contact", element: null },
    ];

    const getSectionElements = () => {
      sections.forEach((section) => {
        section.element = document.getElementById(section.id);
      });
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 100;
      let currentSectionId = "home";

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            currentSectionId = section.id;
            break;
          }
        }
      }

      const newActiveSection = `#${currentSectionId}`;
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    getSectionElements();
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeSection]);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#timeline", label: "Experience" },
    { href: "#certificate", label: "Certificates" }, // ✅ NEW
    { href: "#research", label: "Research Work" },
    { href: "#contact", label: "Contact" },
  ];

  const contactLinks = [
    {
      href: "https://wa.me/+8801621296671",
      label: "WhatsApp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      href: "tel:+8801621296671",
      label: "Call Me",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      href: "https://www.linkedin.com/in/KhanTasmia/",
      label: "LinkedIn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      href: "https://www.facebook.com/share/1CsxTi79hD/",
      label: "Facebook",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
      color: "bg-blue-600 hover:bg-blue-700",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-2xl py-3 border-b border-slate-800/50"
          : "bg-gradient-to-b from-slate-900 to-slate-900/95 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Enhanced Animation */}
          <a
            href="#home"
            onClick={() => handleLinkClick("#home")}
            className="relative group text-2xl md:text-3xl font-bold transition-all duration-300 hover:scale-105"
          >
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                Tasmia
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                Tasmia
              </span>
            </span>
            <span className="relative inline-block ml-2">
              <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
                Khan
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                Khan
              </span>
            </span>
            {/* Decorative Line */}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-500"></div>
          </a>

          {/* Desktop Navigation with Enhanced Design */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1 items-center">
              {navLinks.map((link) => (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`group relative px-4 py-2 text-sm lg:text-base font-semibold tracking-wide transition-all duration-300 block overflow-hidden ${
                      activeSection === link.href
                        ? "text-green-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {/* Background hover effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>

                    {/* Text */}
                    <span className="relative z-10">{link.label}</span>

                    {/* Active indicator - animated underline */}
                    {activeSection === link.href && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full animate-pulse"></span>
                    )}

                    {/* Hover underline */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full group-hover:w-3/4 transition-all duration-300"></span>
                  </a>
                </li>
              ))}

              {/* Enhanced CTA Button */}
              <li>
                <div className="relative ml-4" ref={dropdownRef}>
                  <button
                    onClick={handleToggleDropdown}
                    className="group relative px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm lg:text-base font-bold tracking-wide hover:from-green-500 hover:to-emerald-500 transition-all duration-300 flex items-center shadow-lg hover:shadow-green-500/50 hover:shadow-xl overflow-hidden"
                  >
                    {/* Shimmer effect */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>

                    <span className="relative z-10 flex items-center">
                      Hire Me
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180" : "animate-bounce"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Enhanced Dropdown */}
                  <div
                    className={`absolute right-0 mt-3 w-64 rounded-xl shadow-2xl bg-gradient-to-b from-slate-800 to-slate-900 ring-1 ring-green-500/20 backdrop-blur-sm transition-all duration-300 origin-top-right overflow-hidden ${
                      isDropdownOpen
                        ? "transform scale-100 opacity-100"
                        : "transform scale-95 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="py-3 px-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-green-400 font-bold text-sm uppercase tracking-wider">
                          Get In Touch
                        </p>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="space-y-2">
                        {contactLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group flex items-center px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-300 ${link.color} transform hover:scale-105 hover:shadow-lg`}
                          >
                            <span className="mr-3 transform group-hover:scale-110 transition-transform duration-300">
                              {link.icon}
                            </span>
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                              {link.label}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 text-gray-300 hover:text-white focus:outline-none group"
            onClick={handleToggleMenu}
            aria-label="Toggle menu"
          >
            <span className="absolute inset-0 bg-green-500/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 h-6 w-6 mx-auto transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-[600px] mt-4 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl p-4 shadow-2xl border border-slate-700/50 backdrop-blur-sm">
            <ul className="flex flex-col space-y-2">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  style={{
                    animation: isMenuOpen
                      ? `slideIn 0.3s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`group relative block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 overflow-hidden ${
                      activeSection === link.href
                        ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 shadow-lg shadow-green-500/10"
                        : "text-gray-300 hover:bg-slate-700/50 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-between">
                      {link.label}
                      {activeSection === link.href && (
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      )}
                    </span>
                  </a>
                </li>
              ))}

              <li className="border-t border-slate-700/50 pt-4 mt-2">
                <p className="px-4 text-green-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
                  Connect With Me
                </p>
                <div className="space-y-2">
                  {contactLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all duration-300 ${link.color} transform hover:scale-105`}
                    >
                      <span className="mr-3 transform group-hover:scale-110 transition-transform duration-300">
                        {link.icon}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;

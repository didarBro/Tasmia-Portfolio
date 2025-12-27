"use client";

import { SetStateAction, useEffect, useState, useRef } from "react";
import Link from "next/link";

interface Section {
  id: string;
  element: HTMLElement | null;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Toggle mobile menu
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle contact dropdown
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close menu when clicking a link (mobile)
  const handleLinkClick = (href: SetStateAction<string>) => {
    setActiveSection(href);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  useEffect(() => {
    // Define sections for scroll tracking
    const sections: Section[] = [
      { id: "home", element: null },
      { id: "skills", element: null },
      { id: "project", element: null },
      { id: "blogs", element: null },
      { id: "contact", element: null },
    ];

    // Get all section elements after DOM is ready
    const getSectionElements = () => {
      sections.forEach((section) => {
        section.element = document.getElementById(section.id);
      });
    };

    // Set active section based on hash
    const handleHashChange = () => {
      const hash = window.location.hash || "#home";
      setActiveSection(hash);
    };

    // Check if page is scrolled for navbar styling
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine which section is currently visible
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Find the current section
      let currentSectionId = null;
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

      // Only update if we found a section and it's different from current
      if (currentSectionId && `#${currentSectionId}` !== activeSection) {
        setActiveSection(`#${currentSectionId}`);
      }
    };

    // Handle clicks outside dropdown to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Only run once on mount
    getSectionElements();
    handleHashChange();

    // Event listeners
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array = run only on mount

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#skills", label: "Skills" },
    { href: "#project", label: "Projects" },
    { href: "#blogs", label: "Blogs" },
    { href: "#contact", label: "Contact" },
  ];

  const contactLinks = [
    {
      href: "https://wa.me/+8801962878499",
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
      href: "tel:+8801962878499",
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
      href: "https://www.linkedin.com/in/sumon-devcoder",
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
      href: "https://www.facebook.com/sumon-devcoder",
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
    {
      href: "https://www.instagram.com/sumon.devcoder",
      label: "Instagram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: "bg-pink-600 hover:bg-pink-700",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/80 backdrop-blur-sm shadow-lg py-3"
          : "bg-slate-900/95 py-4"
      }`}
    >
      <div className="mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:hidden lg:block md:text-3xl font-bold transition-all duration-300 hover:opacity-90 hover:scale-105"
          >
            <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
              Sumon
            </span>
            <span className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent ml-1">
              DevCoder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1 items-center uppercase font-bold">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-300 relative
                      ${
                        activeSection === link.href
                          ? "text-green-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                  >
                    {link.label}
                    {activeSection === link.href && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-full"></span>
                    )}
                  </Link>
                </li>
              ))}
              {/* CTA Button with Dropdown */}
              <li>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={handleToggleDropdown}
                    className="ml-2 px-4 py-2 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-md text-sm lg:text-base font-medium hover:from-green-600 hover:to-green-800 transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                  >
                    Hire Me
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`ml-1.5 h-4 w-4 transition-transform duration-300 animate-bounce`}
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
                  </button>

                  {/* Contact Dropdown */}
                  <div
                    className={`absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 transition-all duration-300 origin-top-right ${
                      isDropdownOpen
                        ? "transform scale-100 opacity-100"
                        : "transform scale-95 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="py-2 px-3">
                      <p className="text-green-400 font-medium mb-2 text-sm uppercase tracking-wide">
                        Contact Me
                      </p>
                      <div className="space-y-2">
                        {contactLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center px-3 py-2 rounded-md text-white text-sm font-medium transition-colors duration-300 ${link.color}`}
                          >
                            <span className="mr-2">{link.icon}</span>
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={handleToggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-screen mt-4" : "max-h-0"
          }`}
        >
          <nav className="bg-slate-800 rounded-lg p-4 shadow-lg">
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300
                      ${
                        activeSection === link.href
                          ? "bg-slate-700 text-green-400"
                          : "text-gray-300 hover:bg-slate-700 hover:text-white"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Mobile contact options */}
              <li className="border-t border-slate-700 pt-3">
                <p className="px-3 text-green-400 font-medium text-sm uppercase tracking-wide mb-2">
                  Contact Options
                </p>
                <div className="space-y-2">
                  {contactLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center px-3 py-2 rounded-md text-white text-sm font-medium transition-colors duration-300 ${link.color}`}
                    >
                      <span className="mr-2">{link.icon}</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

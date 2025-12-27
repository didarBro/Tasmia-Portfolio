/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
// import Image from "next/image";
// import logoImg from "../../../public/assets/animal_logo.jpg";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";
import useCurrentUserInfo from "../../hooks/useCurrentUserInfo";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logout } from "@/redux/features/auth/authSlice";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const { isAdmin } = useCurrentUserInfo();

  const links = isAdmin
    ? [
        { name: "📊 Dashboard", path: "/admin-dashboard" },
        {
          name: "📦 Skills",
          subLinks: [
            {
              name: "➕ Create Skills",
              path: "/admin-dashboard/create-skills",
            },
            { name: "📋 Skills List", path: "/admin-dashboard/skills-list" },
          ],
        },
        {
          name: "📦 Project",
          subLinks: [
            {
              name: "➕ Create Project",
              path: "/admin-dashboard/create-project",
            },
            {
              name: "📋 Project List",
              path: "/admin-dashboard/project-list",
            },
          ],
        },
        {
          name: "📦 Blog",
          subLinks: [
            {
              name: "➕ Create Blog",
              path: "/admin-dashboard/create-blog",
            },
            {
              name: "📋 Blog List",
              path: "/admin-dashboard/blog-list",
            },
          ],
        },
      ]
    : [
        { name: "📊 Dashboard", path: "/dashboard" },
        { name: "👤 Profile", path: "/dashboard/profile" },
        { name: "📅 Order History", path: "/dashboard/order-history" },
      ];

  const generalLinks = [{ name: "🏠 Home", path: "/" }];

  // Helper function to handle link click
  const handleLinkClick = () => {
    setIsSidebarOpen(false); // Close sidebar after link click on small screens
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success("Logout Successful");
    } catch (err: any) {
      toast.error("Logout Failed. Please try again.");
    }
  };
  return (
    <div className="lg:sticky lg:top-0 lg:z-10">
      {/* Toggle Button for Small Screens */}
      <button
        className="lg:hidden flex items-center p-4 text-white bg-gray-800"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 w-64 bg-gray-800 text-white shadow-md h-full transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        <div className="p-2 text-lg font-bold border-b border-gray-700 flex">
          <Link
            href={`/`}
            className="btn btn-ghost text-lg md:text-xl bg-gradient-href-r from-slate-200 flex items-center"
            onClick={handleLinkClick} // Close sidebar on link click
          >
            {/* <Image className="h-7 w-7" src={logoImg} alt="Animal Bazaar Logo" /> */}
            <span className="text-2xl mt-1">Admin Dashboard</span>
          </Link>
        </div>
        <nav className="mt-4">
          <ul>
            {links.map((link) => (
              <li key={link.name}>
                {link.subLinks ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                    >
                      {link.name}
                      {isDropdownOpen ? (
                        <FaChevronUp className="w-5 h-5" />
                      ) : (
                        <FaChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    <ul
                      className={`ml-4 mt-2 transition-max-height duration-300 ease-in-out ${
                        isDropdownOpen ? "max-h-40" : "max-h-0 overflow-hidden"
                      }`}
                    >
                      {link.subLinks.map((subLink) => (
                        <li key={subLink.name}>
                          <Link
                            href={subLink.path}
                            className={`block px-4 py-2 hover:bg-gray-700 transition-colors duration-200 ${
                              pathname === subLink.path ? "bg-gray-700" : ""
                            }`}
                            onClick={handleLinkClick} // Close sidebar on sub-link click
                          >
                            {subLink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={link.path}
                    className={`block px-4 py-2 hover:bg-gray-700 transition-colors duration-200 ${
                      pathname === link.path ? "bg-gray-700" : ""
                    }`}
                    onClick={handleLinkClick} // Close sidebar on link click
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* General Links Section with Borders */}
        <div className="border-t border-gray-500 mt-4 pt-2">
          <ul>
            {generalLinks.map((link, index) => (
              <li
                key={link.name}
                className={`${index > 0 ? "border-t border-gray-700" : ""}`}
              >
                <Link
                  href={link.path}
                  className={`block px-4 py-2 hover:bg-gray-700 transition-colors duration-200 ${
                    pathname === link.path ? "bg-gray-700" : ""
                  }`}
                  onClick={handleLinkClick} // Close sidebar on link click
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
      </aside>
    </div>
  );
};

export default AdminSidebar;

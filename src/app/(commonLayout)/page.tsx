"use client";

import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import TechnicalSkills from "../components/TechnicalSkills";
import ProjectSection from "../components/ProjectSection";
// import Testimonials from "../components/Testimonials";
import ContactSection from "../components/ContactSection";
import BlogSection from "../components/BlogSection";
// import EducationalDescription from "../components/EducationalDescription";

const HomePage = () => {
  return (
    <div className="">
      <Navbar />
      <div className="">
        <HeroSection />
        <TechnicalSkills />
        <ProjectSection />
        {/* <EducationalDescription /> */}
        <BlogSection />
        {/* <Testimonials /> */}
        <ContactSection />
      </div>
    </div>
  );
};

export default HomePage;

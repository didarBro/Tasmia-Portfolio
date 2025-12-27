/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from "react";
import {
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// TypeWriter component (replacing TypeText)
const TypeWriter = () => {
  const titles = [
    "Full Stack Developer",
    "React & Next.js Specialist",
    "MERN Stack Developer",
    "Programming Enthusiast",
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const title = titles[currentTitleIndex];
    const updateText = () => {
      if (!isDeleting) {
        setDisplayText(title.substring(0, displayText.length + 1));

        if (displayText === title) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(title.substring(0, displayText.length - 1));

        if (displayText === "") {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    };

    const typingTimeout = setTimeout(updateText, isDeleting ? 50 : 150);

    return () => clearTimeout(typingTimeout);
  }, [displayText, currentTitleIndex, isDeleting, titles]);

  return (
    <span className="inline-block min-h-8">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// New animated background components
const MovingGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <div
        className="absolute w-full h-full"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(49, 151, 149, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(49, 151, 149, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "moveGrid 15s linear infinite",
        }}
      />
    </div>
  );
};

const FloatingCubes = () => {
  const cubesData = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.05 + 0.02,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {cubesData.map((cube) => (
        <div
          key={cube.id}
          className="absolute border border-green-400/20"
          style={{
            width: `${cube.size}px`,
            height: `${cube.size}px`,
            top: `${cube.y}%`,
            left: `${cube.x}%`,
            opacity: cube.opacity,
            transform: "rotate(45deg)",
            animation: `floatUpDown ${cube.duration}s ease-in-out ${
              cube.delay
            }s infinite alternate, 
                        spinSlow ${cube.duration * 1.5}s linear ${
              cube.delay
            }s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const WavyLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute w-full h-full opacity-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q25,30 50,50 T100,50"
          stroke="rgba(74, 222, 128, 0.5)"
          strokeWidth="0.3"
          fill="none"
          className="animate-wave1"
        />
        <path
          d="M0,60 Q25,40 50,60 T100,60"
          stroke="rgba(45, 212, 191, 0.5)"
          strokeWidth="0.3"
          fill="none"
          className="animate-wave2"
        />
        <path
          d="M0,40 Q25,60 50,40 T100,40"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="0.3"
          fill="none"
          className="animate-wave3"
        />
      </svg>
    </div>
  );
};

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const characters =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(0);

    // Draw matrix effect
    const draw = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "rgba(34, 197, 94, 0.35)";
      context.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        context.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Request the next frame
      requestAnimationFrame(draw);
    };

    // Start the animation
    requestAnimationFrame(draw);

    // Resize listener
    window.addEventListener("resize", resizeCanvas);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20"
      style={{ pointerEvents: "none" }}
    />
  );
};

const HeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* New advanced background animations */}
      <style jsx global>{`
        @keyframes moveGrid {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-50px, -50px);
          }
        }
        @keyframes floatUpDown {
          0% {
            transform: translate(0, 0) rotate(45deg);
          }
          100% {
            transform: translate(0, -100px) rotate(45deg);
          }
        }
        @keyframes spinSlow {
          from {
            transform: rotate(45deg);
          }
          to {
            transform: rotate(405deg);
          }
        }
        @keyframes wave1 {
          0% {
            d: "M0,50 Q25,30 50,50 T100,50";
          }
          50% {
            d: "M0,50 Q25,70 50,50 T100,50";
          }
          100% {
            d: "M0,50 Q25,30 50,50 T100,50";
          }
        }
        @keyframes wave2 {
          0% {
            d: "M0,60 Q25,40 50,60 T100,60";
          }
          50% {
            d: "M0,60 Q25,80 50,60 T100,60";
          }
          100% {
            d: "M0,60 Q25,40 50,60 T100,60";
          }
        }
        @keyframes wave3 {
          0% {
            d: "M0,40 Q25,60 50,40 T100,40";
          }
          50% {
            d: "M0,40 Q25,20 50,40 T100,40";
          }
          100% {
            d: "M0,40 Q25,60 50,40 T100,40";
          }
        }
        .animate-wave1 {
          animation: wave1 12s ease-in-out infinite;
        }
        .animate-wave2 {
          animation: wave2 10s ease-in-out infinite;
        }
        .animate-wave3 {
          animation: wave3 15s ease-in-out infinite;
        }
      `}</style>

      {/* Apply the custom background animations */}
      <MovingGrid />
      <FloatingCubes />
      <WavyLines />
      <MatrixRain />

      {/* Original background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-green-400 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-blue-500 blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-32 h-32 rounded-full bg-purple-500 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-teal-400 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/30 blur-3xl"></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            }}
          ></div>
        ))}
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-5 md:pt-24">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left content area */}
          <motion.div
            className="w-full md:w-3/5 mt-10 md:mt-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block text px-4 py-1 bg-green-400/10 text-green-400 rounded-full text-sm font-medium mb-4"
            >
              Welcome to my portfolio
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
            >
              Hi, I'm <span className="text-green-400">Sumon</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl font-medium text-green-400 mb-6"
            >
              <TypeWriter />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl"
            >
              I'm a full-stack developer & create websites that help businesses
              grow by turning visitors into loyal customers — ideal for anyone
              looking to expand their online presence.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                href="https://drive.google.com/file/d/12kPSgIZTDIhltFvGZuQ5P1BqCbGefrBg/view?usp=sharing"
                target="_blank"
              >
                <button className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium rounded-lg flex items-center gap-2 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300 overflow-hidden">
                  <span className="absolute inset-0 bg-green-700 opacity-0 group-active:opacity-20 transition-all duration-300 rounded-lg"></span>
                  <FaDownload className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative">Download Resume</span>
                </button>
              </Link>

              <button className="relative px-[53px] py-2 border-2 border-gray-700 text-gray-300 font-medium rounded-lg overflow-hidden group hover:text-white transition-all duration-300 hover:border-none hover:shadow-[0_0_15px_2px_rgba(34,197,94,0.5)] active:scale-95">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"></span>
                <span className="relative z-10">View Projects</span>
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              <a
                href="https://github.com/sumon-devCoder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 hover:from-green-400 hover:to-emerald-600 text-gray-300 hover:text-white border border-gray-600 hover:border-green-400/50 transition-all duration-300 shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl transition-transform duration-300 hover:scale-110" />
              </a>

              <a
                href="https://www.linkedin.com/in/sumon-devcoder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-gray-300 hover:text-white border border-blue-500 hover:border-blue-400/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl transition-transform duration-300 hover:scale-110" />
              </a>

              <a
                href="https://wa.me/+8801962878499"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-gray-300 hover:text-white border border-green-600 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="text-xl transition-transform duration-300 hover:scale-110" />
              </a>

              <a
                href="https://facebook.com/sumon.devCoder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-gray-300 hover:text-white border border-blue-600 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-1"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl transition-transform duration-300 hover:scale-110" />
              </a>

              <a
                href="https://instagram.com/sumon.devcoder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-gray-300 hover:text-white border border-pink-600 hover:border-pink-500/50 transition-all duration-300 shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl transition-transform duration-300 hover:scale-110" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right image area */}
          <motion.div
            className="w-full md:w-2/5 flex justify-center mt-16 md:mt-0"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              {/* Animated border effect */}
              <div className="absolute  inset-0 rounded-2xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 blur-md opacity-70 animate-pulse"></div>

              {/* Image container */}
              <div className="relative bg-gray-900 p-2 rounded-2xl overflow-hidden">
                {/* Replace with your image */}
                <div className="aspect-square w-full max-w-md overflow-hidden rounded-xl">
                  <Image
                    src="/assets/sumon.jpeg"
                    width={400}
                    height={400}
                    alt="Sumon Developer"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

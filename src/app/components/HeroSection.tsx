/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from "react";
import {
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

// ── TypeWriter ────────────────────────────────────────────────────────────────
const TypeWriter = () => {
  const titles = [
    "Software Quality Assurance Engineer",
    "Manual & Automation Tester",
    "Cypress Automation Tester",
    "Playwright Automation Tester",
  ];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const title = titles[currentTitleIndex];
    const updateText = () => {
      if (!isDeleting) {
        setDisplayText(title.substring(0, displayText.length + 1));
        if (displayText === title) setTimeout(() => setIsDeleting(true), 1500);
      } else {
        setDisplayText(title.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    };
    const t = setTimeout(updateText, isDeleting ? 50 : 150);
    return () => clearTimeout(t);
  }, [displayText, currentTitleIndex, isDeleting]);

  return (
    <span className="inline-block min-h-8">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// ── Background decorations ────────────────────────────────────────────────────
const MovingGrid = () => (
  <div className="absolute inset-0 overflow-hidden opacity-10">
    <div
      className="absolute w-full h-full"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(49,151,149,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(49,151,149,0.1) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        animation: "moveGrid 15s linear infinite",
      }}
    />
  </div>
);


const WavyLines = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg className="absolute w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d="M0,50 Q25,30 50,50 T100,50" stroke="rgba(74,222,128,0.5)" strokeWidth="0.3" fill="none" className="animate-wave1" />
      <path d="M0,60 Q25,40 50,60 T100,60" stroke="rgba(45,212,191,0.5)" strokeWidth="0.3" fill="none" className="animate-wave2" />
      <path d="M0,40 Q25,60 50,40 T100,40" stroke="rgba(59,130,246,0.5)" strokeWidth="0.3" fill="none" className="animate-wave3" />
    </svg>
  </div>
);

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(0);
    let id: number;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(34,197,94,0.35)";
      ctx.font = "15px monospace";
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 20, drops[i] * 20);
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 opacity-20" style={{ pointerEvents: "none" }} />;
};

// ── Constants ─────────────────────────────────────────────────────────────────
const CROP_TOP = 60;   // hides channel name + icon bar at top
const CROP_BOT = 50;   // clips the black YouTube control bar at the bottom

// Mini-player dimensions (visible area after cropping)
const MINI_VW = 360;   // visible width
const MINI_VH = 202;   // visible height (pure video, no chrome, no black bar)

// Mini-player position — top-right corner
const MINI_RIGHT_OUTER = 16;   // gap from viewport right edge to video right edge
const MINI_CLOSE_SIZE  = 28;   // close button diameter
const MINI_TOP         = 80;   // distance from top of viewport (navbar height + small gap)

// ── Single-iframe floating video ──────────────────────────────────────────────
//
// ONE <iframe> always in the DOM, moved with CSS transitions.
// A transparent placeholder <div> in the hero keeps layout space reserved.
// Video loops via YouTube's loop=1&playlist= parameter.
//
const FloatingVideo = () => {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [isMini, setIsMini] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [heroRect, setHeroRect] = useState<DOMRect | null>(null);
  // After the iframe has been placed at the mini position at least once,
  // we allow CSS transitions. Until then, movements are instant (no travel).
  const miniReadyRef = useRef(false);

  const measure = () => {
    if (placeholderRef.current)
      setHeroRect(placeholderRef.current.getBoundingClientRect());
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        const nowMini = !entry.isIntersecting;
        setIsMini(nowMini);
        if (entry.isIntersecting) setHidden(false);
      },
      { threshold: 0.1 }
    );
    if (placeholderRef.current) obs.observe(placeholderRef.current);
    return () => obs.disconnect();
  }, []);

  // loop=1 requires playlist= set to the same video ID for YouTube looping to work
  const VIDEO_ID = "gcX8ncx0f00";
  const src = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&controls=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&enablejsapi=1`;

  const TRANS = "top 0.45s cubic-bezier(0.4,0,0.2,1), left 0.45s cubic-bezier(0.4,0,0.2,1), width 0.45s cubic-bezier(0.4,0,0.2,1), height 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, box-shadow 0.45s ease, clip-path 0.45s ease";

  const getIframeStyle = (): React.CSSProperties => {
    // Mini position constants (reused in multiple branches)
    const miniTop  = MINI_TOP - CROP_TOP;
    const miniLeft = `calc(100vw - ${MINI_VW + MINI_RIGHT_OUTER}px)`;
    const miniH    = MINI_VH + CROP_TOP + CROP_BOT;
    const miniClip = `inset(${CROP_TOP}px 0px ${CROP_BOT}px 0px round 12px)`;

    if (!isMini && heroRect) {
      // ── Hero mode ──
      // Once we return to hero, re-enable transition for future mini trips
      miniReadyRef.current = false;
      const iframeH = heroRect.height + CROP_TOP + CROP_BOT;
      return {
        position: "fixed",
        zIndex: 9999,
        border: "none",
        transition: TRANS,
        pointerEvents: "auto",
        opacity: 1,
        top: heroRect.top - CROP_TOP,
        left: heroRect.left,
        width: heroRect.width,
        height: iframeH,
        clipPath: `inset(${CROP_TOP}px 0px ${CROP_BOT}px 0px round 12px)`,
        boxShadow: "0 20px 60px -10px rgba(34,197,94,0.3)",
      };
    }

    if (isMini && !hidden) {
      // ── Mini mode ──
      // On the FIRST time we go mini, skip transition (instant snap to top-right).
      // On subsequent times (returning from hero) allow the smooth slide.
      const trans = miniReadyRef.current ? TRANS : "none";
      miniReadyRef.current = true;  // mark as positioned, enable transitions next time
      return {
        position: "fixed",
        zIndex: 9999,
        border: "none",
        transition: trans,
        pointerEvents: "auto",
        opacity: 1,
        top: miniTop,
        left: miniLeft,
        width: MINI_VW,
        height: miniH,
        clipPath: miniClip,
        boxShadow: "0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(74,222,128,0.25)",
      };
    }

    // ── Hidden / closed ──
    // Park at mini position (invisible) so if reopened there's no travel from
    // a stale off-screen coordinate.
    return {
      position: "fixed",
      zIndex: 9999,
      border: "none",
      transition: "opacity 0.2s ease",   // only fade, no spatial movement
      pointerEvents: "none",
      opacity: 0,
      top: miniTop,
      left: miniLeft,
      width: MINI_VW,
      height: miniH,
      clipPath: miniClip,
    };
  };

  // Close button sits inside the top-right corner of the visible mini video.
  // `right` is measured from viewport right edge.
  // Video right edge = MINI_RIGHT_OUTER from viewport right.
  // Button is inset 8px from both the right and top edges of the video.
  const CLOSE_INSET = 8;
  const closeButtonStyle: React.CSSProperties = {
    position: "fixed",
    top: MINI_TOP + CLOSE_INSET,
    right: MINI_RIGHT_OUTER + CLOSE_INSET,
    zIndex: 10000,
    width: `${MINI_CLOSE_SIZE}px`,
    height: `${MINI_CLOSE_SIZE}px`,
    borderRadius: "50%",
    background: "rgba(17,24,39,0.85)",
    border: "1px solid rgba(74,222,128,0.4)",
    color: "#e5e7eb",
    fontSize: "18px",
    lineHeight: "1",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s, color 0.2s",
    backdropFilter: "blur(4px)",
  };

  return (
    <>
      {/* Invisible placeholder — reserves layout space in the hero */}
      <div
        ref={placeholderRef}
        style={{
          width: "100%",
          aspectRatio: "16/10",
          minHeight: "300px",
          visibility: "hidden",
        }}
      />

      {/* Single persistent iframe — never unmounts, video never restarts */}
      <iframe
        src={src}
        style={getIframeStyle()}
        title="Tasmia Khan Portfolio"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* Mini-player close button — only shown in mini mode */}
      {isMini && !hidden && (
        <button
          onClick={() => setHidden(true)}
          style={closeButtonStyle}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.9)";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(17,24,39,0.95)";
            (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af";
          }}
          aria-label="Close mini player"
        >
          ×
        </button>
      )}
    </>
  );
};

// ── HeroSection ───────────────────────────────────────────────────────────────
const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  const rightVariants = {
    hidden: { scale: 0.9, opacity: 0, x: 30 },
    visible: {
      scale: 1, opacity: 1, x: 0,
      transition: { type: "spring", stiffness: 90, damping: 18, duration: 0.8 },
    },
  };

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden scroll-mt-28"
    >
      <style jsx global>{`
        @keyframes moveGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-50px, -50px); }
        }
        @keyframes floatUpDown {
          0% { transform: translate(0, 0) rotate(45deg); }
          100% { transform: translate(0, -100px) rotate(45deg); }
        }
        @keyframes spinSlow {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }
        .animate-wave1 { animation: wave1 12s ease-in-out infinite; }
        .animate-wave2 { animation: wave2 10s ease-in-out infinite; }
        .animate-wave3 { animation: wave3 15s ease-in-out infinite; }
        @keyframes wave1 {
          0%, 100% { d: path("M0,50 Q25,30 50,50 T100,50"); }
          50%       { d: path("M0,50 Q25,70 50,50 T100,50"); }
        }
        @keyframes wave2 {
          0%, 100% { d: path("M0,60 Q25,40 50,60 T100,60"); }
          50%       { d: path("M0,60 Q25,80 50,60 T100,60"); }
        }
        @keyframes wave3 {
          0%, 100% { d: path("M0,40 Q25,60 50,40 T100,40"); }
          50%       { d: path("M0,40 Q25,20 50,40 T100,40"); }
        }
      `}</style>

      <MovingGrid />
      <WavyLines />
      <MatrixRain />

      {/* Ambient glows */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-green-400 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-blue-500 blur-3xl animate-pulse" />
        <div className="absolute top-40 right-32 w-32 h-32 rounded-full bg-purple-500 blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-teal-400 blur-3xl animate-pulse" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          />
        ))}
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-5 md:pt-24">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">

          {/* ── Left content ── */}
          <motion.div
            className="w-full md:w-3/5 mt-10 md:mt-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span variants={itemVariants} className="inline-block px-4 py-1 bg-green-400/10 text-green-400 rounded-full text-sm font-medium mb-4">
              Welcome to my portfolio
            </motion.span>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Hi, I'm <span className="text-green-400">Tasmia</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="text-xl md:text-2xl lg:text-3xl font-medium text-green-400 mb-6">
              <TypeWriter />
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
              I ensure software quality through detailed manual testing and reliable automation, helping businesses launch stable and scalable products.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <Link href="https://drive.google.com/drive/folders/1ndRPScQwzS_IWkYhL_vIXR1yXy3kHxvk?usp=drive_link" target="_blank">
                <button className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium rounded-lg flex items-center gap-2 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300">
                  <FaDownload className="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Download Resume</span>
                </button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              {[
                { href: "https://github.com/KTasmi", icon: <FaGithub className="text-xl" />, label: "GitHub", cls: "from-gray-700 to-gray-800 hover:from-green-400 hover:to-emerald-600 border-gray-600 hover:border-green-400/50 hover:shadow-green-500/30" },
                { href: "https://www.linkedin.com/in/KhanTasmia/", icon: <FaLinkedin className="text-xl" />, label: "LinkedIn", cls: "from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-blue-500 hover:border-blue-400/50 hover:shadow-blue-500/30" },
                { href: "https://wa.me/+8801621296671", icon: <FaWhatsapp className="text-xl" />, label: "WhatsApp", cls: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-green-600 hover:border-green-500/50 hover:shadow-green-500/30" },
                { href: "https://www.facebook.com/share/1CsxTi79hD/", icon: <FaFacebook className="text-xl" />, label: "Facebook", cls: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-blue-600 hover:border-blue-500/50 hover:shadow-blue-600/30" },
              ].map(({ href, icon, label, cls }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${cls} text-gray-300 hover:text-white border transition-all duration-300 shadow-lg transform hover:-translate-y-1`}>
                  {icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: video ── */}
          <motion.div
            className="w-full md:w-2/5 flex justify-center mt-16 md:mt-0 relative"
            initial="hidden"
            animate="visible"
            variants={rightVariants}
          >
            <div className="relative w-full max-w-md">
              <FloatingVideo />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
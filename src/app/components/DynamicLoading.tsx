"use client";

import React from "react";
import { motion } from "framer-motion";

const DynamicLoading = () => {
  const containerVariants = {
    start: { transition: { staggerChildren: 0.2 } },
    end: { transition: { staggerChildren: 0.2 } },
  };

  const circleVariants = {
    start: { y: "0%" },
    end: { y: "100%" },
  };

  const circleTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const, // Ensures repeatType matches Framer Motion's typing
    ease: "easeInOut",
  };

  return (
    <div style={styles.loaderContainer}>
      <motion.div
        variants={containerVariants}
        initial="start"
        animate="end"
        style={styles.loaderWrapper}
      >
        {["#FF6FD8", "#6F86FF", "#6FFFA2"].map((color, index) => (
          <motion.span
            key={index}
            style={{
              ...styles.circle,
              background: `linear-gradient(135deg, ${color}, #ffffff)`,
            }}
            variants={circleVariants}
            transition={circleTransition}
          />
        ))}
      </motion.div>
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20vh",
    background: "", // Changed the background color to black
  },
  loaderWrapper: {
    display: "flex",
    gap: "10px",
  },
  circle: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "block",
  },
};

export default DynamicLoading;

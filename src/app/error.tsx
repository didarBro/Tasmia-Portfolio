"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const GlobalError = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-emerald-900 text-white text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400 mb-4">
          Oops! Something went wrong
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          We hit an unexpected error
        </h1>
        <p className="text-sm md:text-base text-emerald-100/80 mb-8">
          An unexpected issue occurred while loading this page. You can try
          again, or head back to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold shadow-lg shadow-emerald-500/30 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-emerald-400/60 text-sm font-semibold hover:bg-emerald-500/10 transition-colors"
          >
            🏠 Back to Home
          </Link>
        </div>

        <p className="mt-6 text-xs text-emerald-200/60">
          If this keeps happening, please contact me so I can take a look.
        </p>
      </motion.div>
    </section>
  );
};

export default GlobalError;

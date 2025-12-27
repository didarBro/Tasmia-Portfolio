"use client";

import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion"; // For animations

const Error = ({
  error,
}: {
  error: Error & { digest?: string };
  rest?: () => void;
}) => {
  return (
    <>
      <Head>
        <title>Something Went Wrong</title>
        <meta name="description" content="An unexpected error has occurred." />
      </Head>
      <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-900 to-purple-800 text-white text-center p-8">
        <motion.h1
          className="text-6xl font-extrabold text-red-400 text-shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Oops! Something Went Wrong
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl my-6 font-medium tracking-wide text-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {error.message}. Please try again or head back to the homepage.
        </motion.p>
        <motion.div
          className="flex flex-col space-y-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="/" passHref>
            <motion.button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-xl transform hover:scale-110 transition duration-300"
              whileHover={{ scale: 1.1 }}
            >
              🏠 Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default Error;

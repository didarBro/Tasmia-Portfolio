import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-emerald-900 text-white px-4">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400 mb-3">
          404 — Page not found
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Oops! This page doesn&apos;t exist
        </h1>
        <p className="text-sm md:text-base text-emerald-100/80 mb-8">
          The page you&apos;re looking for might have been moved, renamed, or
          never existed. You can explore other sections of the portfolio or
          return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold shadow-lg shadow-emerald-500/30 transition-colors"
          >
            🏠 Back to Home
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-3 rounded-full border border-emerald-400/60 text-sm font-semibold hover:bg-emerald-500/10 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

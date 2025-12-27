import NextTopLoader from "nextjs-toploader";
import React from "react";

const TopLoader = () => {
  return (
    <div>
      <NextTopLoader
        color="#9ef01a"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        zIndex={1600}
        showAtBottom={false}
      />
    </div>
  );
};

export default TopLoader;

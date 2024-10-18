import React from "react";
import Banner from "../../assets/homepage/banner.webp";

const HomepageBanner = () => {
  return (
    <div className="homepage-banner mt-10">
      <img src={Banner} alt="Homepage Banner" className="w-full" />
    </div>
  );
};

export default HomepageBanner;

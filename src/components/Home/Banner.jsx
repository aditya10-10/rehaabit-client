import React, { useState } from "react";
import Banner from "../../assets/homepage/banner.webp";
import EnquireNowModal from "./EnquireNowModal";

const HomepageBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBannerClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="homepage-banner mt-10">
        <img
          src={Banner}
          alt="Homepage Banner"
          className="w-full cursor-pointer"
          onClick={handleBannerClick}
        />
      </div>
      <EnquireNowModal
         isEnquireNowModalOpen={isModalOpen}
        handleEnquireNowModal={() => setIsModalOpen(false)}
        serviceNameToPass="From Banner"
      />
    </>
  );
};

export default HomepageBanner;

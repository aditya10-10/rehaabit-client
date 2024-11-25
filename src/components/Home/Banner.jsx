import React, { useState } from "react";
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
          src="https://res.cloudinary.com/duizbchmz/image/upload/v1732437085/banner_cpb4n4.webp"
          alt="Enquire Now Banner to take enquiries from customers"
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

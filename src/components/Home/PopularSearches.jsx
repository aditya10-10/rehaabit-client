import { useSelector } from "react-redux";
import EnquireNowModal from "./EnquireNowModal";
import { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ServiceDetailsModal from "../ServiceDetailsModal";

const PopularSearches = () => {
  const { allServices } = useSelector((state) => state.service);

  // State management for modals and the selected service ID
  const [isEnquireNowModalOpen, setIsEnquireNowModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceIdToPass, setServiceIdToPass] = useState(null);

  const nonPricedServices = allServices.filter(
    (service) =>
      service.priceStatus === "non-priced" && service.status !== "Draft"
  );

  // Scroll reference and scroll logic
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -355 : 355,
        behavior: "smooth",
      });
    }
  };

  // Function to open the Service Details Modal
  const handleServiceModalOpen = (serviceId) => {
    setServiceIdToPass(serviceId); // Pass the selected service ID
    setIsServiceModalOpen(true); // Open the Service Details Modal
  };

  // Function to close the Service Details Modal
  const handleServiceModalClose = () => {
    setIsServiceModalOpen(false); // Close the Service Details Modal
  };

  // Function to open the Enquire Now Modal
  const handleEnquireNowModalOpen = (serviceId) => {
    setServiceIdToPass(serviceId); // Pass the selected service ID
    setIsEnquireNowModalOpen(true); // Open the Enquire Now Modal
  };

  // Function to close the Enquire Now Modal
  const handleEnquireNowModalClose = () => {
    setIsEnquireNowModalOpen(false); // Close the Enquire Now Modal
  };

  return (
    <>
      {/* Enquire Now Modal */}
      <EnquireNowModal
        isEnquireNowModalOpen={isEnquireNowModalOpen}
        handleEnquireNowModal={handleEnquireNowModalClose}
        serviceIdToPass={serviceIdToPass}
      />

      {/* Service Details Modal */}
      <ServiceDetailsModal
        isServiceModalOpen={isServiceModalOpen}
        handleServiceModal={handleServiceModalClose}
        serviceId={serviceIdToPass}
      />

      <section className="relative flex flex-col px-10 mt-40 w-full max-md:mt-10 max-md:max-w-full max-md:px-0 max-md:pl-4">
        <h2 className="text-6xl text-center text-violet-900 leading-[67.2px] max-md:max-w-full max-md:text-4xl">
          Popular Searches
        </h2>

        <div className="flex items-center justify-between mt-12 max-md:mt-10 w-full relative">
          {/* Left Arrow */}
          <button
            className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md"
            onClick={() => scroll("left")}
          >
            <FaArrowLeft size={24} />
          </button>

          {/* Scrollable Content */}
          <div
            ref={scrollRef}
            className="flex gap-4 justify-start self-center w-full flex-nowrap overflow-x-auto px-4 scroll-smooth"
          >
            {nonPricedServices.map((service, index) => {
              const { _id, thumbnail, serviceName } = service;

              return (
                <div
                  key={_id}
                  className={`min-w-[20rem] flex-shrink-0 snap-start ${
                    index === 0 ? "ml-4" : ""
                  } ${index === nonPricedServices.length - 1 ? "mr-4" : ""}`}
                >
                  <img
                    src={thumbnail}
                    alt={serviceName}
                    className="w-full h-56 rounded-tl-xl rounded-tr-xl object-cover"
                  />

                  <div className="bg-blue-500 px-6 py-4 rounded-bl-xl rounded-br-xl">
                    <h1 className="text-white text-2xl mb-4">{serviceName}</h1>

                    {/* Redesigned Button */}
                    <button
                      className="text-green-600 bg-white px-6 py-2 rounded-full mr-4 transition-all duration-300 hover:bg-green-600 hover:text-white shadow-lg border border-green-600"
                      onClick={() => handleServiceModalOpen(_id)} // Open Service Modal
                    >
                      More Details
                    </button>
                    <button
                      className="text-purple-600 bg-white px-6 py-2 rounded-full transition-all duration-300 hover:bg-purple-600 hover:text-white shadow-lg border border-purple-600"
                      onClick={() => handleEnquireNowModalOpen(_id)} // Open Enquire Now Modal
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md"
            onClick={() => scroll("right")}
          >
            <FaArrowRight size={24} />
          </button>
        </div>
      </section>
    </>
  );
};

export default PopularSearches;

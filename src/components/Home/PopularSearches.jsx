import { useSelector } from "react-redux";
import EnquireNowModal from "./EnquireNowModal";
import { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PopularSearches = () => {
  const { allServices } = useSelector((state) => state.service);

  const [isEnquireNowModalOpen, setIsEnquireNowModalOpen] = useState(false);
  const [serviceIdToPass, setServiceIdToPass] = useState(null);

  const nonPricedServices = allServices.filter(
    (service) => service.priceStatus === "non-priced"
  );

  const handleEnquireNowModal = () => {
    setIsEnquireNowModalOpen(!isEnquireNowModalOpen);
  };

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <EnquireNowModal
        isEnquireNowModalOpen={isEnquireNowModalOpen}
        handleEnquireNowModal={handleEnquireNowModal}
        serviceIdToPass={serviceIdToPass}
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

                    <button
                      className="text-blue-500 bg-white px-4 py-2 rounded-md"
                      onClick={() => {
                        setServiceIdToPass(_id);
                        handleEnquireNowModal();
                      }}
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

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EnquireNowModal from "./EnquireNowModal";
import ServiceDetailsModal from "../ServiceDetailsModal";

const AllServicesPage = () => {
  const { allServices } = useSelector((state) => state.service);
  const navigate = useNavigate();

  const [isEnquireNowModalOpen, setIsEnquireNowModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [serviceNameToPass, setServiceNameToPass] = useState(null);

  const limitedNonPricedServices = allServices?.filter(
    (service) =>
      service?.priceStatus === "non-priced" && service?.status !== "Draft"
  );
  // const nonPricedServices = limitedNonPricedServices?.slice(0, 10);

  const handleServiceModalOpen = (serviceId) => {
    setServiceId(serviceId);
    setIsServiceModalOpen(true);
  };

  const handleServiceModalClose = () => {
    setIsServiceModalOpen(false);
    setServiceId(null);
  };

  const handleEnquireNowModalOpen = (serviceName) => {
    setServiceNameToPass(serviceName);
    setIsEnquireNowModalOpen(true);
  };

  const handleEnquireNowModalClose = () => setIsEnquireNowModalOpen(false);

  const LoadingSkeleton = () => (
    <div className="w-full max-w-[300px] animate-pulse">
      <div className="w-full h-56 bg-gray-200 rounded-t-lg" />
      <div className="bg-gray-300 p-4 rounded-b-lg">
        <div className="h-8 bg-gray-200 rounded mb-3" />
        <div className="flex gap-4">
          <div className="w-24 h-10 bg-gray-200 rounded-full" />
          <div className="w-24 h-10 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <EnquireNowModal
        isEnquireNowModalOpen={isEnquireNowModalOpen}
        handleEnquireNowModal={handleEnquireNowModalClose}
        serviceNameToPass={serviceNameToPass}
      />

      <ServiceDetailsModal
        isServiceModalOpen={isServiceModalOpen}
        handleServiceModal={handleServiceModalClose}
        serviceId={serviceId}
      />

      <section className="flex h-full flex-col items-center px-4 sm:px-6 lg:px-8 mt-2 sm:mt-10 w-full">
        <div className="w-full p-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-violet-700 text-center">
            All Services
          </h2>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {!limitedNonPricedServices ? (
              <div className="flex flex-wrap justify-center gap-4">
                {[...Array(6)].map((_, index) => (
                  <LoadingSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            ) : (
              limitedNonPricedServices.map((service, index) => {
                const { _id, thumbnail, serviceName } = service;

                return (
                  <div
                    key={_id}
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md flex-shrink-0 snap-center mx-auto"
                  >
                    <img
                      src={thumbnail}
                      alt={serviceName}
                      className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-t-lg"
                    />

                    <div className="bg-blue-500 px-4 sm:px-6 py-3 sm:py-4 rounded-b-lg">
                      <h3 className="text-white font-semibold text-sm sm:text-base md:text-sm lg:text-base mb-2">
                        {serviceName}
                      </h3>

                      <div className="flex justify-between items-center">
                        <button
                          className="text-green-600 bg-white px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-5 md:mr-2 md:py-1 md:text-xs lg:px-5 lg:py-1 lg:text-sm xl:px-4 xl:py-2 xl:text-sm rounded-full transition-all duration-300 hover:bg-green-600 hover:text-white shadow-lg border border-green-600"
                          onClick={() => handleServiceModalOpen(_id)}
                        >
                          More Details
                        </button>
                        <button
                          className="text-purple-600 bg-white px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm md:px-5 md:py-1 md:text-xs lg:px-5 lg:py-1  lg:text-sm xl:px-4 xl:py-2 xl:text-sm rounded-full transition-all duration-300 hover:bg-purple-600 hover:text-white shadow-lg border border-purple-600"
                          onClick={() => handleEnquireNowModalOpen(serviceName)}
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllServicesPage;

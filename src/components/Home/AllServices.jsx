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

      <section className="flex   flex-col items-center px-4 sm:px-6 lg:px-8 mt-2 sm:mt-10 w-full">
        <div className="w-full  p-16 ">
          <h2 className="text-3xl sm:text-4xl font-semibold text-violet-700 text-center">
            All Services
          </h2>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {!allServices ? (
              <div className="flex flex-wrap justify-center gap-4">
                {[...Array(6)].map((_, index) => (
                  <LoadingSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            ) : (
              allServices.map((service) => {
                const { _id, thumbnail, serviceName } = service;

                return (
                  <div
                    key={_id}
                    className="bg-white rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={thumbnail}
                      alt={serviceName}
                      className="w-full h-56 object-cover rounded-t-xl"
                    />
                    <div className="bg-blue-500 p-4 rounded-b-xl">
                      <h3 className="text-white font-semibold text-lg text-center">
                        {serviceName}
                      </h3>
                      <div className="flex justify-center mt-4 gap-4">
                        <button
                          className="text-green-600 bg-white px-1 rounded-full transition-all duration-300 hover:bg-green-600 hover:text-white shadow-lg border border-green-600"
                          onClick={() => handleServiceModalOpen(_id)}
                        >
                          More Details
                        </button>
                        <button
                          className="text-purple-600 bg-white px-4 py-2 rounded-full transition-all duration-300 hover:bg-purple-600 hover:text-white shadow-lg border border-purple-600"
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

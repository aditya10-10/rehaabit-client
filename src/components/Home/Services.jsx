import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import serviceImage from "../../assets/images/Services.webp";
import ServiceDetailsModal from "../ServiceDetailsModal";
import { GoStar, GoStarFill } from "react-icons/go";

const ServiceCard = ({
  serviceName,
  serviceDescription,
  price,
  thumbnail,
  ratingAndReviews,
  avgRating,
}) => {
  const rating = avgRating > 0 ? avgRating : 0;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index}>
        {index + 1 <= rating ? (
          <GoStarFill className="text-yellow-400" />
        ) : (
          <GoStar className="text-gray-400" />
        )}
      </span>
    ));
  };

  return (
    <div className="flex flex-col justify-center items-start px-4 py-2 mt-4 bg-amber-50 rounded-xl shadow-sm max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5">
        <img src={thumbnail} alt="Thumbnail" className="w-20 h-20 rounded-xl" />
        <div className="flex flex-col">
          <h3>
            <span className="text-lg font-semibold text-black">
              {serviceName}
            </span>
          </h3>
          <p>
            <span className="text-sm text-zinc-700">
              {serviceDescription.length > 30
                ? `${serviceDescription.slice(0, 30)}...`
                : serviceDescription}
            </span>
          </p>
          <p>
            <span className="text-sm text-zinc-700">₹ {price}</span>
          </p>
          <div className="flex items-center gap-1">
            {renderStars(rating)}
            <span className="text-gray-500 text-sm">({rating}/5)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const { allServices } = useSelector((state) => state.service);
  const [serviceId, setServiceId] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const location = useLocation();
  const servicesRef = useRef(null);
  console.log(servicesRef)
  useEffect(() => {
    if (location.state?.scrollTo === "services") {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
      if (location.state.serviceId) {
        setServiceId(location.state.serviceId);
        setIsServiceModalOpen(true);
      }
    }
    
  }, [location]);

  const handleServiceModal = () => {
    setIsServiceModalOpen(!isServiceModalOpen);
    // Clear the location state when closing the modal
    if (isServiceModalOpen && location.state?.serviceId) {
      window.history.replaceState({}, document.title, location.pathname);
    }
  };

  const pricedServices = allServices.filter(
    (service) => service.priceStatus === "priced" && service.status !== "Draft"
  );

  return (
    <>
      <ServiceDetailsModal
        isServiceModalOpen={isServiceModalOpen}
        handleServiceModal={handleServiceModal}
        serviceId={serviceId}
      />

      <section
        ref={servicesRef}
        className="self-center mt-44 w-full px-20 max-w-[1064px] max-md:mt-10 max-md:max-w-full max-md:px-10 max-sm:px-2"
      >
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:hidden">
            <img
              loading="lazy"
              src={serviceImage}
              alt="All Types of Home Service in Mumbai"
              className="mt-3 w-full aspect-[0.65]"
            />
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 max-md:mt-10 max-md:max-w-full">
              <h2 className="text-4xl font-semibold text-center text-violet-700 max-md:max-w-full">
                Services{" "}
              </h2>
              {pricedServices.slice(0, 5).map((service) => (
                <div
                  key={service._id}
                  className="w-full cursor-pointer"
                  onClick={() => {
                    setIsServiceModalOpen(!isServiceModalOpen);
                    setServiceId(service?._id);
                  }}
                >
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

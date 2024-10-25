import React from "react";
import ElectricBoard from "../../assets/homepage/EletricBoard.webp";
import Plumber from "../../assets/homepage/Plumber.webp";
import Cleaning from "../../assets/homepage/cleaning1.webp";
import Carpentry from "../../assets/homepage/Carpentar.webp";
import Painter from "../../assets/homepage/painter.webp";
import HVAC from "../../assets/homepage/HVACServices.webp";
import Security from "../../assets/homepage/Sercirty.webp";

const WhatWeOffer = () => {
  return (
    <div className="bg-slate-100 mt-10">
      <div className="container mx-auto px-4 py-8">
        {/* Our Home Services Section */}
        <h2 className="text-3xl font-bold text-center mb-6">What we offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Electrical Services Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={ElectricBoard}
              alt="Electrician using a screwdriver to fix an electrical socket"
            />
            <h3 className="text-xl font-semibold mt-4">Electrical Services</h3>
            <p className="text-gray-600 mt-2">
              Our certified electricians handle everything from installations to
              repairs and maintenance, ensuring your home is safe and up-to-date
              with reliable electrical solutions.
            </p>
          </div>

          {/* Plumbing Services Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={Plumber}
              alt="Plumber fixing a pipe under a kitchen sink with tools"
            />
            <h3 className="text-xl font-semibold mt-4">Plumbing Services</h3>
            <p className="text-gray-600 mt-2">
              From leaky faucets to full plumbing system installations, our
              experts ensure smooth and reliable plumbing solutions tailored to
              your home’s needs.
            </p>
          </div>

          {/* Cleaning Services Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={Cleaning}
              alt="Professional cleaners working on a living room, scrubbing the floor and furniture"
            />
            <h3 className="text-xl font-semibold mt-4">Cleaning Services</h3>
            <p className="text-gray-600 mt-2">
              We offer deep cleaning services for every corner of your home,
              making sure it's spotless and hygienic from top to bottom,
              ensuring a fresh and healthy living space.
            </p>
          </div>
        </div>

        {/* Additional Services Section */}
        <h2 className="text-3xl font-bold text-center mt-12 mb-6">
          Your One-stop Solution for Home Maintenance
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Whether you need repairs, installations, or general maintenance, we
          have expert teams across all home services, ready to make your life
          easier.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Carpentry Services Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={Carpentry}
              alt="Carpenter working on custom woodwork using a measuring tool"
            />
            <h3 className="text-xl font-semibold mt-4">Carpentry Services</h3>
            <p className="text-gray-600 mt-2">
              Custom woodwork, furniture repairs, and installations — we provide
              skilled carpentry solutions to meet your needs and help you create
              beautiful, functional spaces in your home.
            </p>
          </div>

          {/* HVAC & Air Conditioning Services */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={HVAC}
              alt="HVAC technician installing an air conditioner unit"
            />
            <h3 className="text-xl font-semibold mt-4">HVAC Services</h3>
            <p className="text-gray-600 mt-2">
              Ensure a comfortable living environment with our heating,
              ventilation, and air conditioning installation and repair
              services. We help keep your home cool in summer and warm in
              winter.
            </p>
          </div>

          {/* Painting Services Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={Painter}
              alt="Painter applying a fresh coat of paint to a home’s interior wall with a roller"
            />
            <h3 className="text-xl font-semibold mt-4">Painting Services</h3>
            <p className="text-gray-600 mt-2">
              Refresh the look of your home with our interior and exterior
              painting services, delivered with professional precision for a
              polished, long-lasting finish.
            </p>
          </div>

          {/* Home Security Installations Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={Security}
              alt="Security technician installing a CCTV camera on a wall"
            />
            <h3 className="text-xl font-semibold mt-4">
              Home Security Installations
            </h3>
            <p className="text-gray-600 mt-2">
              Keep your home secure with our advanced security system
              installations, including CCTV, alarms, and smart locks, providing
              peace of mind for you and your family.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;

import React from "react";
import ElectricBoard from "../../assets/homepage/EletricBoard.svg";
import Plumber from "../../assets/homepage/Plumber.svg";
import Cleaning from "../../assets/homepage/cleaning1.svg";
import Carpentry from "../../assets/homepage/Carpentar.svg";
import Painter from "../../assets/homepage/painter.svg";
import HVAC from "../../assets/homepage/HVAC Services.svg";
import Security from "../../assets/homepage/Sercirty.svg";

const WhatWeOffer = () => {
  return (
    <div
      className="bg-slate-100 mt-10"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Our Home Services Section */}
        <h2 className="text-3xl font-bold text-center mb-6">What we offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Electrical Services Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={ElectricBoard}
              alt="Electrical Services"
            />
            <h3 className="text-xl font-semibold mt-4">Electrical Services</h3>
            <p className="text-gray-600 mt-2">
              Our certified electricians handle everything from installations to
              repairs and maintenance, ensuring your home is safe and
              up-to-date.
            </p>
          </div>

          {/* Plumbing Services Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={Plumber}
              alt="Plumbing Services"
            />
            <h3 className="text-xl font-semibold mt-4">Plumbing Services</h3>
            <p className="text-gray-600 mt-2">
              From leaky faucets to full plumbing system installations, our
              experts ensure smooth and reliable plumbing solutions.
            </p>
          </div>

          {/* Cleaning Services Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={Cleaning}
              alt="Cleaning Services"
            />
            <h3 className="text-xl font-semibold mt-4">Cleaning Services</h3>
            <p className="text-gray-600 mt-2">
              We offer deep cleaning services for every corner of your home,
              making sure it’s spotless and hygienic from top to bottom.
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
              alt="Carpentry Services"
            />
            <h3 className="text-xl font-semibold mt-4">Carpentry Services</h3>
            <p className="text-gray-600 mt-2">
              Custom woodwork, furniture repairs, and installations — we provide
              skilled carpentry solutions to meet your needs.
            </p>
          </div>

          {/* HVAC & Air Conditioning Services */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={HVAC}
              alt="HVAC Services"
            />
            <h3 className="text-xl font-semibold mt-4">HVAC Services</h3>
            <p className="text-gray-600 mt-2">
              Ensure a comfortable living environment with our heating,
              ventilation, and air conditioning installation and repair
              services.
            </p>
          </div>

          {/* Painting Services Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={Painter}
              alt="Painting Services"
            />
            <h3 className="text-xl font-semibold mt-4">Painting Services</h3>
            <p className="text-gray-600 mt-2">
              Refresh the look of your home with our interior and exterior
              painting services, delivered with professional precision.
            </p>
          </div>

          {/* Home Security Installations Card */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={Security}
              alt="Home Security Installations"
            />
            <h3 className="text-xl font-semibold mt-4">
              Home Security Installations
            </h3>
            <p className="text-gray-600 mt-2">
              Keep your home secure with our advanced security system
              installations, including CCTV, alarms, and smart locks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;

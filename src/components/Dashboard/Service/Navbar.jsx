import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const Navbar = () => {

  const {currentStep} = useSelector((state) => state.service)

  const navLinks = [
    { id: 1, to: "", text: "Create Service" },
    { id: 2, to: "include", text: "Include" },
    { id: 3, to: "exclude", text: "Exclude" },
    { id: 4, to: "faq", text: "FAQ" },
    { id: 5, to: "HowDoesItWorks", text: "How Does It Work?" },
    { id: 6, to: "publish", text: "Publish" },
  ];

  return (
    <div className="flex items-center justify-evenly w-[50%] mt-4 border-2 rounded-lg shadow-custom-shadow py-4">
      {navLinks.map((navLink, index) => {
        const { id, to, text } = navLink;
        const isActive = currentStep === index;
        const isDisabled = index > currentStep;
        const showTick = index < currentStep;

        return (
          <div key={id} className="flex items-center">
            <div className="flex flex-col items-center">
              <NavLink
                to={isDisabled ? "#" : to}
                className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                  isActive
                    ? "bg-[#E9F5FE] text-[#0C7FDA] border-[#0C7FDA]"
                    : isDisabled
                    ? "bg-gray-200 text-gray-700 border-gray-300"
                    : "bg-[#E9F5FE] text-[#0C7FDA] border-[#0C7FDA]"
                }`}
                onClick={(e) => isDisabled && e.preventDefault()}
              >
                {showTick ? <FaCheck size={20} /> : id}
              </NavLink>
              <span className="mt-2 text-gray-500 text-sm font-[400]">
                {text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;

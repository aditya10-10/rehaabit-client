import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const FormNavigation = () => {
  const { currentStep } = useSelector((state) => state.partner);

  const navLinks = [
    { id: 1, to: "", text: "Personal Information" },
    { id: 2, to: "business-information", text: "Business Information" },
    { id: 3, to: "additional-information", text: "Additional Information" },
  ];

  return (
    <div className="grid grid-cols-3 w-1/2 mt-4 py-4">
      {navLinks.map((navLink, index) => {
        const { id, to, text } = navLink;
        const isActive = currentStep === index;
        const isDisabled = index > currentStep;
        const showTick = index < currentStep;

        return (
          <div key={id} className="flex w-full">
            {id > 1 && <span className="border-t-2 w-full mt-5"></span>}
            <div className="flex flex-col w-full items-center">
              <NavLink
                to={isDisabled ? "#" : to}
                className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                  isActive
                    ? "bg-purple-100 text-purple-500 border-purple-500"
                    : isDisabled
                    ? "bg-gray-200 text-gray-700 border-gray-300"
                    : "bg-purple-100 text-purple-500 border-purple-500"
                }`}
                onClick={(e) => isDisabled && e.preventDefault()}
              >
                {showTick ? <FaCheck size={20} /> : id}
              </NavLink>
              <span className="mt-2 text-gray-500 text-sm font-[400] w-20 text-center">
                {text}
              </span>
            </div>
            {id < 3 && <span className="border-t-2 w-full mt-5"></span>}
          </div>
        );
      })}
    </div>
  );
};

export default FormNavigation;

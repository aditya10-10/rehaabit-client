import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    {
      id: 1,
      to: "",
      text: "Create Service",
    },
    {
      id: 2,
      to: "include",
      text: "Include",
    },
    {
      id: 3,
      to: "exclude",
      text: "Exclude",
    },
    {
      id: 4,
      to: "faq",
      text: "FAQ",
    },
    {
      id: 5,
      to: "HowDoesItWorks",
      text: "How Does It Works?",
    },
  ];

  return (
    <div className="flex items-center justify-evenly w-[50%] mt-4 border-2 rounded-lg shadow-custom-shadow py-4">
      {navLinks.map((navLink) => {
        const { id, to, text } = navLink;
        return (
          <div key={id} className="flex items-center">
            <div className="flex flex-col items-center">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center justify-center w-10 h-10 rounded-full border ${
                    isActive
                      ? "bg-[#E9F5FE] text-[#0C7FDA] border-[#0C7FDA]"
                      : "bg-gray-200 text-gray-700 border-gray-300"
                  }`
                }
              >
                {id}
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

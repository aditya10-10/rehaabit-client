import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";
import Logo from "../../assets/LOGO.svg";
import { FaRegUserCircle } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = ({ onLoginClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { categories } = useSelector((state) => state.categories);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    setIsDropdownOpen(false);
  };

  return (
    <header className="flex justify-center items-center px-16 py-2.5 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between items-center w-full max-w-[1221px] max-md:flex-wrap max-md:max-w-full">
        <img loading="lazy" src={Logo} alt="Company logo" className="h-28" />

        <nav className="flex gap-5 justify-center self-stretch my-auto text-sm text-black max-md:flex-wrap">
          <NavLink to="/">Home</NavLink>

          <div
            onMouseEnter={() => setIsFeaturesOpen(true)}
            onMouseLeave={() => setIsFeaturesOpen(false)}
            className="relative"
          >
            <button
              id="dropdownHoverButton"
              className="text-black bg-transparent font-medium rounded-lg text-sm inline-flex items-center"
            >
              Features{" "}
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isFeaturesOpen && (
              <div
                id="dropdownHover"
                className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-custom-shadow w-[500px] -translate-x-1/3"
              >
                <ul className="p-4 text-sm text-gray-700 grid grid-cols-3">
                  {categories.map((service) => {
                    const { _id, name, icon } = service;

                    return (
                      <li key={_id} className="p-2">
                        <NavLink
                          to="/service1"
                          className="flex items-center px-4 py-2 hover:bg-gray-100 border rounded-lg"
                        >
                          <img src={icon} alt="Icon" className="h-10 w-10 rounded-full mr-2" />
                          <span>{name}</span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/about">About Us</NavLink>
        </nav>

        <div className="flex gap-5 justify-center self-stretch my-auto">
          {!token ? (
            <button
              onClick={onLoginClick}
              className="flex gap-5 justify-center items-center py-1.5 pr-3 pl-3 my-auto text-base text-white whitespace-nowrap bg-red-400 rounded-[30px]"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/547777ca01f505c41e073cc20252f7a0100f7367d9fdd6b781cf18d04e24f65d?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
                alt=""
                className="shrink-0 w-5 aspect-square"
              />
              <span>Login</span>
            </button>
          ) : (
            <div className="relative">
              <button
                className="flex justify-center items-center h-[50px] rounded-[100px] w-[50px]"
                onClick={handleProfileClick}
              >
                <img
                  loading="lazy"
                  src={user?.image}
                  alt=""
                  className="shrink-0 aspect-square w-[78px] rounded-full"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/dashboard");
                    }}
                  >
                    <RiDashboardLine className="w-5 h-5 mr-2" />
                    Dashboard
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={handleLogout}
                  >
                    <IoLogOutOutline className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <button className="flex justify-center items-center p-1 bg-emerald-500 h-[50px] rounded-[100px] w-[50px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/af9ee481dcd948d3726304bd37dc9045a176a58743d1fb7a35197718a1a55193?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
              alt=""
              className="aspect-[1.05] fill-white w-[21px]"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

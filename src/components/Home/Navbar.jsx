import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/LOGO.svg'


const Navbar = ({ onLoginClick }) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    dispatch(logout(navigate))
    setIsDropdownOpen(false);
  };

  return (
    <header className="flex justify-center items-center px-16 py-2.5 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 justify-between items-center w-full max-w-[1221px] max-md:flex-wrap max-md:max-w-full">
        <img
          loading="lazy"
          src={Logo}
          alt="Company logo"
          className="h-28"
        />
        <nav className="flex gap-5 justify-center self-stretch my-auto text-sm text-black max-md:flex-wrap">
          <a href="#">Dummy text</a>
          <a href="#">Dummy text</a>
          <a href="#">Dummy text</a>
          <a href="#">Dummy text</a>
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
                      // Navigate to the dashboard
                      setIsDropdownOpen(false);
                      navigate("/dashboard");
                    }}
                  >
                    <RiDashboardLine
                      className="w-5 h-5 mr-2"
                    />
                    Dashboard
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={handleLogout}
                  >
                    <IoLogOutOutline
                      className="w-5 h-5 mr-2"
                    />
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

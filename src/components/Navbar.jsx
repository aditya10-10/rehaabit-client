import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/operations/authAPI";
import Logo from "../assets/LOGO.svg";
import { FaRegUserCircle } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import { IoLogOutOutline, IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { getAllCartServices } from "../slices/cartSlice";
import { getAllServices } from "../slices/serviceSlice";
import { showAllCategories } from "../slices/categorySlice";
import { showAllSubCategories } from "../slices/subCategorySlice";
import { getUserAddresses } from "../slices/addressSlice";
import { IoSearchOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";

const Navbar = ({ onLoginClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { categories } = useSelector((state) => state.categories);
  const { totalQty } = useSelector((state) => state.cart);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  useEffect(() => {
    dispatch(getAllCartServices());
    dispatch(getAllServices());
    dispatch(showAllCategories());
    dispatch(showAllSubCategories());
    dispatch(getUserAddresses());

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Fetch city and pincode from coordinates
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          )
            .then((response) => response.json())
            .then((data) => {
              const city =
                data.address.city || data.address.town || data.address.village;
              const pincode = data.address.postcode;
              setCity(city);
              setPincode(pincode);
            })
            .catch((error) =>
              console.error("Error fetching location data:", error)
            );
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, [dispatch]);

  return (
    <header className="flex justify-between items-center px-16 py-2.5 w-full max-md:px-5 max-md:flex-wrap max-md:max-w-full">
      <img
        loading="lazy"
        src={Logo}
        alt="Company logo"
        className="h-28 max-md:h-16 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <div className="flex gap-2">
        {/* Geolocation */}

        <div className="flex items-center gap-2 border p-2 rounded-md shadow-custom-shadow">
          <span>
            <CiLocationOn size={20} />
          </span>
          <span className="text-gray-600">
            {city ? `${city}, ${pincode}` : "Fetching location..."}
          </span>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center max-md:w-full max-md:mt-2 shadow-custom-shadow border px-2 py-1 rounded-md"
        >
          <input
            type="text"
            className="p-2 w-60 max-md:w-full mr-2"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="bg-red-400 p-2 text-white rounded-md">
            <IoSearchOutline size={20} />
          </span>
        </form>
      </div>

      {/* Desktop Navigation */}
      {/* <nav className="hidden lg:flex gap-5 justify-center self-stretch my-auto text-sm text-black max-md:flex-wrap">
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
            Features
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
              className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-custom-shadow w-[500px] -translate-x-1/3 transition-all duration-300"
            >
              <ul className="p-4 text-sm text-gray-700 grid grid-cols-3">
                {categories.map((service) => {
                  const { _id, name, icon } = service;

                  return (
                    <li key={_id} className="p-2">
                      <NavLink
                        to={`/${name}/${_id}`}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 border rounded-lg"
                      >
                        <img
                          src={icon}
                          alt="Icon"
                          className="h-10 w-10 rounded-full mr-2"
                        />
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
      </nav> */}

      <div className="flex gap-5 items-center">
        {!token ? (
          <button
            type="button"
            onClick={onLoginClick}
            className="flex gap-5 justify-center items-center py-1.5 pr-3 pl-3 my-auto text-base text-white whitespace-nowrap bg-red-400 rounded-[30px] max-md:gap-1"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/547777ca01f505c41e073cc20252f7a0100f7367d9fdd6b781cf18d04e24f65d?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
              alt="icon"
              className="shrink-0 w-5 aspect-square"
            />
            <span>Login</span>
          </button>
        ) : (
          <div className="relative">
            <button
              type="button"
              className="flex justify-center items-center h-[50px] rounded-full w-[50px] max-md:h-[40px] max-md:w-[40px]"
              onClick={handleProfileClick}
            >
              {user?.image ? (
                <img
                  loading="lazy"
                  src={user.image}
                  alt="UserImage"
                  className="shrink-0 aspect-square w-[78px] rounded-full max-md:w-[48px] bg-purple-600"
                />
              ) : (
                <CgProfile size={50} className="text-purple-600" />
              )}
            </button>

            {/* DROPDOWN */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                {user.accountType === "Admin" && (
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
                )}
                <button
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    user.accountType === "Admin"
                      ? navigate("/dashboard/my-profile")
                      : navigate("/my-profile");
                  }}
                >
                  <CgProfile className="w-5 h-5 mr-2" />
                  My Profile
                </button>
                <button
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/my-orders");
                  }}
                >
                  <FiShoppingCart className="w-5 h-5 mr-2" />
                  My Orders
                </button>
                <button
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/help");
                  }}
                >
                  <IoIosHelpCircleOutline className="w-5 h-5 mr-2" />
                  Help
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

        {/* cart */}
        <div className="relative">
          <button
            className="flex justify-center items-center p-1 bg-emerald-500 h-[50px] rounded-[100px] w-[50px] max-md:h-[40px] max-md:w-[40px]"
            onClick={() => navigate("/cart")}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/af9ee481dcd948d3726304bd37dc9045a176a58743d1fb7a35197718a1a55193?apiKey=14bc5a83475145d8890ac8c4aa074f6f&"
              alt=""
              className="aspect-[1.05] fill-white w-[21px]"
            />
          </button>

          <span className="absolute top-0 right-0 z-50 bg-red-500 rounded-full text-white px-2">
            {totalQty}
          </span>
        </div>

        {/* Menu Toggle */}
        <button
          className="lg:hidden p-2 bg-gray-200 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IoIosClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      {/* Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden absolute top-24 right-16 bg-white shadow-lg z-20 w-36 rounded-lg max-md:right-8 transition-all duration-300">
          <ul className="flex flex-col items-center gap-4 p-4">
            <li>
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li
              className={`flex justify-center w-full ${
                isFeaturesOpen && `bg-gray-200 rounded-lg py-2`
              }`}
            >
              <button
                className="flex justify-center text-black bg-transparent font-medium rounded-lg text-sm items-center w-full"
                onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
              >
                <FaAngleLeft /> Features
              </button>

              {isFeaturesOpen && (
                <div
                  id="dropdownHover"
                  className="absolute z-999 top-16 right-40 bg-white divide-y divide-gray-100 rounded-lg shadow-custom-shadow w-[500px] transition-all duration-300 max-md:w-[300px] max-sm:w-[160px] max-md:max-h-80 max-sm:max-h-60 max-md:overflow-y-auto"
                >
                  <ul className="p-4 text-sm text-gray-700 grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-md:p-2">
                    {categories.map((service) => {
                      const { _id, name, icon } = service;

                      return (
                        <li key={_id} className="p-2">
                          <NavLink
                            to={`/${name}/${_id}`}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 border rounded-lg"
                          >
                            <img
                              src={icon}
                              alt="Icon"
                              className="h-10 w-10 rounded-full mr-2"
                            />
                            <span>{name}</span>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                About Us
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;

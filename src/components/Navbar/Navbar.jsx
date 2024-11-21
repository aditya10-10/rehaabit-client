import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/LOGO.svg";
import { logout } from "../../services/operations/authAPI";
import { CgProfile } from "react-icons/cg";
import { RiDashboardLine } from "react-icons/ri";
import { IoCartOutline, IoLogOutOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import LocationSearchBarDiv from "./LocationSearchBarDiv";
import ConfirmationModal from "../common/ConfirmationModal";

const Navbar = ({ onLoginClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const profileDropdownRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalQty } = useSelector((state) => state.cart);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "You will be logged out of your account.",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => {
        dispatch(logout(navigate, location.pathname));
        setIsProfileDropdownOpen(false);
        setConfirmationModal(null);
      },
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleOutsideClick = (e) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(e.target)
    ) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // useEffect(() => {
  //   dispatch(getAllCartServices());
  //   dispatch(getAllServices());
  //   dispatch(showAllCategories());
  //   dispatch(showAllSubCategories());
  //   dispatch(getUserAddresses());
  // }, [dispatch]);

  return (
    <>
      <header className="sticky top-0 left-0 z-40 bg-white flex justify-between items-center px-16 w-full max-md:px-5 max-md:flex-wrap max-md:max-w-full gap-2 max-sm:gap-0 max-sm:pb-4">
        <img
          loading="lazy"
          src={Logo}
          alt="Company logo"
          className="h-20 max-md:h-16 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="flex gap-2 max-sm:hidden">
          <LocationSearchBarDiv />
        </div>

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
                ref={profileDropdownRef}
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
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                {
                  user?.accountType === "Content Writer" && (
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      onClick={() => navigate("/dashboard/blog/view-blogs")}
                    >
                      <RiDashboardLine size={20} />
                      <span className="ml-2">View Blogs</span>
                    </button>
                    )
                  }
                  {user.accountType === "Admin" && (
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      onClick={() => navigate("/dashboard/admin")}
                    >
                      <RiDashboardLine size={20} />
                      <span className="ml-2">Dashboard</span>
                    </button>
                  )}
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={() => navigate("/dashboard/my-profile")}
                  >
                    <CgProfile size={20} />
                    <span className="ml-2">My Profile</span>
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={() => navigate("/dashboard/orders")}
                  >
                    <IoCartOutline size={20} />
                    <span className="ml-2">My Orders</span>
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={() => navigate("/help")}
                  >
                    <IoIosHelpCircleOutline size={20} />
                    <span className="ml-2">Help</span>
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={handleLogout}
                  >
                    <IoLogOutOutline size={20} />
                    <span className="ml-2">Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}

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
        </div>

        <div className="gap-2 w-full hidden max-sm:flex">
          <LocationSearchBarDiv />
        </div>
      </header>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Navbar;

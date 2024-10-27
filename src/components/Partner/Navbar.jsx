import Logo from "../../assets/LOGO.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className=" top-0 left-0 right-0 z-40 flex justify-between items-center px-8 py-4 bg-white bg-opacity-90 shadow-md max-lg:px-6 max-md:px-4 max-sm:px-2 max-sm:py-3">
      {" "}
      {/* Logo Section */}
      <img
        loading="lazy"
        src={Logo}
        alt="Rehaabit logo"
        className="h-16 max-lg:h-14 max-md:h-12 max-sm:h-10 cursor-pointer"
        onClick={() => navigate("/")} // Navigate to homepage on logo click
      />
      {/* Conditionally Render Navigation Links Section */}
      {location.pathname === "/partner" && (
        <div className="ml-auto">
          <button
            className="bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition-colors duration-300 ease-in-out text-sm max-sm:text-xs max-sm:px-4 max-sm:py-2"
            onClick={() => navigate("/partner-form/personal-information")}
          >
            Register Now
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;

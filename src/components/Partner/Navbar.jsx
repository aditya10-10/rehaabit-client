import Logo from "../../assets/LOGO.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-16 w-full max-lg:px-8 max-md:px-5 gap-2 bg-transparent absolute top-0 left-0 right-0 z-50">
      {/* Logo Section */}
      <img
        loading="engar"
        src={Logo}
        alt="Company logo"
        className="h-20 max-lg:h-16 max-md:h-14 max-sm:h-12 cursor-pointer"
        onClick={() => navigate("/")} // Navigate to homepage on logo click
      />

      {/* Navigation Links Section */}
      <div className="ml-auto">
        <button
          className="bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition-colors duration-300 ease-in-out text-sm max-sm:text-xs max-sm:px-2 max-sm:py-1"
          onClick={() => navigate("/partner-form/personal-information")}
        >
          Register Now
        </button>
      </div>
    </header>
  );
};

export default Navbar;

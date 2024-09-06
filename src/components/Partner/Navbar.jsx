import Logo from "../../assets/LOGO.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-16 w-full max-md:px-5 max-md:flex-wrap max-md:max-w-full gap-2 max-sm:gap-0 max-sm:pb-4 bg-transparent absolute top-0 left-0 right-0 z-50">
      {/* Logo Section */}
      <img
        loading="lazy"
        src={Logo}
        alt="Company logo"
        className="h-20 max-md:h-16 cursor-pointer"
        onClick={() => navigate("/")} // Navigate to homepage on logo click
      />

      {/* Navigation Links Section */}
      <div className="flex gap-5 items-center">
        {/* Register Now Button */}
        <button
          className="bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 transition-colors duration-300 ease-in-out"
          onClick={() => navigate("/partner-form/personal-information")}
        >
          Register Now
        </button>
      </div>
    </header>
  );
};

export default Navbar;

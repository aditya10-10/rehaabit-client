import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/LOGO_1.png";
import Profile from "../../assets/images/profile.svg";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full p-4 max-h-[85px] shadow-custom-shadow bg-white">
      <div className="flex items-center">
        <img src={Logo} alt="Rehaabit" className="h-8 w-8 mr-2" />
        <span className="text-[25px] text-[#343C6A]">Rehaabit</span>
      </div>

      <NavLink to="my-profile">
        <div className="flex items-center">
          <img
            src={Profile}
            alt="Profile"
            className="h-[45px] w-[45px] rounded-full"
          />
        </div>
      </NavLink>
    </nav>
  );
};

export default Navbar;
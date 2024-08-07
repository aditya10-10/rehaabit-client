import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/LOGO.svg";
import Profile from "../../assets/images/profile.svg";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center w-full p-4 h-[100px] shadow-custom-shadow bg-white">
      <div className="flex items-baseline">
        <img
          src={Logo}
          alt="Rehaabit"
          className="h-24 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      <NavLink to="my-profile">
        <div className="flex items-center">
          {user?.image ? (
            <img
              src={user?.image}
              alt="Profile"
              className="h-14 w-14 rounded-full bg-purple-600"
            />
          ) : (
            <CgProfile size={50} className="text-purple-600" />
          )}
        </div>
      </NavLink>
    </nav>
  );
};

export default Navbar;

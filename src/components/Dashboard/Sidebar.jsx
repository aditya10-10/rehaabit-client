import { GoHomeFill } from "react-icons/go";
import { MdCategory } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import LogoutSVG from "../../assets/icons/Logout.svg";
import { NavLink } from "react-router-dom";
import { BiSolidCategory } from "react-icons/bi";
import { MdMedicalServices } from "react-icons/md";

const sidebarLinks = [
  {
    id: 1,
    icon: <GoHomeFill />,
    text: "Dashboard",
    to: "/dashboard",
    index: true,
  },
  {
    id: 2,
    icon: <BiSolidCategory />,
    text: "Category",
    to: "category",
  },
  {
    id: 3,
    icon: <MdCategory />,
    text: "Sub-Category",
    to: "sub-category",
  },
  {
    id: 4,
    icon: <MdHomeRepairService />,
    text: "My Service",
    to: "my-service",
  },
  {
    id: 5,
    icon: <MdMedicalServices />,
    text: "Add Service",
    to: "service/create-service",
  },
  {
    id: 6,
    icon: <BsFillHandbagFill />,
    text: "Orders",
    to: "orders",
  },
  {
    id: 7,
    icon: <FaUsers />,
    text: "Users",
    to: "users",
  },
  {
    id: 8,
    icon: <IoMdSettings />,
    text: "Settings",
    to: "settings",
  },
];

const Sidebar = () => {

  return (
    <div className="flex flex-col items-center shadow-custom-shadow p-4  min-w-[300px] h-screen bg-white">
      <div className="p-4 w-full">
        {sidebarLinks.map((link) => {
          const { id, icon, text, to, index } = link;

          return (
            <NavLink
              key={id}
              to={to}
              end={index}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center mb-4 bg-[#E9F5FE] w-full rounded-[5px] text-[#0C7FDA] font-[600]"
                  : "flex items-center mb-4 hover:bg-[#E9F5FE] w-full rounded-[5px] text-[#6A6C6B] hover:text-[#0C7FDA] hover:font-[600]"
              }
            >
              <span className="mr-5 text-3xl p-2">{icon}</span>
              <span className="text-sm">{text}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="flex items-center w-full bg-[#667A8A] p-2 rounded-[5px] mt-6">
        <img src={LogoutSVG} alt="logout" className="mr-2" />
        <button className="text-white font-[600] text-sm">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;

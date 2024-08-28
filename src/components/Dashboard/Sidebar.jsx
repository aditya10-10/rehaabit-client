import { GoHomeFill } from "react-icons/go";
import {
  MdCategory,
  MdHomeRepairService,
  MdMedicalServices,
} from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { IoIosHelpCircleOutline, IoMdSettings } from "react-icons/io";
import LogoutSVG from "../../assets/icons/Logout.svg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { clearServiceForm } from "../../slices/serviceSlice";
import { CgProfile } from "react-icons/cg";
import { FaAddressBook } from "react-icons/fa";
import Swal from "sweetalert2";

const sidebarLinks = [
  {
    id: 0,
    icon: <CgProfile />,
    text: "My Profile",
    to: "/dashboard/my-profile",
    index: true,
  },
  {
    id: 1,
    icon: <GoHomeFill />,
    text: "Dashboard",
    to: "/dashboard",
    index: true,
    adminOnly: true,
  },
  {
    id: 2,
    icon: <BiSolidCategory />,
    text: "Category",
    to: "category",
    adminOnly: true,
  },
  {
    id: 3,
    icon: <MdCategory />,
    text: "Sub-Category",
    to: "sub-category",
    adminOnly: true,
  },
  {
    id: 4,
    icon: <MdHomeRepairService />,
    text: "My Services",
    to: "my-services",
    adminOnly: true,
  },
  {
    id: 5,
    icon: <MdMedicalServices />,
    text: "Add Service",
    to: "service/create-service",
    adminOnly: true,
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
    adminOnly: true,
  },
  {
    id: 8,
    icon: <FaAddressBook />,
    text: "Addresses",
    to: "addresses",
    userOnly: true,
  },
  {
    id: 9,
    icon: <IoMdSettings />,
    text: "Settings",
    to: "edit-profile",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { service, serviceId } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (
      location.pathname.startsWith("/dashboard/service") &&
      service &&
      serviceId
    ) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [location, service, serviceId]);

  const handleNavigation = (path) => {
    if (isEditing) {
      Swal.fire({
        title: "Are you sure?",
        text: "You have unsaved changes. Do you really want to leave?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#06952c",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, leave",
        cancelButtonText: "No, stay",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(path);
          dispatch(clearServiceForm());
        }
      });
    } else {
      navigate(path);
    }
  };

  const filteredSidebarLinks = sidebarLinks.filter(
    (link) =>
      (!link.adminOnly || user.accountType === "Admin") &&
      !(link.text === "Addresses" && user.accountType === "Admin")
  );

  return (
    <div className="sticky top-0 left-0 flex flex-col items-center shadow-custom-shadow p-4 max-sm:p-0 w-[300px] max-lg:w-28 max-sm:w-20 h-screen bg-white">
      <div className="p-4 w-full max-xs:p-2">
        {filteredSidebarLinks.map((link) => {
          const { id, icon, text, to, index } = link;

          return (
            <NavLink
              key={id}
              to={to}
              end={index}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(to);
              }}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center mb-4 bg-[#E9F5FE] w-full rounded-[5px] text-[#0C7FDA] font-[600] max-xs:justify-center"
                  : "flex items-center mb-4 hover:bg-[#E9F5FE] w-full rounded-[5px] text-[#6A6C6B] hover:text-[#0C7FDA] hover:font-[600] max-xs:justify-center"
              }
            >
              <span className="mr-5 max-xs:mr-0 text-3xl p-2">{icon}</span>
              <span className="text-sm max-lg:hidden">{text}</span>
            </NavLink>
          );
        })}
      </div>

      <button className="flex items-center w-full max-lg:w-14 max-sm:w-10 bg-[#667A8A] p-2 rounded-[5px] mt-6">
        <img src={LogoutSVG} alt="logout" className="mr-2" />
        <span className="text-white font-[600] text-sm max-lg:hidden">
          Logout
        </span>
      </button>
    </div>
  );
};

export default Sidebar;

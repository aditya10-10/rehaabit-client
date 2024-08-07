import { GoHomeFill } from "react-icons/go";
import {
  MdCategory,
  MdHomeRepairService,
  MdMedicalServices,
} from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import LogoutSVG from "../../assets/icons/Logout.svg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { clearServiceForm } from "../../slices/serviceSlice";
import Swal from "sweetalert2";

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
    text: "My Services",
    to: "my-services",
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
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { service, serviceId } = useSelector((state) => state.service);
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

  return (
    <div className="sticky top-[100px] flex flex-col items-center shadow-custom-shadow p-4 min-w-[300px] h-[90vh] bg-white">
      <div className="p-4 w-full">
        {sidebarLinks.map((link) => {
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

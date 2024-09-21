import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clearServiceForm } from "../../slices/serviceSlice";
import { logout } from "../../services/operations/authAPI"; // Import the logout action
import { CgProfile } from "react-icons/cg";
import { GoHomeFill } from "react-icons/go";
import {
  MdCategory,
  MdHomeRepairService,
  MdMedicalServices,
} from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers, FaAddressBook, FaUsersCog } from "react-icons/fa";
import { IoIosHelpCircleOutline, IoMdSettings } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../common/ConfirmationModal";
import { LuLayoutDashboard } from "react-icons/lu";

const SidebarContext = createContext();

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
    icon: <LuLayoutDashboard />,
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
  { id: 6, icon: <BsFillHandbagFill />, text: "Orders", to: "orders" },
  { id: 7, icon: <FaUsers />, text: "Users", to: "users", adminOnly: true },
  {
    id: 8,
    icon: <FaUsersCog />,
    text: "Partners",
    to: "partners",
    adminOnly: true,
  },
  {
    id: 9,
    icon: <FaAddressBook />,
    text: "Addresses",
    to: "addresses",
    userOnly: true,
  },
  {
    id: 10,
    icon: <FaAddressBook />,
    text: "Enquiries",
    to: "user-enquires",
    adminOnly: true,
  },
  {
    id: 12,
    icon: <IoIosHelpCircleOutline />,
    text: "Contact",
    to: "contacts",
    adminOnly: true,
  },
  { id: 11, icon: <IoMdSettings />, text: "Settings", to: "edit-profile" },
];

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Ensure useNavigate is imported correctly
  const location = useLocation();
  const dispatch = useDispatch();
  const { service, serviceId } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null); // State for confirmation modal

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

    // Close sidebar in phone mode
    if (window.innerWidth <= 768) {
      setExpanded(false);
    }
  };

  const handleLogout = () => {
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "You will be logged out of your account.",
      btn1Text: "Logout",
      btn2Text: "Cancel",
      btn1Handler: () => {
        dispatch(logout(navigate, location.pathname));
        navigate("/login");
      },
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const filteredSidebarLinks = sidebarLinks.filter(
    (link) =>
      (!link.adminOnly || user.accountType === "Admin") &&
      !(link.text === "Addresses" && user.accountType === "Admin") &&
      link.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <aside className="h-screen" style={{ fontFamily: "Roboto, sans-serif" }}>
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronLeft /> : <ChevronRight />}
            </button>
          </div>

          {user.accountType === "Admin" && (
            <div className="p-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full p-2 border rounded"
                style={{ fontFamily: "Roboto, sans-serif" }}
              />
            </div>
          )}

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">
              {filteredSidebarLinks.map((link, index) => (
                <SidebarItem
                  key={link.id}
                  icon={link.icon}
                  text={link.text}
                  to={link.to}
                  index={link.index}
                  handleNavigation={handleNavigation}
                  isFirst={index === 0}
                />
              ))}
              <div className="border-t flex p-3">
                <button
                  onClick={handleLogout}
                  className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  <VscSignOut className="text-lg" />
                  {expanded && <span className="ml-2">Logout</span>}
                </button>
              </div>
            </ul>
          </SidebarContext.Provider>
        </nav>
      </aside>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

function SidebarItem({ icon, text, to, index, handleNavigation, isFirst }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        isActive
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      } ${isFirst && isActive ? "text-indigo-800" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        handleNavigation(to);
      }}
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        {text}
      </span>
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {text}
        </div>
      )}
    </li>
  );
}

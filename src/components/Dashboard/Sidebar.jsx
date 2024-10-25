import { CgProfile } from "react-icons/cg";
import { GoHomeFill } from "react-icons/go";
import { MdCategory, MdHomeRepairService, MdMedicalServices } from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers, FaAddressBook, FaUsersCog } from "react-icons/fa";
import { IoIosHelpCircleOutline, IoMdSettings } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clearServiceForm } from "../../slices/serviceSlice";
import { logout } from "../../services/operations/authAPI";
import ConfirmationModal from "../common/ConfirmationModal";

// Context for Sidebar State
const SidebarContext = createContext();

// Sidebar Links Array
const sidebarLinks = [
  { id: 0, icon: <CgProfile />, text: "My Profile", to: "my-profile" },
  { id: 1, icon: <LuLayoutDashboard />, text: "Dashboard", to: "/dashboard/admin", adminOnly: true },
  { id: 2, icon: <BiSolidCategory />, text: "Category", to: "category", adminOnly: true },
  { id: 3, icon: <MdCategory />, text: "Sub-Category", to: "sub-category", adminOnly: true },
  { id: 4, icon: <MdHomeRepairService />, text: "My Services", to: "my-services", adminOnly: true },
  { id: 5, icon: <MdMedicalServices />, text: "Add Service", to: "service/create-service", adminOnly: true },
  { id: 6, icon: <BsFillHandbagFill />, text: "Orders", to: "orders" },
  { id: 7, icon: <FaUsers />, text: "Users", to: "users", adminOnly: true },
  { id: 8, icon: <FaUsersCog />, text: "Partners", to: "partners", adminOnly: true },
  { id: 9, icon: <FaAddressBook />, text: "Addresses", to: "addresses", userOnly: true },
  { id: 10, icon: <FaAddressBook />, text: "Enquiries", to: "user-enquires", adminOnly: true },
  { id: 11, icon: <IoIosHelpCircleOutline />, text: "Contact", to: "contacts", adminOnly: true },
  { id: 12, icon: <IoMdSettings />, text: "Settings", to: "edit-profile" }
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(null);
  const isSidebarVisible = useSelector((state) => state.sidebar.isSidebarVisible);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Resize handler for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setExpanded(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Filtered Sidebar Links based on user type
  const filteredSidebarLinks = sidebarLinks.filter(
    (link) =>
      (!link.adminOnly || user.accountType === "Admin") &&
      !(link.text === "Addresses" && user.accountType === "Admin") &&
      link.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logout handler
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

  return (
    <>
      {isSidebarVisible && (
        <>
          {/* Sidebar overlay for small screens */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
              expanded ? 'visible opacity-100' : 'invisible opacity-0'
            } md:hidden`} // Hide on medium and larger screens
            onClick={() => setExpanded(false)} // Clicking outside collapses the sidebar
            style={{ zIndex: 40 }}
          ></div>
  
          {/* Sidebar */}
          <aside
            className={`h-[calc(100vh-64px)] fixed top-[64px]  left-0 z-50 transition-all duration-300 ${
              expanded ? 'w-64 bg-white  ' : 'w-16 bg-white'
            } border-r shadow-sm`}
            style={{ fontFamily: "Roboto, sans-serif", zIndex: 50 }} // Higher z-index to keep it above the overlay
          >
            <nav className="flex flex-col h-full">
              <SidebarHeader expanded={expanded} setExpanded={setExpanded} />
  
              {/* Search Section for Admin */}
              {user.accountType === "Admin" && (
                <SearchBar expanded={expanded} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              )}
  
              <SidebarContext.Provider value={{ expanded }}>
                <ul className="flex-1 px-3 overflow-y-auto">
                  {filteredSidebarLinks.map((link, index) => (
                    <SidebarItem key={link.id} icon={link.icon} text={link.text} to={link.to} isFirst={index === 0} />
                  ))}
                  <LogoutButton expanded={expanded} handleLogout={handleLogout} />
                </ul>
              </SidebarContext.Provider>
            </nav>
          </aside>
        </>
      )}
  
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
  
}

// Sidebar Header Component
const SidebarHeader = ({ expanded, setExpanded }) => (
  <div className="p-4 pb-2  flex justify-between items-center">
    <button
      onClick={() => setExpanded((curr) => !curr)}
      className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
    >
      {expanded ? <ChevronLeft /> : <ChevronRight />}
    </button>
  </div>
);

// Search Bar Component for Admin
const SearchBar = ({ expanded, searchTerm, setSearchTerm }) => (
  <div className="p-4">
    {!expanded ? (
      <button
        className="p-2 rounded-full bg-gray-50 hover:bg-gray-100"
      >
        <FiSearch className="text-xl" />
      </button>
    ) : (
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="w-full p-2 border rounded"
        style={{ fontFamily: "Roboto, sans-serif" }}
      />
    )}
  </div>
);

// Sidebar Item Component
function SidebarItem({ icon, text, to }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();
  const isActive = location.pathname === to;
  const navigate = useNavigate();

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${isActive
        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
        : "hover:bg-indigo-50 text-gray-600"
        }`}
      onClick={() => navigate(to)}
    >
      {icon}
      <span className={`overflow-hidden transition-all duration-300 ${expanded ? "w-52 ml-3" : "w-0"}`}>
        {text}
      </span>
      {!expanded && (
        <div
          className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
        >
          {text}
        </div>
      )}
    </li>
  );
}

// Logout Button Component
const LogoutButton = ({ expanded, handleLogout }) => (
  <div className="border-t flex p-3">
    <button
      onClick={handleLogout}
      className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center transition-all duration-300"
    >
      <VscSignOut className="text-lg" />
      {expanded && <span className="ml-2">Logout</span>}
    </button>
  </div>
);

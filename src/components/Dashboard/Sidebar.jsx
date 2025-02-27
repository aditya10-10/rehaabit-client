import { CgProfile } from "react-icons/cg";
import { GoHomeFill } from "react-icons/go";
import { MdCategory, MdHomeRepairService, MdMedicalServices } from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers, FaAddressBook, FaUsersCog } from "react-icons/fa";
import { IoIosHelpCircleOutline, IoMdSettings } from "react-icons/io";
import { FaBlog } from "react-icons/fa";
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
  {
    id: 2, 
    icon: <FaBlog />, 
    text: "Blog", 
    to: "blog", 
    contentWriterOnly: true,
    subItems: [
      { id: 'blog-1', text: "View Blogs", to: "blog/view-blogs" },
      { id: 'blog-2', text: "Create Blog", to: "blog/create-blog" },
    ]
  },
  {
    id: 3,
    icon: <MdHomeRepairService />,
    text: "Services",
    to: "services",
    adminOnly: true,
    subItems: [
      { id: 'service-1', text: "Category", to: "category" },
      { id: 'service-2', text: "Sub-Category", to: "sub-category" },
      { id: 'service-3', text: "My Services", to: "my-services" },
      { id: 'service-4', text: "Add Service", to: "service/create-service" },
    ]
  },
  { id: 6, icon: <BsFillHandbagFill />, text: "Orders", to: "orders" },
  { id: 7, icon: <FaUsers />, text: "Users", to: "users", adminOnly: true },
  { id: 8, icon: <FaUsersCog />, text: "Partners", to: "partners", adminOnly: true },
  { id: 9, icon: <FaAddressBook />, text: "Addresses", to: "addresses", userOnly: true },
  {
    id: 10,
    icon: <IoIosHelpCircleOutline />,
    text: "Support",
    to: "support",
    adminOnly: true,
    subItems: [
      { id: 'support-1', text: "Enquiries", to: "user-enquires" },
      { id: 'support-2', text: "Contact", to: "contacts" },
    ]
  },
  { id: 12, icon: <IoMdSettings />, text: "Settings", to: "edit-profile" }
];

export default function Sidebar({ children }) {  
  const [isOrderClickedinPhone, setIsOrderClickedinPhone] = useState(false);
  const isSidebarVisible = useSelector((state) => state.sidebar.isSidebarVisible);
  const [expanded, setExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Ensure useNavigate is imported correctly
  const location = useLocation();
  const dispatch = useDispatch();
  const { service, serviceId } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
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

  const filteredSidebarLinks = sidebarLinks.filter((link) => {
    if (user.accountType === "Admin") {
      return link.text.toLowerCase().includes(searchTerm.toLowerCase());
    }
    const isContentWriterLink = link.contentWriterOnly && user.accountType === "Content Writer";
    const isRegularUserLink = !link.adminOnly && !link.contentWriterOnly;
    const matchesSearchTerm = link.text.toLowerCase().includes(searchTerm.toLowerCase());
    return (isContentWriterLink || isRegularUserLink) && matchesSearchTerm;
  });
  
  

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
      {isSidebarVisible &&(
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
              {!expanded ? (
                <button
                  onClick={() => setIsSearchModalVisible(true)} // Open search modal on icon click
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
                  setIsOrderClickedinPhone={setIsOrderClickedinPhone}
                  handleNavigation={handleNavigation}
                  isFirst={index === 0}
                  subItems={link.subItems}
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
    )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

function SidebarItem({ icon, text, to, index, handleNavigation, isFirst, setIsOrderClickedinPhone, subItems }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const isActive = location.pathname === to || (subItems?.some(item => location.pathname.includes(item.to)));

  const handleClick = (e) => {
    e.preventDefault();
    
    if (subItems) {
      setIsSubMenuOpen(!isSubMenuOpen);
    } else {
      if (window.innerWidth <= 768 && text === "Orders") {
        setIsOrderClickedinPhone(true);  
      } else {
        setIsOrderClickedinPhone(false);  
      }
      handleNavigation(to);
    }
  };

  return (
    <>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          isActive
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        } ${isFirst && isActive ? "text-indigo-800" : ""}`}
        onClick={handleClick}
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {text}
        </span>
        {subItems && expanded && (
          <span className="ml-auto">{isSubMenuOpen ? '▼' : '▶'}</span>
        )}
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {text}
          </div>
        )}
      </li>
      
      {subItems && isSubMenuOpen && expanded && (
        <ul className="ml-4">
          {subItems.map((item) => (
            <li
              key={item.id}
              className={`py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
                location.pathname.includes(item.to)
                  ? "bg-gradient-to-tr from-indigo-100 to-indigo-50 text-indigo-800"
                  : "hover:bg-indigo-50 text-gray-600"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(item.to);
              }}
            >
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

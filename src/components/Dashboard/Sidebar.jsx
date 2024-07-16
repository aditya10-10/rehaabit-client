import DashboardSVG from "../../assets/icons/dashboard.svg";
import AddCategorySVG from "../../assets/icons/addCategory.svg";
import CategorySVG from "../../assets/icons/category.svg";
import ServiceSVG from "../../assets/icons/service.svg";
import { Link } from "react-router-dom";

const sidebarLinks = [
  {
    id: 1,
    icon: DashboardSVG,
    text: "Dashboard",
    to: "/dashboard",
  },
  {
    id: 2,
    icon: CategorySVG,
    text: "Category",
    to: "category",
  },
  {
    id: 3,
    icon: CategorySVG,
    text: "Sub-Category",
    to: "sub-category",
  },
  {
    id: 4,
    icon: AddCategorySVG,
    text: "Add Category",
    to: "add-category",
  },
  {
    id: 5,
    icon: AddCategorySVG,
    text: "Add Sub-Category",
    to: "add-sub-category",
  },
  {
    id: 6,
    icon: ServiceSVG,
    text: "Add Service",
    to: "add-service",
  },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col items-start shadow-custom-shadow p-4 w-[217px] h-screen bg-white rounded-[5px]">
      {sidebarLinks.map((link) => {
        const { id, icon, text, to } = link;

        return (
          <Link key={id} to={to}>
            <div className="flex items-center mb-10">
              <img src={icon} alt="dashboard" className="mr-[20px]" />
              <span className="text-[#6A6C6B] text-[16px]">{text}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
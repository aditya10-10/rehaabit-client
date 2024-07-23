import { NavLink } from "react-router-dom";
import ServicesList from "./ServicesList";

const MyService = () => {
  return (
    <div className="flex flex-col items-center w-full p-10">
      <nav className="flex w-full justify-between">
        <h1 className="text-4xl font-semibold">My Services</h1>
        <NavLink
          to="/dashboard/service/create-service"
          className="bg-[#0C7FDA] text-white rounded-md px-4 py-2 font-semibold"
        >
          New
        </NavLink>
      </nav>

      {/* SERVICELISTS */}
      <div className="mt-6 w-full border rounded-lg">
        <ServicesList />
      </div>
    </div>
  );
};

export default MyService;

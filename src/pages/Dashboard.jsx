import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { useEffect } from "react";
import { showAllCategories } from "../slices/categorySlice";
import { showAllSubCategories } from "../slices/subCategorySlice";
import { getAllServices } from "../slices/serviceSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { loading: authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(showAllCategories());
    dispatch(showAllSubCategories());
    dispatch(getAllServices());
  }, [dispatch]);

  if (authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Flexbox layout for the sidebar and main content */}
      <div className="flex h-screen">
        {/* Sidebar should be below the navbar */}
        <Sidebar />

        {/* Main content area, takes the rest of the screen width */}
        <div className="flex-grow overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

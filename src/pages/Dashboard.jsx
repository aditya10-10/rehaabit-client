import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { useEffect } from "react";
import { showAllCategories } from "../slices/categorySlice";
import { showAllSubCategories } from "../slices/subCategorySlice";
import { getAllServices } from "../slices/serviceSlice";
import { BallTriangle } from "react-loader-spinner";

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
        <BallTriangle
          height={100}
          width={100}
          color="#3b82f6"
        />
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
        <div className="flex-grow p-4 scrollbar-hide">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

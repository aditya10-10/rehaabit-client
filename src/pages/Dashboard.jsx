import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Sidebar, Navbar } from "../components/Dashboard";
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
      <Navbar />

      <div className="flex">
        <Sidebar />
        <div className="flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

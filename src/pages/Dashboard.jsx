import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Sidebar, Navbar } from "../components/Dashboard";
import { useEffect } from "react";
import { showAllCategories } from "../slices/categorySlice";
import { showAllSubCategories } from "../slices/subCategorySlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { loading: authLoading } = useSelector((state) => state.auth);
  const {isMyProfileOpen} = useSelector((state) => state.myProfile);

  useEffect(() => {
      dispatch(showAllCategories());
      dispatch(showAllSubCategories());
  }, [dispatch])

  if (authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-3.5rem)]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

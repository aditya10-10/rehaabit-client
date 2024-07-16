import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import { Sidebar, Navbar } from "../components/Dashboard";

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-3.5rem)] bg-[#EBEBEB]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex items-center h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-auto w-11/12 max-w-[1000px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
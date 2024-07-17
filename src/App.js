import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { ComingSoon } from "./pages/ComingSoon";
import EditProfile from "./pages/EditProfile";
import MainPage from "./pages/MainPage";
import MyProfile from "./pages/MyProfile";
import { Thankyou } from "./pages/Thankyou";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/profileAPI";

export default function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
  }, [])

  return (
    <div className="w-screen min-h-screen">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/thank-you" element={<Thankyou />} />
        <Route path="/dashboard/my-profile" element={<MyProfile />} />
        <Route path="/dashboard/edit-profile" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

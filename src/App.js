import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import { Thankyou } from "./pages/Thankyou";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/profileAPI";

import { Dashboard, MainPage, MyProfile, EditProfile, Categories, ServiceDetailsPage } from "./pages";

import { SubCategory } from "./components/Dashboard/SubCategory";
import { Category } from "./components/Dashboard/Category";
import { MyService, Service } from "./components/Dashboard/Service";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token, navigate));
    }
  }, []);

  return (
    <div className="w-screen min-h-screen">
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/thank-you" element={<Thankyou />} />
        <Route path="/:category/:id" element={<Categories />}/>
        <Route path="/service-details/:id" element={<ServiceDetailsPage />}/>

        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="category" element={<Category />} />
          <Route path="sub-category" element={<SubCategory />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="my-services" element={<MyService />} />
          <Route path="service/create-service/*" element={<Service />} />
        </Route>
      </Routes>
    </div>
  );
}

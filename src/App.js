import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import { Thankyou } from "./pages/Thankyou";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserDetails } from "./services/operations/profileAPI";

import {
  Dashboard,
  MainPage,
  MyProfile,
  EditProfile,
  Categories,
  ServiceDetailsPage,
  Cart,
  Checkout,
} from "./pages";

import { SubCategory } from "./components/Dashboard/SubCategory";
import { Category } from "./components/Dashboard/Category";
import { MyService, Service } from "./components/Dashboard/Service";
import Navbar from "./components/Navbar";
import OtpModal from "./components/SignupLogin/OtpModal";
import {
  getAllCartServices,
  updateCartFromLocalStorage,
} from "./slices/cartSlice";
import { showAllCategories } from "./slices/categorySlice";
import { getAllServices } from "./slices/serviceSlice";
import { clearSingleOrder } from "./slices/orderSlice";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token, navigate));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(getAllCartServices());
    dispatch(showAllCategories());
    dispatch(showAllCategories());
    dispatch(getAllServices());
  }, [dispatch]);

  useEffect(() => {
    if (user && localStorage.getItem("cart")) {
      dispatch(updateCartFromLocalStorage());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!location.pathname.includes("/checkout")) {
      dispatch(clearSingleOrder());
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (
      localStorage.getItem("cart") &&
      JSON.parse(localStorage.getItem("cart")).totalQty === 0
    ) {
      localStorage.removeItem("cart");
    }
  }, []);

  const handleLoginClick = () => {
    setAnimationClass("modal-open");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setAnimationClass("modal-close");
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  return (
    <>
      {location.pathname.includes("/dashboard") ? null : (
        <Navbar onLoginClick={handleLoginClick} />
      )}

      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 top-0 bg-black bg-opacity-50 ${animationClass} max-h-screen`}
        >
          <OtpModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      )}

      <div className="w-screen min-h-screen">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/thank-you" element={<Thankyou />} />
          <Route path="/:category/:id" element={<Categories />} />
          <Route path="/service-details/:id" element={<ServiceDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {(user?.accountType === "Admin" || user?.accountType === "User") && (
            <></>
          )}

          {user?.accountType === "Admin" && (
            <>
              <Route path="/dashboard/*" element={<Dashboard />}>
                <Route path="category" element={<Category />} />
                <Route path="sub-category" element={<SubCategory />} />
                <Route path="my-profile" element={<MyProfile />} />
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="my-services" element={<MyService />} />
                <Route path="service/create-service/*" element={<Service />} />
              </Route>
            </>
          )}

          {(user?.accountType === "User" || user?.accountType === "Admin") && (
            <>
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="edit-profile" element={<EditProfile />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

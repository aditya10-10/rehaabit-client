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
  Cart,
  Checkout,
  TermsAndConditions,
  MyOrders,
  Addresses,
  PartnerPage,
  ContactUs,
  Help,
  Careers,
} from "./pages";

import PrivacyPolicy from "./pages/privacy-and-policy";

import { SubCategory } from "./components/Dashboard/SubCategory";
import { Category } from "./components/Dashboard/Category";
import { MyService, Service } from "./components/Dashboard/Service";
import Navbar from "./components/Navbar/Navbar";
import {
  getAllCartServices,
  updateCartFromLocalStorage,
} from "./slices/cartSlice";
import { showAllCategories } from "./slices/categorySlice";
import { getAllServices } from "./slices/serviceSlice";
import {
  clearSingleOrder,
  getAllOrders,
  getUserOrders,
} from "./slices/orderSlice";
import { showAllSubCategories } from "./slices/subCategorySlice";
import { PartnerForm } from "./components/Partner";
import { OtpModal } from "./components";
import PartnerPageAdmin from "./components/Dashboard/Partner/PartnerPageAdmin";
import { useQuery } from "@tanstack/react-query";
import Users from "./components/Dashboard/Users/Users";
import UserDetails from "./components/Dashboard/Users/UserDetailsModal";
import UsersEnquiries from "./components/Enquiry/UsersEnquiries";
import ComingSoon from "./pages/ComingSoon";
import PartnerPolicy from "./pages/Partnerpolicy";
import PartnerTermsAndConditions from "./pages/PartnerTermAndCondition";
import CancellationRefundPolicy from "./pages/CancellationAndRefundPolicy";
import AboutPage from "./pages/AboutUs";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const Categoriesquery = useQuery({
    queryKey: ["Categories"],
    queryFn: () => dispatch(showAllCategories()),
  });

  const subcategoriesQuery = useQuery({
    queryKey: ["subcategories"],
    queryFn: () => dispatch(showAllSubCategories()),
  });

  const servicesQuery = useQuery({
    queryKey: ["allServices"],
    queryFn: () => dispatch(getAllServices()),
  });

  const cartServicesQuery = useQuery({
    queryKey: ["cartServices"],
    queryFn: () => dispatch(getAllCartServices()),
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token, navigate));
    }
  }, [dispatch, navigate]);

  // console.log(user.accountType)

  useEffect(() => {
    // dispatch(getAllCartServices());
    // dispatch(showAllCategories());
    // dispatch(showAllSubCategories());
    // dispatch(getAllServices());
    if (user?.accountType === "Admin") {
      dispatch(getAllOrders());
    } else {
      dispatch(getUserOrders());
    }
  }, [dispatch, user?.accountType]);

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

  // useEffect(() => {
  //   if (
  //     !user &&
  //     !location.pathname.includes("/checkout") &&
  //     location.pathname !== "/"
  //   ) {
  //     navigate("/");
  //     dispatch(getAllCartServices());
  //   }
  // }, [location, navigate, user, dispatch]);

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
      {!location.pathname.includes("/dashboard") &&
      !location.pathname.includes("/partner") &&
      !location.pathname.includes("/careers") &&
      location.pathname !== "/coming-soon" ? ( // Exclude Navbar from MainPage
        <Navbar onLoginClick={handleLoginClick} />
      ) : null}

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
          <Route path="/:id" element={<Categories />} />
          {/* <Route path="/service-details/:id" element={<ServiceDetailsPage />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/cancellation-and-refund-policy"
            element={<CancellationRefundPolicy />}
          />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/help" element={<Help />} />
          <Route path="/careers" element={<Careers />} />

          {(user?.accountType === "Admin" || user?.accountType === "User") && (
            <></>
          )}

          {(user?.accountType === "User" || user?.accountType === "Admin") && (
            <>
              <Route path="/dashboard/*" element={<Dashboard />}>
                <Route path="category" element={<Category />} />
                <Route path="sub-category" element={<SubCategory />} />
                <Route path="my-profile" element={<MyProfile />} />
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="my-services" element={<MyService />} />
                <Route path="service/create-service/*" element={<Service />} />
                <Route path="orders" element={<MyOrders />} />
                <Route path="partners" element={<PartnerPageAdmin />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="users" element={<Users />} />
                <Route path="user-enquires" element={<UsersEnquiries />} />
              </Route>
            </>
          )}

          {/* {(user?.accountType === "User" || user?.accountType === "Admin") && (
            <>
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="edit-profile" element={<EditProfile />} />
            </>
          )} */}

          {/* PARTNER */}
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/partner-form/*" element={<PartnerForm />} />
          <Route path="/partner/privacy-policy" element={<PartnerPolicy />} />
          <Route
            path="/partner/terms-and-conditions"
            element={<PartnerTermsAndConditions />}
          />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </div>
    </>
  );
}

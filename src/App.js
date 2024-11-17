import { useDispatch, useSelector } from "react-redux";
import "./App.css";

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
import UsersEnquiries from "./components/Enquiry/UsersEnquiries";
import ComingSoon from "./pages/ComingSoon";
import PartnerPolicy from "./pages/Partnerpolicy";
import PartnerTermsAndConditions from "./pages/PartnerTermAndCondition";
import CancellationRefundPolicy from "./pages/CancellationAndRefundPolicy";
import AboutPage from "./pages/AboutUs";
import Contact from "./components/Contact/ContactUs";
import PageNotFound from "./pages/PageNotFound";
import AdminDashboard from "./components/Dashboard/Admin Dashboard/AdminDashboard";
import { toggleSidebarVisibility } from "./slices/sidebarSlice";
import Spinner from "./Spinner";
import PrivateRoute from "./utils/PrivateRoute";
import ViewBlogs from "./components/blogs/ViewBlogs";
import CreateBlogs from "./components/blogs/CreateBlogs";
import ViewBlog from "./components/blogs/ViewBlog";
import EditBlog from "./components/blogs/EditBlog";
import Blogs from "./components/blogs/Blogs";
import AllServices from "./components/Home/AllServices";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  });
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
    if (window.innerWidth < 768) {
      const isOrderPage = location.pathname === "/dashboard/orders";
      dispatch(toggleSidebarVisibility(!isOrderPage));
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
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-white">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {!location.pathname.includes("/partner") &&
      !location.pathname.includes("/careers") &&
      location.pathname !== "/coming-soon" ? (
        <Navbar onLoginClick={handleLoginClick} />
      ) : null}

      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 top-0 bg-black bg-opacity-50 ${animationClass} max-h-screen`}
        >
          <OtpModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      )}

      <div className="">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/all-services" element={<AllServices />} />
          <Route path="/:id" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blog/preview/:slug" element={<ViewBlog />} />
          <Route path="/library" element={<Blogs />} />
          <Route path="/library/:slug" element={<ViewBlog />} />
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
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute showLoginModal={handleLoginClick}>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="addresses" element={<Addresses />} />
          </Route>
          {user?.accountType === "Content Writer" && (
            <>
              <Route path="/dashboard/*" element={<Dashboard />}>
                <Route path="blog/view-blogs" element={<ViewBlogs />} />
                <Route path="blog/create-blog" element={<CreateBlogs />} />
                <Route path="blog/edit-blog/:slug" element={<EditBlog />} />
              </Route>
            </>
          )}
          {user?.accountType === "Admin" && (
            <>
              <Route path="/dashboard/*" element={<Dashboard />}>
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="blog/view-blogs" element={<ViewBlogs />} />
                <Route path="blog/create-blog" element={<CreateBlogs />} />
                <Route path="blog/edit-blog/:slug" element={<EditBlog />} />
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
                <Route path="contacts" element={<Contact />} />
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
          {/* <Route path="/coming-soon" element={<ComingSoon />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Services from "../components/Home/Services";
import HowDoesItWorks from "../components/Home/HowDoesItWorks";
import Testimonials from "../components/Home/Testimonials";
import Footer from "../components/Home/Footer";
import OtpModal from "../components/SignupLogin/OtpModal";
import { useDispatch } from "react-redux";
import { showAllCategories } from "../slices/categorySlice";
import { getAllServices } from "../slices/serviceSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    dispatch(showAllCategories());
    dispatch(getAllServices());
  }, [dispatch]);

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
    <div className="flex w-screen min-h-screen flex-col mb-10 bg-white overflow-x-hidden">
      <Navbar onLoginClick={handleLoginClick} />
      <Hero />
      <Features />
      <Services />
      <HowDoesItWorks />
      <Testimonials />
      <Footer />

      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ${animationClass}`}
        >
          <OtpModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default MainPage;

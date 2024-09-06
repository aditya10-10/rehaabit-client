import React, { useEffect, useState } from "react";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Services from "../components/Home/Services";
import HowDoesItWorks from "../components/Home/HowDoesItWorks";
import Testimonials from "../components/Home/Testimonials";
import Footer from "../components/Home/Footer";
import { useDispatch } from "react-redux";
import { showAllCategories } from "../slices/categorySlice";
import { getAllServices } from "../slices/serviceSlice";
import { getAllCartServices } from "../slices/cartSlice";
import PopularSearches from "../components/Home/PopularSearches";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(showAllCategories());
    dispatch(getAllServices());
    dispatch(getAllCartServices());
  }, [dispatch]);

  return (
    <div className="flex w-screen min-h-screen flex-col mb-10 bg-white overflow-x-hidden">
      <Hero />
      <Features />
      <PopularSearches />
      <Services />
      <HowDoesItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default MainPage;

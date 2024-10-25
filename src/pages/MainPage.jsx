import React, { useEffect, useState, useRef } from "react";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Services from "../components/Home/Services";
import HowDoesItWorks from "../components/Home/HowDoesItWorks";
import Testimonials from "../components/Home/Testimonials";
import Footer from "../components/Home/Footer";
import Banner from "../components/Home/Banner";
import WhatWeOffer from "../components/Home/WhatWeOffer";
import { useDispatch } from "react-redux";
import { showAllCategories } from "../slices/categorySlice";
import { getAllServices } from "../slices/serviceSlice";
import { getAllCartServices } from "../slices/cartSlice";
import PopularSearches from "../components/Home/PopularSearches";

const MainPage = () => {
  const dispatch = useDispatch();

  // Step 1: Create a ref for the Features section
  const featuresRef = useRef(null);

  useEffect(() => {
    // dispatch(showAllCategories());
    dispatch(getAllServices());
    dispatch(getAllCartServices());
  }, [dispatch]);

  return (
    <div className="flex w-screen min-h-screen flex-col mb-10 bg-white overflow-x-hidden">
      {/* Pass the ref to the Hero component */}
      <Hero
        scrollToFeatures={() =>
          featuresRef.current.scrollIntoView({ behavior: "smooth" })
        }
      />

      {/* Step 3: Attach the ref to the Features section */}
      <div ref={featuresRef}>
        <Features />
      </div>

      <PopularSearches />
      <Services />
      <WhatWeOffer />
      <Banner />
      <HowDoesItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default MainPage;

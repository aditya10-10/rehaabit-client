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
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>
          Expert Home Repair, Maintenance & Improvement Services | Plumbing,
          Electrical, Carpentry & More
        </title>
        <meta
          name="description"
          content="Get professional home repair and maintenance services at your doorstep. From plumbing and electrical repairs to appliance fixes, painting, carpentry, and flooring—our expert team covers all your home needs. Book trusted professionals for hassle-free, top-quality service."
        />
        <meta
          name="keywords"
          content="home repair, maintenance services, plumbing services, electrical services, appliance repair, carpentry services, flooring services, painting services, pipe repair, toilet repair, wiring installation, outlet replacement, refrigerator repair, custom cabinets, interior painting, floor installation, expert home improvement"
        />
      </Helmet>
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

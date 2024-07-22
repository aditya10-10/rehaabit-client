import React from "react";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import CreateService from "./CreateService";
import Include from "./Include";
import Exclude from "./Exclude";
import FAQ from "./FAQ";
import HowDoesItWorks from "./HowDoesItWorks";

const Service = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />

      <Routes>
        <Route path="/" element={<CreateService />} />
        <Route path="include" element={<Include />} />
        <Route path="exclude" element={<Exclude />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="HowDoesItWorks" element={<HowDoesItWorks />} />
      </Routes>
    </div>
  );
};

export default Service;

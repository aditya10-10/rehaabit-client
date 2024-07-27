import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CreateService from "./CreateService";
import Include from "./Include";
import Exclude from "./Exclude";
import FAQ from "./FAQ";
import HowDoesItWorks from "./HowDoesItWorks";
import {
  clearServiceForm,
  createService,
  nextStep,
  previousStep,
  setServiceEditing,
} from "../../../slices/serviceSlice";
import Publish from "./Publish";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const Service = () => {
  const currentStep = useSelector((state) => state.service.currentStep);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { serviceId } = useSelector((state) => state.service);

  const steps = [
    { path: "/", component: <CreateService /> },
    { path: "include", component: <Include /> },
    { path: "exclude", component: <Exclude /> },
    { path: "faq", component: <FAQ /> },
    { path: "HowDoesItWorks", component: <HowDoesItWorks /> },
    { path: "publish", component: <Publish /> },
  ];

  const handleNext = () => {
    dispatch(nextStep());
    navigate(steps[currentStep + 1].path);
  };

  const handleBack = () => {
    dispatch(previousStep());

    if (currentStep === 1) {
      navigate("/dashboard/service/create-service");
    } else {
      navigate(steps[currentStep - 1].path);
    }
  };

  const handleGoToMyServices = () => {
    dispatch(clearServiceForm());
    navigate("/dashboard/my-services");
  };

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />

      <Routes>
        {steps.map((step, index) => (
          <Route key={index} path={step.path} element={step.component} />
        ))}
      </Routes>

      <div className="flex mt-6 mb-6 justify-end w-[50%]">
        {serviceId && currentStep === 0 && (
          <button
            onClick={() => dispatch(clearServiceForm())}
            className={`flex items-center bg-red-500 text-white font-bold py-2 px-4 rounded-md ml-4`}
          >
            Reset
          </button>
        )}

        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="flex items-center bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
          >
            <FaAngleLeft size={20} /> Back
          </button>
        )}

        {currentStep === steps.length - 1 && (
          <button
            onClick={handleGoToMyServices}
            className={
              serviceId
                ? `flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-md ml-4`
                : `flex items-center bg-gray-500 text-white font-bold py-2 px-4 rounded-md ml-4`
            }
          >
            Go to My Services
          </button>
        )}

        {currentStep < steps.length - 1 && (
          <button
            onClick={handleNext}
            className={
              serviceId
                ? `flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-md ml-4`
                : `flex items-center bg-gray-500 text-white font-bold py-2 px-4 rounded-md ml-4`
            }
            disabled={!serviceId}
          >
            Next <FaAngleRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Service;

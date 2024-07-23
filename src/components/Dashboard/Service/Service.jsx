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
  createService,
  nextStep,
  previousStep,
} from "../../../slices/serviceSlice";

const Service = () => {
  const currentStep = useSelector((state) => state.service.currentStep);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { serviceId } = useSelector((state) => state.service);

  // const serviceId = 'wesrf43'

  const [formData, setFormData] = useState({
    serviceName: "",
    serviceDescription: "",
    timeToComplete: "",
    price: "",
    categoryId: "",
    subCategoryId: "",
    thumbnail: null,
    warrantyDetails: "",
  });

  const steps = [
    { path: "/", component: <CreateService /> },
    { path: "include", component: <Include /> },
    { path: "exclude", component: <Exclude /> },
    { path: "faq", component: <FAQ /> },
    { path: "HowDoesItWorks", component: <HowDoesItWorks /> },
  ];

  // const handleNext = () => {
  //   if (currentStep === 0) {
  //     dispatch(createService({ formData })).then((response) => {
  //       if (response.payload) {
  //         dispatch(nextStep());
  //         navigate(steps[currentStep + 1].path);
  //       }
  //     });
  //   } else {
  //     dispatch(nextStep());
  //     navigate(steps[currentStep + 1].path);
  //   }
  // };

  // const handleBack = () => {
  //   if (currentStep > 0) {
  //     dispatch(previousStep());
  //     navigate(steps[currentStep - 1].path);
  //   }
  // };

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

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar/>

      <Routes>
        {steps.map((step, index) => (
          <Route key={index} path={step.path} element={step.component} />
        ))}
      </Routes>

      <div className="flex mt-6 mb-6 justify-end w-[50%]">
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
          >
            Back
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button
            onClick={handleNext}
            className={
              serviceId
                ? `bg-blue-500 text-white font-bold py-2 px-4 rounded-md ml-4`
                : `bg-gray-500 text-white font-bold py-2 px-4 rounded-md ml-4`
            }
            disabled={!serviceId}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Service;

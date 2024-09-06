import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { nextStep, previousStep } from "../../../slices/partnerSlice";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Navbar } from "..";
import FormNavigation from "./FormNavigation";
import PersonalInformation from "./PersonalInformation";
import AdditionalInformation from "./AdditionalInformation";
import BusinessInformation from "./BusinessInformation";

const PartnerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentStep, partnerFormData } = useSelector(
    (state) => state.partner
  );

  const validatePersonalInformation = (data) => {
    return (
      data.firstName &&
      data.lastName &&
      data.dateOfBirth &&
      data.gender &&
      data.nationality &&
      data.identificationType &&
      data.identificationNumber &&
      data.email &&
      data.phoneNumber
    );
  };

  const validateBusinessInformation = (data) => {
    return (
      data.businessStructure && data.businessAddress && data.alternativeContact
    );
  };

  const validateAdditionalInformation = (data) => {
    return (
      data.numberOfEmployees &&
      data.yearsOfExperience &&
      data.servicesOffered.length > 0
    );
  };

  const handleNext = () => {
    dispatch(nextStep());
    navigate(steps[currentStep + 1].path);
  };

  const handleBack = () => {
    dispatch(previousStep());
    if (currentStep === 1) {
      navigate("/partner-form/personal-information");
    } else {
      navigate(steps[currentStep - 1].path);
    }
  };

  const handleSubmit = () => {
    // Submit form logic
    // navigate("/dashboard/my-services");
  };

  const steps = [
    {
      path: "personal-information",
      component: (
        <PersonalInformation
          onSave={validatePersonalInformation}
          handleNext={handleNext}
        />
      ),
    },
    {
      path: "business-information",
      component: (
        <BusinessInformation
          onSave={validateBusinessInformation}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      ),
    },
    {
      path: "additional-information",
      component: (
        <AdditionalInformation
          onSave={validateAdditionalInformation}
          handleSubmit={handleSubmit}
          handleBack={handleBack}
        />
      ),
    },
  ];

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return validatePersonalInformation(partnerFormData.personalInformation);
      case 1:
        return validateBusinessInformation(partnerFormData.businessInformation);
      case 2:
        return validateAdditionalInformation(
          partnerFormData.additionalInformation
        );
      default:
        return false;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `
      linear-gradient(to right, rgba(253, 96, 55, 0.12),rgba(117, 45, 220, 0.06),rgba(255, 255, 255, 0.06),rgba(117, 45, 220, 0.06),rgba(253, 96, 55, 0.06))`,
      }}
    >
      <div className="flex flex-col items-center justify-center w-full font-lato">
        {/* <Navbar /> */}
        <FormNavigation />

        <Routes>
          {steps.map((step, index) => (
            <Route key={index} path={step.path} element={step.component} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default PartnerForm;

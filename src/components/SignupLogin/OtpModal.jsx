import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { login, sendOtp, signUp } from "../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/LOGO.svg";
import toast from "react-hot-toast";

const OtpModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const { error } = useSelector((state) => state.auth);

  const handleVerifyPhone = async () => {
    if (!phone) {
      // setError("Phone number is required");
      return;
    }

    try {
      await dispatch(sendOtp(phone));
      setIsOtpSent(true);
      // setError("");
    } catch (err) {
      setIsOtpSent(false);
      // setError("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!verificationCode) {
      // setError("OTP is required");
      toast.error("OTP is required");
      return;
    }

    try {
      if (isSignup) {
        await dispatch(signUp(phone, verificationCode, navigate));
      } else {
        await dispatch(login(phone, verificationCode, navigate));
      }
      // setError("");
      onClose();
      // Proceed with the next step after OTP verification
    } catch (err) {
      // setError("Failed to verify OTP");
    }
  };

  const handleReturnBack = () => {
    setIsOtpSent(false);
    // setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <main className="flex flex-col justify-center items-center px-4 py-4 bg-white rounded-xl shadow-sm max-w-[369px] transform transition-transform duration-300 scale-100">
        <img loading="lazy" src={Logo} className="h-28" alt="Company logo" />
        <h1 className="mt-5 text-2xl text-emerald-900">Sign-Up with Phone</h1>
        <p className="mt-5 text-base text-emerald-700">
          {!isOtpSent
            ? "To Continue to Phone Email"
            : `6 digit code has been sent to ${phone}`}
        </p>

        {!isOtpSent ? (
          <>
            <div className="flex flex-col items-center gap-5 p-2.5 mt-5 bg-white rounded-md shadow-sm w-full">
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={setPhone}
                onlyCountries={["in"]}
                disableDropdown
                disableSearchIcon
                inputStyle={{
                  width: "100%",
                  height: "40px",
                  fontSize: "1.25rem",
                  color: "#4a4a4a",
                  borderRadius: "0.375rem",
                  border: "1px solid #d1d5db",
                }}
                buttonStyle={{
                  border: "none",
                  background: "transparent",
                  padding: "0",
                  marginRight: "0.5rem",
                }}
                dropdownStyle={{
                  borderRadius: "0.375rem",
                  border: "1px solid #d1d5db",
                }}
              />
            </div>
            {error && <p className="mt-2 text-red-500">{error.message}</p>}
            <button
              className="justify-center items-center self-stretch p-2.5 mt-5 text-xl text-white whitespace-nowrap bg-emerald-600 rounded-md shadow-sm"
              onClick={handleVerifyPhone}
            >
              Verify
            </button>
          </>
        ) : (
          <>
            <div className="mt-5 w-full">
              <label htmlFor="verificationCode" className="sr-only">
                Enter 6 digit
              </label>
              <input
                id="verificationCode"
                type="text"
                className="w-full justify-center items-start p-2.5 text-xl bg-white rounded-md shadow-sm"
                placeholder="Enter 6 digit"
                aria-label="Enter 6 digit"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            {error && <p className="mt-2 text-red-500">{error.message}</p>}
            <button
              className="justify-center items-center p-2.5 mt-5 text-xl text-white whitespace-nowrap bg-emerald-600 rounded-md shadow-sm self-stretch"
              onClick={handleVerifyOtp}
            >
              Verify
            </button>
            <button
              className="self-center mt-5 underline"
              onClick={handleReturnBack}
            >
              Return Back
            </button>
          </>
        )}

        <div className="flex items-center">
          <p className="self-stretch mt-5 text-base text-center text-neutral-500">
            {!isSignup ? "Don't have an account?" : "Already have an account"}
          </p>
          <button className="mt-5 ml-1 text-[#0C7FDA]" onClick={() => setIsSignup(!isSignup)}>
            {!isSignup ? "Sign Up" : "Log In"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-5 text-base text-center text-red-500"
        >
          Close
        </button>
      </main>
    </div>
  );
};

export default OtpModal;

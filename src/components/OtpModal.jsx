import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import { IoIosClose } from "react-icons/io";
import { login, sendOtp, signUp } from "../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { clearAuthError } from "../slices/authSlice";

const OtpModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [timer, setTimer] = useState(0);

  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isOtpSent) {
      setTimer(60); // Set timer to 60 seconds
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOtpSent]);

  useEffect(() => {
    if (error) {
      const interval = setInterval(() => {
        dispatch(clearAuthError());
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [dispatch, error]);

  const handleVerifyPhone = async () => {
    if (!phone) {
      toast.error("Phone number is required");
      return;
    }

    try {
      await dispatch(sendOtp(phone, isSignup));
      setIsOtpSent(true);
    } catch (err) {
      setIsOtpSent(false);
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!verificationCode) {
      toast.error("OTP is required");
      return;
    }

    try {
      if (isSignup) {
        await dispatch(
          signUp(firstName, lastName, phone, verificationCode, navigate)
        );
      } else {
        await dispatch(login(phone, verificationCode, navigate));
      }
      onClose();
    } catch (err) {
      toast.error("Failed to verify OTP");
    }
  };

  const handleReturnBack = () => {
    setIsOtpSent(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <main className="relative flex flex-col justify-center items-center px-4 py-4 bg-white rounded-xl shadow-sm max-w-[369px] transform transition-transform duration-300 scale-100">
        <img
          loading="lazy"
          src="https://res.cloudinary.com/duizbchmz/image/upload/v1732435966/LOGO_df3ek6.svg"
          className="h-24"
          alt="Company logo"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full"
        >
          <IoIosClose size={24} />
        </button>
        <h1 className="text-2xl text-emerald-900">
          {isSignup ? "Sign Up" : "Log In"} with Phone
        </h1>
        <p className="mt-5 text-base text-emerald-700">
          {!isOtpSent
            ? "To Continue to Phone Email"
            : `6 digit code has been sent to ${phone}`}
        </p>

        {!isOtpSent ? (
          <>
            {isSignup && (
              <>
                <div className="mt-5 w-full rounded-lg border-2">
                  <input
                    type="text"
                    className="w-full p-2.5 text-xl bg-white rounded-md shadow-sm"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="mt-5 w-full border-2 rounded-lg">
                  <input
                    type="text"
                    className="w-full p-2.5 text-xl bg-white rounded-md shadow-sm"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* <div className="flex flex-col items-center gap-5 p-2.5 mt-5 bg-white rounded-md shadow-sm w-full">
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
            </div> */}

            <div className="flex items-center border-2 rounded-lg p-1 w-full mt-5">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                alt="India Flag"
                className="h-6 w-6 mr-2 rounded-md flex-shrink-0"
              />
              <span className="text-xl flex-shrink-0">+91</span>
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                minLength="10"
                maxLength="10"
                className="w-full min-w-0 p-2 text-xl bg-white border-none rounded-md shadow-sm"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {error && <p className="mt-2 text-red-500">{error.message}</p>}
            <button
              className="justify-center items-center self-stretch p-2.5 mt-5 text-xl text-white whitespace-nowrap bg-emerald-600 rounded-md shadow-sm"
              onClick={handleVerifyPhone}
            >
              Send OTP
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
              {isSignup ? "Sign Up" : "Log In"}
            </button>
            {timer > 0 ? (
              <p className="mt-2 text-gray-500">
                Resend OTP in {timer} seconds
              </p>
            ) : (
              <button className="mt-5 underline" onClick={handleVerifyPhone}>
                Resend OTP
              </button>
            )}
            <button
              className="self-center mt-5 underline"
              onClick={handleReturnBack}
            >
              Return Back
            </button>
          </>
        )}

        <div className="mt-5 text-center text-neutral-500">
          <p>By signing in you agree to our Terms & Conditions.</p>
          <div className="flex justify-center space-x-2">
            <a href="/privacy-policy" className="underline text-gray-700">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="/terms-and-conditions" className="underline text-gray-700">
              Terms & Conditions
            </a>
          </div>
        </div>

        <div className="flex items-center">
          <p className="self-stretch mt-5 text-base text-center text-neutral-500">
            {!isSignup ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            className="mt-5 ml-1 text-[#0C7FDA] underline"
            onClick={() => {
              setIsSignup(!isSignup);
              setIsOtpSent(false);
            }}
          >
            {!isSignup ? "Sign Up" : "Log In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default OtpModal;

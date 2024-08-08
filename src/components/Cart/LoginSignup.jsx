import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, sendOtp, signUp } from "../../services/operations/authAPI";
import toast from "react-hot-toast";

const LoginSignup = () => {
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

  const handleVerifyPhone = async () => {
    if (!phone) {
      toast.error("Phone number is required");
      return;
    }

    try {
      await dispatch(sendOtp(phone));
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
    } catch (err) {
      toast.error("Failed to verify OTP");
    }
  };

  const handleReturnBack = () => {
    setIsOtpSent(false);
  };

  return (
    <div>
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

          <div className="flex items-center border-2 rounded-lg p-1 w-full mt-5">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
              alt="India Flag"
              className="h-6 w-6 mr-2 rounded-md"
            />
            <span className="text-xl">+91</span>
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              minLength="10"
              maxLength="10"
              className="flex-1 p-2 text-xl bg-white border-none rounded-md shadow-sm"
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
            <p className="mt-2 text-gray-500">Resend OTP in {timer} seconds</p>
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
    </div>
  );
};

export default LoginSignup;

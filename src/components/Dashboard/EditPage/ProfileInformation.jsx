import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../services/operations/SettingsAPI";
import { useForm } from "react-hook-form";
import {
  clearEmailVerificationStatus,
  sendEmailOTP,
  verifyEmailOTP,
} from "../../../slices/emailSlice";

function ProfileInformation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { emailVerified } = useSelector((state) => state.email);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState(user?.additionalDetails?.email || "");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false); // New state for editing email

  useEffect(() => {
    if (emailVerified) {
      setOtpSent(false);
      setIsEditingEmail(false); // Stop editing after email is verified
    }
  }, [emailVerified]);

  useEffect(() => {
    if (user?.contactNumber) {
      const phone = user.contactNumber;
      const match = phone.match(/^(\+\d{1,3})(\d{10,12})$/);
      if (match) {
        setCountryCode(match[1]);
        setPhoneNumber(match[2]);
      }
    }
  }, [user]);

  const submitProfileForm = async (data) => {
    try {
      const fullPhoneNumber = `${data.countryCode}${data.phoneNumber}`;
      const updatedData = { ...data, contactNumber: fullPhoneNumber };
      await dispatch(updateProfile(token, updatedData));
      navigate("/dashboard/my-profile"); // navigate after profile update
      dispatch(clearEmailVerificationStatus());
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  const handleEmailVerification = (e) => {
    e.preventDefault();

    if (!otpSent) {
      dispatch(sendEmailOTP({ email }))
        .then(() => setOtpSent(true))
        .catch((error) => console.log("Error sending OTP", error));
    } else {
      dispatch(verifyEmailOTP({ email, otp }))
        .then(() => console.log("OTP Verified"))
        .catch((error) => console.log("OTP Verification failed", error));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitProfileForm)}
      className="flex flex-col justify-center"
    >
      <div className="flex flex-col justify-center p-6 mt-6 bg-amber-50 rounded-lg border border-amber-50 border-solid shadow-sm max-md:px-5 max-md:max-w-full max-sm:text-sm">
        <h2 className="text-lg font-semibold leading-6 text-violet-900 max-md:max-w-full">
          Profile Information
        </h2>
        <div className="mt-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 justify-center items-center">
            <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow pb-7 max-md:mt-6 max-md:w-full">
                <label
                  htmlFor="firstName"
                  className="text-sm leading-5 text-black max-md:w-full"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  className="p-3 mt-1.5 bg-amber-50 rounded-lg shadow-sm text-neutral-500"
                  {...register("firstName", { required: true })}
                  defaultValue={user?.additionalDetails?.firstName}
                />
                {errors.firstName && (
                  <span className="-mt-1 text-yellow-100 text-[12px]">
                    Please enter your first name.
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col grow pb-7 max-md:mt-6 max-md:w-full">
                <label
                  htmlFor="lastName"
                  className="text-sm leading-5 text-black max-md:w-full"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter last name"
                  className="p-3 mt-1.5 bg-amber-50 rounded-lg shadow-sm text-neutral-500"
                  {...register("lastName", { required: true })}
                  defaultValue={user?.additionalDetails?.lastName}
                />
                {errors.lastName && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your last name.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-5 max-md:flex-wrap max-2xl:flex-col">
          <div className="flex flex-1 gap-5 max-md:flex-wrap max-md:max-w-full w-full">
            <div className="flex flex-col">
              <label
                htmlFor="phoneNumber"
                className="text-sm leading-5 text-black"
              >
                Phone Number
              </label>
              <div className="flex gap-2.5 mt-1.5 bg-amber-50 rounded-lg shadow-sm text-neutral-500">
                <span className="p-3 bg-amber-50 text-neutral-500">
                  {countryCode}
                </span>
                <input
                  type="text"
                  value={phoneNumber}
                  className="p-3 bg-amber-50 text-neutral-500 rounded-lg shadow-sm"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 max-md:max-w-full">
            <label htmlFor="email" className="text-sm leading-5 text-black">
              Email
            </label>

            <div className="flex w-full gap-2 max-xs:flex-col max-xs:w-full">
              {!otpSent && !isEditingEmail ? (
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="p-3 mt-1.5 bg-amber-50 rounded-lg shadow-sm w-full text-neutral-500"
                  placeholder="Enter your Email address"
                  value={email}
                  disabled
                />
              ) : !otpSent && isEditingEmail ? (
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="p-3 mt-1.5 bg-amber-50 rounded-lg shadow-sm w-full text-neutral-500"
                  placeholder="Enter your Email address"
                  {...register("email", { required: true })}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <input
                  id="otp"
                  type="number"
                  name="otp"
                  className="p-3 mt-1.5 bg-amber-50 rounded-lg shadow-sm w-full text-neutral-500"
                  placeholder="Enter your 6-Digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              )}
              {!emailVerified && (
                <>
                  {!isEditingEmail && (
                    <button
                      className="text-emerald-700 w-40 rounded-lg uppercase max-xs:w-full max-xs:flex max-xs:justify-end"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEditingEmail(true);
                      }}
                    >
                      {user?.additionalDetails?.email ? "Edit" : "Add Email"}
                    </button>
                  )}
                  {isEditingEmail && (
                    <>
                      <button
                        className="text-emerald-700 w-40 rounded-lg uppercase max-xs:w-full max-xs:flex max-xs:justify-end"
                        onClick={(e) => handleEmailVerification(e)}
                      >
                        {!otpSent ? "SEND OTP" : "Verify OTP"}
                      </button>
                      <button
                        className="text-red-500 uppercase max-xs:justify-end"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsEditingEmail(false);
                          setEmail(user?.additionalDetails?.email || "");
                          setOtp("");
                          setOtpSent(false);
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5 self-end mt-6">
        <button
          className="px-6 py-3 text-red-400 border border-red-400 rounded-lg"
          onClick={() => navigate("/dashboard/my-profile")}
        >
          Cancel
        </button>
        {(emailVerified || !isEditingEmail) && (
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-700 text-emerald-50 rounded-lg"
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
}

export default ProfileInformation;

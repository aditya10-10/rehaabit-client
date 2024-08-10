import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../services/operations/SettingsAPI';
import { useForm } from 'react-hook-form';

function ProfileInformation() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

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
      dispatch(updateProfile(token, updatedData));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitProfileForm)}
      className='flex flex-col justify-center'
    >
      <div
        className="flex flex-col justify-center p-6 mt-6 bg-amber-50 rounded-lg border border-amber-50 border-solid shadow-sm max-md:px-5 max-md:max-w-full"
      >
        <h2 className="text-lg font-semibold leading-6 text-violet-900 max-md:max-w-full">
          Profile Information
        </h2>
        <div className="mt-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 justify-center items-center">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow pb-7 max-md:mt-6 max-md:max-w-full">
                <label htmlFor="firstName" className="text-sm leading-5 text-black max-md:max-w-full">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  className="justify-center items-start p-3 mt-1.5 text-base font-medium leading-6 bg-amber-50 rounded-lg shadow-sm text-neutral-500 max-md:pr-5 max-md:max-w-full"
                  {...register("firstName", { required: true })}
                  defaultValue={user?.additionalDetails?.firstName}
                />
                {/* {errors.firstName && (
                  <span className="-mt-1 text-yellow-100 text-[12px]">
                    Please enter your first name.
                  </span>
                )} */}
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full justify-center items-center">
              <div className="flex flex-col grow pb-7 max-md:mt-6 max-md:max-w-full">
                <label htmlFor="lastName" className="text-sm leading-5 text-black max-md:max-w-full">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter last name"
                  className="justify-center items-start p-3 mt-1.5 text-base font-medium leading-6 bg-amber-50 rounded-lg shadow-sm text-neutral-500 max-md:pr-5 max-md:max-w-full"
                  {...register("lastName", { required: true })}
                  defaultValue={user?.additionalDetails?.lastName}
                />
                {/* {errors.lastName && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your last name.
                  </span>
                )} */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-5 max-md:flex-wrap">
          <div className="flex flex-1 gap-5 max-md:flex-wrap max-md:max-w-full w-full">
            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="text-sm leading-5 text-black">
                Phone Number
              </label>
              <div className="flex gap-2.5 mt-1.5 text-base font-medium leading-6 whitespace-nowrap bg-amber-50 text-neutral-500 max-md:pr-5">
                <div className="flex gap-1 px-2 rounded-lg shadow-sm text-base font-medium leading-6 whitespace-nowrap justify-center items-center">
                  <select
                    name="countryCode"
                    className="bg-amber-50 text-neutral-500"
                    {...register("countryCode", { required: true })}
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    {/* Add more country codes as needed */}
                  </select>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d41972dc30845bc0c1738dbc562e6152d479de38297017dc8b2bea2fab6debd1?apiKey=52bcba1d2cc448b4873671e81d06b3cd&"
                    alt=""
                    className="shrink-0 my-auto aspect-square w-[18px]"
                  />
                </div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  className="justify-center items-start self-end p-3 text-base font-medium leading-6 bg-amber-50 rounded-lg shadow-sm text-neutral-500 max-md:pr-5 w-11/12"
                  placeholder="12345 67890"
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "Please enter your Contact Number.",
                    },
                    maxLength: { value: 12, message: "Invalid Contact Number" },
                    minLength: { value: 10, message: "Invalid Contact Number" },
                  })}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {/* {errors.contactNumber && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.contactNumber.message}
                  </span>
                )} */}
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 max-md:max-w-full">
            <label htmlFor="email" className="text-sm leading-5 text-black max-md:max-w-full">
              Email
            </label>
            <input
              id="email"
              type="email"
              name='email'
              className="justify-center items-start p-3 mt-1.5 text-base font-medium leading-6 bg-amber-50 rounded-lg shadow-sm text-neutral-500 max-md:pr-5 max-md:max-w-full"
              placeholder="Enter your Email address"
              {...register("email", { required: true })}
              defaultValue={user?.additionalDetails?.email}
            />
            {/* {errors.email && (
                <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please enter your bio details
                </span>
            )} */}
          </div>
        </div>
      </div>

      <div className="flex gap-5 self-end mt-6 text-base font-medium leading-6 text-center whitespace-nowrap">
        <button 
          className="justify-center px-6 py-3 text-red-400 rounded-lg border border-red-400 border-solid max-md:px-5"
          onClick={() => {
              user.accountType === "Admin" ? navigate("/dashboard/my-profile") : navigate("/my-profile")
          }}
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="justify-center px-6 py-3 text-emerald-50 bg-emerald-700 rounded-lg max-md:px-5"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default ProfileInformation;

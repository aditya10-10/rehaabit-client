import React from "react";

function MyProfile() {
  return (
    <main className="flex flex-col items-center pb-20 bg-white">
      <header className="flex flex-col items-start self-stretch px-5 py-9 w-full bg-white shadow-sm max-md:max-w-full">
        <h1 className="text-2xl font-medium text-black">My profile</h1>
        <p className="text-base font-light text-white">56 orders found</p>
      </header>

      <section className="flex gap-5 p-6 mt-9 max-w-full bg-amber-50 rounded-lg shadow-sm w-[792px] max-md:flex-wrap max-md:px-5">
        <div className="flex flex-1 gap-5 max-md:flex-wrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9974e307be65b1b099b3289eea6a3865139acd7b4f0c4e6a689c21a1d35d0d7e?apiKey=1c1c6b64ebb646aabb735b41207b50a2&"
            alt="Profile picture of Pranay Gupta"
            className="shrink-0 aspect-square w-[78px]"
          />
          <div className="flex flex-col flex-1 my-auto max-md:max-w-full">
            <h2 className="text-lg font-semibold leading-6 text-black max-md:max-w-full">
              Pranay Gupta
            </h2>
            <p className="text-sm leading-5 text-neutral-500 max-md:max-w-full">
              pranay@thecodehelp.in
            </p>
          </div>
        </div>
        <button className="flex gap-2 px-5 py-2 my-auto text-base font-medium leading-6 text-center text-white whitespace-nowrap bg-emerald-700 rounded-lg">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dd493d7bb07d7c84451d03e73565ade9a14c60e99ba1b32978636603ec4565f?apiKey=1c1c6b64ebb646aabb735b41207b50a2&"
            alt=""
            className="shrink-0 my-auto aspect-square w-[18px]"
          />
          <span>Edit</span>
        </button>
      </section>

      <section className="flex flex-col justify-center p-6 mt-6 max-w-full bg-amber-50 rounded-lg shadow-sm w-[792px] max-md:px-5">
        <div className="flex gap-5 max-md:flex-wrap">
          <h2 className="flex-1 my-auto text-lg font-semibold leading-6 text-violet-900 max-md:max-w-full">
            Personal Details
          </h2>
          <button className="flex gap-2 px-5 py-2 my-auto text-base font-medium leading-6 text-center text-white whitespace-nowrap bg-emerald-700 rounded-lg">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dd493d7bb07d7c84451d03e73565ade9a14c60e99ba1b32978636603ec4565f?apiKey=1c1c6b64ebb646aabb735b41207b50a2&"
              alt=""
              className="shrink-0 my-auto aspect-square w-[18px]"
            />
            <span>Edit</span>
          </button>
        </div>
        <div className="flex gap-1 mt-5 text-sm leading-5 max-md:flex-wrap">
          <div className="flex flex-col flex-1">
            <p className="text-neutral-500">First Name</p>
            <p className="font-medium text-black">Pranay</p>
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-neutral-500">Last Name</p>
            <p className="font-medium text-black">Gupta</p>
          </div>
        </div>
        <div className="flex gap-1 mt-5 text-sm leading-5 max-md:flex-wrap">
          <div className="flex flex-col flex-1 whitespace-nowrap">
            <p className="text-neutral-500">Email</p>
            <p className="text-black">pranay@thecodehelp.in</p>
          </div>
          <div className="flex flex-col flex-1">
            <p className="text-neutral-500">Phone Number</p>
            <p className="font-medium text-black">(+91) 12345 67890</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MyProfile;
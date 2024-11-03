import { React } from "react";
import { useState, useEffect } from "react";
import { sendMail } from "../services/operations/mailAPI";
import { useDispatch } from "react-redux";
export const Thankyou = () => {
  const [state, setState] = useState(false);

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <a href="javascript:void(0)">
        <img
          src="https://svgshare.com/i/14pB.svg"
          width={170}
          height={90}
          alt="Float UI logo"
        />
      </a>
      <div className="md:hidden">
        <button
          className="menu-btn text-gray-400 hover:text-gray-300"
          onClick={() => setState(!state)}
        >
          {state ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900">
      <header>
        <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
          <Brand />
        </div>
        <nav
          className={`pb-5 md:text-sm ${
            state
              ? "absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent"
              : ""
          }`}
        >
          <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
            <Brand />
          </div>
        </nav>
      </header>
      <section className="relative">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h3 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
              Thank you for your interest in our upcoming launch!{" "}
            </h3>
            <p className="max-w-2xl mx-auto text-gray-400">
              {" "}
            </p>
            <br />
            <p className="max-w-2xl mx-auto text-gray-400">
              We're thrilled to hear that you're eager to stay updated on our
              progress. Our team is indeed working tirelessly to put the
              finishing touches on something truly remarkable. We can't wait to
              share it with you!
            </p>
            <p className="max-w-2xl mx-auto text-gray-400">
              Your support means the world to us, and we're excited to embark on
              this journey together. Stay tuned for more updates!
            </p>
            <p className="max-w-2xl mx-auto text-gray-400">
              {" "}
            </p>
            <p className="max-w-2xl mx-auto text-gray-400">
              {" "}
            </p>
            <p className="max-w-2xl mx-auto text-gray-400">
              {" "}
            </p>
          </div>
        </div>
        <div
          className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          }}
        ></div>
        <p className="block text-xs lg:text-sm text-blue-200 sm:text-center dark:text-gray-400 cursor-pointer group">
          © {new Date().getFullYear()}{" "}
          <span className=" text-base lg:text-lg tracking-wide transition-all duration-200 group-hover:animate-pulse hover:tracking-widest">
            Rehaabit.
          </span>{" "}
          All Rights Reserved.
        </p>
        <p className="block text-xs text-blue-200 sm:text-center dark:text-gray-400 cursor-pointer group">
          Made with ❤️ by{" "}
          <span className="  text-base lg:text-lg  transition-all duration-200 group-hover:animate-pulse tracking-wide hover:tracking-widest">
            {" "}
            Rehaabit
          </span>
        </p>
      </section>
    </div>
  );
};

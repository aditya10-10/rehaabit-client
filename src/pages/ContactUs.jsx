import { BiSolidPhoneCall } from "react-icons/bi";
// import Footer from "../components/Home/Footer";

import { IoMailSharp } from "react-icons/io5";
import {
  FaLinkedin,
  FaInstagram,
  FaLocationDot,
  FaTwitter,
} from "react-icons/fa6";
import ContactForm from "../components/Contact/ContactForm";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex flex-col  items-center justify-center text-center w-full font-poppins">
        <Helmet>
          <title>Contact Rehaabit - Get in Touch with Our Support Team </title>
          <meta
            name="description"
            content="Have questions or need support? Contact Rehaabit today for assistance with home services, partnerships, or career inquiries. We're here to help you every step of the way."
          />
          <meta
            name="keywords"
            content="Contact Rehaabit, home service support, customer service, get in touch, Rehaabit contact, home service inquiries, contact Rehaabit team, customer assistance, partnership inquiries"
          />
        </Helmet>
        <h1 className="text-[40px] font-bold text-[#FFDA54] mb-2">
          Contact Us
        </h1>
        <span className="text-lg font-[500] text-gray-500 mb-10 px-2">
          Any question or remarks? Just write us a message!
        </span>

        <div className="flex max-md:flex-col shadow-custom-shadow max-xs:shadow-none max-xs:p-0 rounded-xl p-2 w-2/3 max-2xl:w-3/4 max-xl:w-11/12 max-md:h-screen relative">
          <div className="flex flex-col bg-purple-800 p-6 rounded-lg gap-10 w-2/5 max-md:w-full relative max-xs:items-center max-sm:justify-center">
            <div className="flex flex-col max-xs:items-center max-sm:justify-center max-xs:w-full mb-10 max-xs:mb-4">
              <h2 className="text-3xl font-semibold text-white">
                Contact Information
              </h2>
              <span className="text-lg text-[#C9C9C9]">
                We are here to help you!
              </span>
            </div>

            <div className="flex flex-col gap-10 max-xs:gap-5 w-2/3 max-2xl:w-3/4 max-xl:w-11/12 max-xs:w-full max-xs:items-center max-xs:justify-center max-xs:text-center">
              <div className="flex max-xs:flex-col items-center gap-5 max-xs:gap-2 text-white">
                <BiSolidPhoneCall size={20} />
                <span>+91 90265-89058</span>
              </div>

              <div className="flex max-xs:flex-col items-center gap-5 max-xs:gap-2 text-white">
                <IoMailSharp size={20} />
                <span>support@rehaabit.com</span>
              </div>

              <div className="flex max-xs:flex-col items-center gap-5 max-xs:gap-2 text-white">
                <FaLocationDot size={20} />
                <span className="text-start max-xs:text-center">
                  Rehaabit, 203, Indra Nagar, Mumbai, Maharashtra, India
                </span>
              </div>
            </div>

            <div className="flex mt-20">
              <div className="flex gap-5 text-white absolute bottom-10 max-xs:-translate-x-16">
                <a
                  href="https://x.com/rehaabit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-[#FF6F61] rounded-full p-2">
                    <FaTwitter />
                  </button>
                </a>

                <a
                  href="https://instagram.com/rehaabit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-purple-500 bg-white rounded-full p-2">
                    <FaInstagram />
                  </button>
                </a>

                <a
                  href="https://linkedin.com/company/rehaabit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-[#FF6F61] rounded-full p-2">
                    <FaLinkedin />
                  </button>
                </a>
              </div>
            </div>

            <div className=" flex items-end justify-end">
              <div
                className="rounded-tl-full w-48 h-48 max-xs:w-24 max-xs:h-24 absolute bottom-0 right-0"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }}
              ></div>
              <div
                className="rounded-full w-36 h-36 max-xs:w-16 max-xs:h-16 absolute bottom-16 max-xs:bottom-8 right-16 max-xs:right-8"
                style={{ backgroundColor: "rgba(255, 249, 249, 0.13)" }}
              ></div>
            </div>
          </div>

          <div className="flex justify-center w-3/5 max-md:w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMailSharp } from "react-icons/io5";
import {
  FaDiscord,
  FaInstagram,
  FaLocationDot,
  FaTwitter,
} from "react-icons/fa6";
import ContactForm from "../components/Contact/ContactForm";
import LetterSend from "../assets/letter_send.svg";
import { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center w-full font-poppins">
      <h1 className="text-[40px] font-bold text-[#FFDA54] mb-2">Contact Us</h1>
      <span className="text-lg font-[500] text-gray-500 mb-10 px-2">
        Any question or remarks? Just write us a message!
      </span>

      <div className="flex max-md:flex-col shadow-custom-shadow max-xs:shadow-none max-xs:p-0 rounded-xl p-2 w-2/3 max-2xl:w-3/4 max-xl:w-11/12 max-md:h-screen relative">
        <div className="flex flex-col bg-purple-800 p-6 rounded-lg gap-10 w-2/5 max-md:w-full relative max-xs:items-center max-sm:justify-center">
          <div className="flex flex-col max-xs:items-center max-sm:justify-center max-xs:w-full mb-10 max-xs:mb-4">
            <h1 className="text-3xl font-semibold text-white">
              Contact Information
            </h1>
            <span className="text-lg text-[#C9C9C9]">
              Say something to start a live chat!
            </span>
          </div>

          <div className="flex flex-col gap-10 max-xs:gap-5 w-2/3 max-2xl:w-3/4 max-xl:w-11/12 max-xs:w-full max-xs:items-center max-xs:justify-center max-xs:text-center">
            <div className="flex max-xs:flex-col items-center gap-5 max-xs:gap-2 text-white">
              <BiSolidPhoneCall size={20} />
              <span>+1012 3456 789</span>
            </div>

            <div className="flex max-xs:flex-col items-center gap-5 max-xs:gap-2 text-white">
              <IoMailSharp size={20} />
              <span>demo@gmail.com</span>
            </div>

            <div className="flex max-xs:flex-col items-center gap-5 max-xs:gap-2 text-white">
              <FaLocationDot size={20} />
              <span className="text-start max-xs:text-center">
                132 Dartmouth Street Boston, Massachusetts 02156 United States
              </span>
            </div>
          </div>

          <div className="flex mt-20">
            <div className="flex gap-5 text-white absolute bottom-10 max-xs:-translate-x-16">
              <button className="bg-[#FF6F61] rounded-full p-2">
                <FaTwitter />
              </button>
              <button className="text-purple-500 bg-white rounded-full p-2">
                <FaInstagram />
              </button>
              <button className="bg-[#FF6F61] rounded-full p-2">
                <FaDiscord />
              </button>
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

        {/* <img
          src={LetterSend}
          alt="letter send svg"
          className="absolute -bottom-10 right-20 w-80 z-0 max-xs:hidden"
        /> */}
      </div>
    </div>
  );
};

export default ContactUs;

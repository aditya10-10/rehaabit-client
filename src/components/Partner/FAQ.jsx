import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaCircleMinus } from "react-icons/fa6";
import png1 from "../../assets/partner/X94yM6Vbr2CAwfsQFuA0SX7awg.png.svg";
import { useLocation } from "react-router-dom";

const FAQ = ({ faqs }) => {
  const location = useLocation();
  const [activeId, setActiveId] = useState(null);

  return (
    <div
      className="flex flex-col md:flex-row w-full justify-center gap-10 md:gap-20 py-20 px-4 sm:px-10 md:px-20 lg:px-40"
      style={{
        backgroundImage: `
        linear-gradient(to right, rgba(253, 96, 55, 0.12),rgba(117, 45, 220, 0.06),rgba(255, 255, 255, 0.06),rgba(117, 45, 220, 0.06),rgba(253, 96, 55, 0.06))`,
      }}
    >
      {location.pathname === "/partner" && (
        <div className="flex flex-col w-full md:w-[40%] lg:w-[30%] space-y-10">
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>

          {/* Contact Card */}
          <div className="border border-purple-100 bg-white p-4 rounded-2xl shadow-md">
            <div className="flex gap-2">
              <img src={png1} alt="FAQ Icon" />
              <img src={png1} alt="FAQ Icon" />
              <img src={png1} alt="FAQ Icon" />
            </div>
            <h1 className="text-xl font-bold my-2">Still have a question?</h1>
            <span className="text-gray-500 text-md">
              We're ready to help you with your questions.
            </span>
            <div className="flex text-md mt-2">
              <span className="text-gray-500 mr-1">Please</span>
              <button className="text-purple-500 underline">Contact Us</button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="flex w-full md:w-[60%] justify-center">
        {faqs.length > 0 && (
          <div className="flex flex-col gap-6 w-full max-w-3xl">
            {faqs.map((faq) => {
              const { id, question, answer } = faq;
              const isActive = activeId === id;

              return (
                <div
                  key={id}
                  className={`flex flex-col w-full rounded-2xl border bg-white transition-all duration-300 shadow-md ${
                    isActive ? 'border-purple-500' : 'border-purple-200'
                  }`}
                >
                  <button
                    onClick={() => setActiveId(isActive ? null : id)}
                    className="flex items-center justify-between w-full p-4"
                  >
                    <span className="capitalize font-semibold text-md sm:text-lg">
                      {question}
                    </span>
                    {isActive ? (
                      <FaCircleMinus className="text-purple-500" size={25} />
                    ) : (
                      <CiCirclePlus className="text-purple-500" size={25} />
                    )}
                  </button>

                  {/* Answer Section */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isActive ? "max-h-96 p-4" : "max-h-0"
                    }`}
                  >
                    <span className="text-gray-600 text-sm">{answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
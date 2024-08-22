import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaCircleMinus } from "react-icons/fa6";

import png1 from "../../assets/partner/X94yM6Vbr2CAwfsQFuA0SX7awg.png.svg";

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I get started on the Rehaabit Platform?",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
    {
      id: 2,
      question: "How do I get started on the Rehaabit Platform?",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
    {
      id: 3,
      question: "How do I get started on the Rehaabit Platform?",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
    {
      id: 4,
      question: "How do I get started on the Rehaabit Platform?",
      answer:
        "Getting started is easy! Simply sign up, create your professional profile, and start browsing job opportunities. You can showcase your skills, set your availability, and connect with clients looking for your expertise.",
    },
  ];

  return (
    <div
      className="flex w-full justify-center gap-20 py-40 px-60 h-[757px]"
      style={{
        backgroundImage: `
    linear-gradient(to right, rgba(253, 96, 55, 0.12),rgba(117, 45, 220, 0.06),rgba(255, 255, 255, 0.06),rgba(117, 45, 220, 0.06),rgba(253, 96, 55, 0.06))`,
      }}
    >
      <div className="flex flex-col w-[60%]">
        <div className="flex flex-col gap-44 w-[70%]">
          <h1 className="text-4xl font-bold">Frequently asked question</h1>

          <div className="border border-purple-100 bg-white p-2 rounded-2xl flex flex-col">
            <div className="flex gap-2">
              <img src={png1} alt="" />
              <img src={png1} alt="" />
              <img src={png1} alt="" />
            </div>
            <h1 className="text-xl font-bold my-2">Still have a questions?</h1>
            <span className="text-gray-500 text-md">
              We're ready to help you to answer questions.
            </span>
            <div className="flex text-md">
              <span className="text-gray-500 mr-1">Please</span>
              <button className="text-purple-500 underline">Contact Us.</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full">
        {faqs.length > 0 && (
          <div className="flex justify-center gap-40 w-full">
            <div className="flex flex-col gap-5 rounded-lg p-6 w-[80%]">
              {faqs.map((faq) => {
                const { id, question, answer } = faq;
                const isActive = activeId === id;

                return (
                  <div
                    key={id}
                    className={`flex w-full rounded-2xl border bg-white transition-all duration-300 ${
                      isActive ? `border-purple-500` : `border-purple-100`
                    }`}
                  >
                    <button
                      onClick={() => setActiveId(isActive ? null : id)}
                      className="flex flex-col items-center w-full p-4"
                    >
                      <div className="flex justify-between items-center w-full">
                        <span>{question}</span>
                        {isActive ? (
                          <FaCircleMinus
                            className="text-purple-500"
                            size={30}
                          />
                        ) : (
                          <CiCirclePlus className="text-purple-500" size={30} />
                        )}
                      </div>

                      <div
                        className={`overflow-hidden transition-max-height duration-300 ease-in-out text-start ${
                          isActive ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <span className="text-start mt-4 text-gray-600">
                          {answer}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;

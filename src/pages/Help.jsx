import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFAQs } from "../slices/serviceSlice";
import Fuse from "fuse.js";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoMdContacts } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Home/Footer";
import { Helmet } from "react-helmet-async";

const Help = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { faqs } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getAllFAQs());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const options = {
    keys: ["question", "answer"],
    threshold: 0.3, // Adjust threshold for fuzziness
  };

  const fuse = new Fuse(faqs, options);

  const results = searchQuery
    ? fuse.search(searchQuery)
    : faqs.map((faq) => ({ item: faq }));

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full mb-10 px-2 font-poppins">
        <Helmet>
          <title>
            Rehaabit Help Center - Professional Home Service & Support
          </title>
          <meta
            name="description"
            content="Need help with Rehaabit's home services? Get answers, troubleshoot issues, and access support for all your service needs in our Help Center. We're here to assist!"
          />

          <meta
            name="keywords"
            content="Home cleaning services, plumbing services, electrical repair services, HVAC maintenance, pest control services, appliance repair, carpentry services, landscaping and lawn care, painting and decorating, roof repair services, home renovation, handyman services, home security installation, window cleaning services, gutter cleaning services, carpet cleaning, interior design services, solar panel installation, smart home setup, flooring installation services."
          />
        </Helmet>
        <img
          src="https://res.cloudinary.com/duizbchmz/image/upload/v1732435966/LOGO_df3ek6.svg"
          alt="Rehaabit"
          className="w-48"
        />
        <h1 className="text-4xl text-blue-700	max-md:text-4xl max-sm:text-2xl">
          How can we help you?
        </h1>

        {/* Search */}
        <div className="relative flex items-center max-lg:w-[50%] max-sm:w-[90%] max-md:mt-2 shadow-custom-shadow border px-2 py-4 rounded-md my-10">
          <span className="ml-8">
            <IoSearchOutline size={20} />
          </span>

          <input
            type="text"
            className="px-2 w-96 max-xl:w-72 max-lg:w-60 max-md:w-full mr-2 outline-none"
            placeholder="Describe your issue"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {searchQuery && (
            <RxCross2
              size={20}
              className="mr-2 cursor-pointer"
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>

        {/* FAQ */}
        <div className="flex flex-col w-1/2 max-lg:w-4/5 max-sm:w-[90%]">
          <h2 className="text-2xl">Browse help topics</h2>
          {results.length > 0 && (
            <div className="flex flex-col gap-5 w-full p-6 max-sm:p-4 mt-4">
              {results.length > 0 && (
                <div className="flex flex-col gap-5 w-full p-6 max-sm:p-4 mt-4">
                  {results.slice(0, 10).map((faq) => {
                    const { _id, question, answer } = faq.item;
                    const isActive = activeId === _id;

                    return (
                      <div key={_id} className="flex w-full">
                        <button
                          onClick={() => setActiveId(isActive ? null : _id)}
                          className="flex flex-col items-center w-full bg-gray-50 p-2 transition-all duration-300 rounded-lg border"
                        >
                          <div className="flex justify-between items-center w-full">
                            <h3>{question}</h3>
                            {isActive ? (
                              <RiArrowDropUpLine size={30} />
                            ) : (
                              <RiArrowDropDownLine size={30} />
                            )}
                          </div>

                          <div
                            className={`overflow-hidden transition-max-height duration-300 ease-in-out text-start w-full ${
                              isActive ? "max-h-96" : "max-h-0"
                            }`}
                          >
                            <p className="text-start mt-4 text-gray-600">
                              {answer}
                            </p>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {searchQuery && results.length === 0 && (
          <div className="text-2xl">No results found.</div>
        )}

        <div className="border rounded-lg p-6 max-sm:p-4 flex flex-col items-center mt-10 max-sm:mt-6">
          <h2 className="text-2xl">Need more help?</h2>
          <span>Try these next steps</span>

          <button
            className="flex max-sm:flex-col items-center mt-10 max-sm:mt-6 gap-5 bg-blue-50 rounded-lg p-6 max-sm:p-4"
            onClick={() => navigate("/contact-us")}
          >
            <IoMdContacts size={30} />

            <div className="flex flex-col items-start max-sm:text-center max-sm:w-full">
              <span className="max-sm:text-center max-sm:w-full">
                Need more help? Contact Us
              </span>
              <p className="text-gray-500">
                Reach out to us for further assistance
              </p>
              <button
                className="text-blue-500 mt-2 underline"
                onClick={() => (window.location.href = "/contact-us")}
              >
                {" "}
              </button>
            </div>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Help;

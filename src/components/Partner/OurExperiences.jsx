import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Quote from "../../assets/partner/quote.svg";
import React, { useState, useRef, useEffect } from "react";

const OurExperiences = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const testimonials = [
    {
      text: "Rehaabit ne meri electrical business ko transform kar diya hai. Clients ki steady flow aur user-friendly scheduling tools ne meri earnings ko improve kiya aur workload ko kam kiya. Yeh service professionals ke liye ek must-have tool hai.",
      name: "Manoj S",
      location: "Andheri",
    },
    {
      text: "Rehaabit join karne ke baad meri business visibility bahut badh gayi hai. Unka platform use karna bahut easy hai aur customer base bhi extensive hai. Yeh sach mein ek game-changer hai.",
      name: "Ravindra K",
      location: "Sandhurst Road",
    },
    {
      text: "Rehaabit ke tools aur resources ne meri cleaning services ko efficiently manage karna bahut asaan bana diya. Productivity aur overall satisfaction dono hi improve huye hain.",
      name: "Anil P",
      location: "Khar Road",
    },
    {
      text: "Rehaabit ka platform meri pest control business ko streamline karne mein madad kar raha hai. Easy-to-use features aur reliable client flow ne meri services ko manage karna bahut simple aur profitable bana diya hai.",
      name: "Meera R",
      location: "Thakurli",
    },
    {
      text: "Rehaabit ki support aur features meri plumbing business ke liye invaluable hain. Platform straightforward hai aur client engagement bhi significant increase hua hai.",
      name: "Rajesh V",
      location: "Bandra",
    },
    {
      text: "Rehaabit ke saath meri home repair business manage karna bahut efficient ho gaya hai. Unke scheduling tools aur broad customer reach ke saath, maine apne services ko easily expand kiya hai.",
      name: "Neha M",
      location: "Bhandup",
    },
    {
      text: "Rehaabit ki wajah se meri car repair business manage karna bahut zyada efficient ho gaya hai. Platform ke robust features aur vast client base ne meri business growth mein bahut madad ki hai.",
      name: "Sanjay D",
      location: "Chinchpokli",
    },
    // Add more testimonials here
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 2 : prevIndex - 2
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 2 ? 0 : prevIndex + 2
    );
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: currentIndex * sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="flex flex-col py-10 px-4 sm:px-10 md:px-20 lg:px-40 gap-10">
      {/* Header and Navigation */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-2xl font-bold w-full md:w-[40%] capitalize">
          Our Experiences - Customer Satisfaction
        </h2>

        <div className="flex gap-2 items-center">
          <button
            className="border rounded-full p-2 text-gray-500"
            onClick={handlePrev}
          >
            <GoArrowLeft size={20} />
          </button>

          <button
            className="border border-orange-500 text-white bg-orange-500 rounded-full p-2"
            onClick={handleNext}
          >
            <GoArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials
          .slice(currentIndex, currentIndex + 2)
          .map((testimonial, index) => (
            <div
              key={index}
              className="p-6 border border-purple-500 rounded-3xl shadow-lg max-w-full w-full"
            >
              <p className="text-center">{testimonial.text}</p>

              <div className="flex w-full items-center justify-between my-4">
                <div className="flex items-center w-full gap-4">
                  <div className="flex flex-col">
                    <span className="font-semibold">{testimonial.name}</span>
                    <span className="text-gray-500">
                      {testimonial.location}
                    </span>
                  </div>
                </div>

                <div className="flex">
                  <img src={Quote} alt="Quote" className="h-4 w-4" />
                  <img src={Quote} alt="Quote" className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center w-full gap-2">
        {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
          (_, index) => (
            <div
              key={index}
              className={`border rounded-full p-1 cursor-pointer ${
                currentIndex === index * 2
                  ? "bg-purple-500 border-purple-500"
                  : "border-purple-500"
              }`}
              onClick={() => setCurrentIndex(index * 2)}
            ></div>
          )
        )}
      </div>
    </div>
  );
};

export default OurExperiences;

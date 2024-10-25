import React, { useEffect } from "react";
import Footer from "../components/Home/Footer";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Helmet>
        <title>
          About Rehaabit - Our Mission in Transforming Home Services
        </title>
        <meta
          name="description"
          content="Learn more about us, our mission, and the values that drive us to deliver high-quality home services. We're committed to making home service solutions simple and reliable"
        />
        <meta
          name="keywords"
          content="Rehaabit terms and conditions, service guidelines, platform terms, user agreement, service policies, Rehaabit usage terms, legal guidelines"
        />
      </Helmet>
      <div className="max-w-screen-lg mx-auto p-4 font-inter">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            We’re here to
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">
            deliver the best for your home
          </h2>
          <hr className="w-12 sm:w-16 border-t-2 border-gray-300 mt-2 mx-auto" />
        </div>

        {/* Intro Section */}
        <div className="bg-blue-500 text-white p-4 sm:p-6 md:p-8 rounded-lg">
          <p className="text-sm sm:text-base md:text-lg">
            Rehaabit offers a wide range of expert home solutions designed to
            meet the unique needs of homeowners. We work with industry
            professionals to create an efficient, safe, and aesthetically
            pleasing home environment. With a focus on modern techniques and
            customer-centric service, our goal is to elevate your living spaces.
          </p>
        </div>

        {/* Subheader Section */}
        <div className="text-center mt-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            We’re here for your home,
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">
            no matter where you are
          </h3>
          <hr className="w-12 sm:w-16 border-t-2 border-gray-300 mt-2 mx-auto" />
        </div>

        {/* Mission Section */}
        <div className="space-y-4 mt-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Our <span className="text-blue-500">Mission</span>
          </h2>

          <div className="space-y-2">
            <h3 className="font-bold text-base sm:text-lg text-gray-800">
              Unmatched Quality
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              We provide top-tier home services, ensuring that every job is
              completed with precision and care. From remodeling to repairs, we
              aim to exceed client expectations.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-base sm:text-lg text-gray-800">
              Specialized Expertise
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              With a focus on specialized areas such as plumbing, electrical,
              and structural improvements, we ensure all your home service needs
              are met professionally.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-base sm:text-lg text-gray-800">
              Client Satisfaction
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Our core goal is ensuring customer satisfaction by providing
              transparent services that improve the safety, functionality, and
              beauty of homes.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-base sm:text-lg text-gray-800">
              Efficiency and Safety
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              We prioritize both speed and safety in our operations, ensuring a
              smooth process with minimal disruption to your daily life.
            </p>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="space-y-4 mt-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Our <span className="text-blue-500">Commitment</span>
          </h2>
          <div className="space-y-2">
            <h3 className="font-bold text-base sm:text-lg text-gray-800">
              Reliability
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              At Rehaabit, reliability means showing up on time, being thorough
              in our work, and standing by our results.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-base sm:text-lg text-gray-800">
              Craftsmanship
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Our team of certified experts ensures that every project is
              carried out to perfection, combining the best tools and techniques
              in the industry.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-base sm:text-lg text-gray-800">
              Long-term Solutions
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              We focus on providing long-lasting home solutions. From
              energy-efficient installations to durable materials, we ensure
              that your home improvements withstand the test of time.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

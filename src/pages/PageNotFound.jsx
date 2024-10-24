import React from "react";
import { Link } from "react-router-dom";
import Error from "../assets/404.webp";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Home/Footer";
import { Helmet } from "react-helmet-async";

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>Oops! Page Not Found - Rehaabit Home Services</title>
        <meta
          name="description"
          content="Sorry, the page you're looking for doesn't exist. Head back to Rehaabit's homepage to find the home services or information you need. We're here to help!"
        />
        <meta
          name="keywords"
          content="Rehaabit 404 error, page not found, missing page, error page, Rehaabit homepage, broken link, find home services"
        />
      </Helmet>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        <div className="p-8 max-w-4xl text-center">
          {/* Main text */}
          <h1 className="text-5xl font-bold text-gray-800">Ooops...</h1>
          <h2 className="text-3xl font-semibold text-gray-600 mt-4">
            This page does not exist
          </h2>
          <p className="text-gray-500 mt-2">
            We're sorry, but the page you're looking for can't be found. It
            might have been moved or deleted.
          </p>

          {/* Image */}
          <div className="mt-8">
            <img
              className="mx-auto w-72 md:w-96"
              src={Error}
              alt="Page not found image"
            />
          </div>

          {/* Back button */}
          <div className="mt-6">
            <Link
              to="/"
              className="bg-red-500 text-white py-2 px-6 rounded-full inline-flex items-center hover:bg-red-600"
            >
              Go Back <span className="ml-2">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;

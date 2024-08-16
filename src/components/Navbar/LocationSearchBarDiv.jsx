import React, { useEffect, useRef, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import { Search } from "./Search";
import SearchData from "./SearchData";

const LocationSearchBarDiv = () => {
  const navigate = useNavigate();

  const locationDropdownRef = useRef(null);

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     navigate(`/search?query=${searchQuery}`);
  //   }
  // };

  // console.log(searchQuery)

  const handleLocationSearch = (e) => {
    const query = e.target.value;
    setLocationSearch(query);
    setIsLocationDropdownOpen(true);

    // Simulate fetching search suggestions based on the input
    if (query) {
      setLocationSuggestions([
        `${query} Street, Springfield`,
        `${query} Road, Shelbyville`,
        `${query} Avenue, Capital City`,
      ]);
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Fetch city and pincode from coordinates
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          )
            .then((response) => response.json())
            .then((data) => {
              const detectedCity =
                data.address.city || data.address.town || data.address.village;
              const detectedPincode = data.address.postcode;
              setCity(detectedCity);
              setPincode(detectedPincode);
              setIsLocationDropdownOpen(false);
            })
            .catch((error) =>
              console.error("Error fetching location data:", error)
            );
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  };

  const handleOutsideClick = (e) => {
    if (
      locationDropdownRef.current &&
      !locationDropdownRef.current.contains(e.target)
    ) {
      setIsLocationDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="relative" ref={locationDropdownRef}>
        <div
          className="flex items-center gap-2 border p-4 rounded-md shadow-custom-shadow w-60 max-xl:w-40 max-lg:hidden cursor-pointer"
          onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
        >
          <span>
            <CiLocationOn size={20} />
          </span>
          <span className="text-gray-600">
            {city ? `${city}, ${pincode}` : "Search for a location..."}
          </span>
        </div>

        <span
          ref={locationDropdownRef}
          onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          className="items-center gap-2 p-4 max-md:mt-2 rounded-md hidden cursor-pointer max-lg:flex"
        >
          <CiLocationOn size={20} />
        </span>

        {isLocationDropdownOpen && (
          <div className="absolute z-20 mt-2 w-64 bg-white rounded-md shadow-lg py-2">
            <input
              type="text"
              className="w-full px-3 py-2 border-b"
              placeholder="Search by city or pincode"
              value={locationSearch}
              onChange={handleLocationSearch}
            />
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              onClick={handleDetectLocation}
            >
              <CiLocationOn size={20} />
              Detect Location
            </button>
            {locationSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                onClick={() => {
                  setCity(suggestion);
                  setIsLocationDropdownOpen(false);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative flex items-center max-lg:w-full max-md:mt-2 shadow-custom-shadow border px-2 py-1 rounded-md">
        <input
          type="text"
          className="p-2 w-96 max-xl:w-72 max-lg:w-60 max-md:w-full mr-2"
          placeholder="Search for services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {searchQuery && <RxCross2
          size={20}
          className="mr-2 cursor-pointer"
          onClick={() => setSearchQuery("")}
        />}

        <span className="bg-red-400 p-2 text-white rounded-md">
          <IoSearchOutline size={20} />
        </span>

        <SearchData searchQuery={searchQuery} />
      </div>

      {/* ALGOLIA SEARCH */}
      {/* <div className="relative flex flex-col w-96 items-center max-lg:w-full">
        <Search />
      </div> */}
    </>
  );
};

export default LocationSearchBarDiv;

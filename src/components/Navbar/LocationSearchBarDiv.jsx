import React, { useEffect, useRef, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TbCurrentLocation } from "react-icons/tb";
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

  const handleSearchQuery = () => {
    setSearchQuery("");
  };

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
              console.log("Location data:", data);
              const detectedCity =
                data.address.city || data.address.town || data.address.village || data.display_name;
              const detectedPincode = data.address.postcode;
              setCity(detectedCity);
              setPincode(detectedPincode);
              setIsLocationDropdownOpen(false);
              setLocationSuggestions([
                `${detectedCity}`
              ]);
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
  const handleClearlocation = () => {
    setLocationSuggestions([]);
    setCity("");
    setPincode("");
  }
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    // Check if location permission is already granted
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        // If granted, automatically detect location
        handleDetectLocation();
      }
    });
  }, []);
  
  return (
    <>
      <div className="relative" ref={locationDropdownRef}>
        <div
          className="flex items-center gap-2 border p-2 rounded-full shadow-custom-shadow w-60 max-lg:hidden cursor-pointer"
          onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          style={{
            fontFamily: "Montserrat, sans-serif",
            // fontWeight: "italic",
            fontSize: "48px",
            color: "#333",
          }}
        >
          <span>
            <CiLocationOn size={20} />
          </span>
          <span
            className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap"
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "16px",
              color: "#444",
            }}
          >
            {city ? `${city}` : "Search for a location..."}
          </span>
        </div>

        <span
          ref={locationDropdownRef}
          onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          className="items-center gap-2 max-lg:p-2 max-md:mt-2 rounded-full hidden cursor-pointer max-lg:flex"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "bold",
            fontSize: "48px",
            color: "#333",
          }}
        >
          <CiLocationOn size={20} />
        </span>

        {isLocationDropdownOpen && (
          <div
            className="absolute z-20 mt-2 w-96 max-md:w-80 bg-white rounded-md shadow-lg py-4"
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "16px",
              color: "#444",
            }}
          >
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 w-full"
              onClick={handleDetectLocation}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "500",
                fontSize: "16px",
                color: "#4CB4F9", 
                backgroundColor: "#fff",
              }}
            >
              <TbCurrentLocation size={20} />
              Detect Location
            </button>
            <div
              className="flex justify-between items-center px-4 py-2"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                color: "#888", 
                fontSize: "10px", 
              }}
            >
              <span>RECENT LOCATIONS</span>
              <button
                className="text-s text-blue-500"
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontWeight: "bold",
                  color: "#4CB4F9", 
                  fontSize: "12px",
                }}
                onClick={handleClearlocation}
              >
                Clear All
              </button>
            </div>

            {locationSuggestions.length ? (
              locationSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full overflow-hidden text-ellipsis whitespace-nowrap"
                  onClick={() => {
                    setCity(suggestion);
                    setIsLocationDropdownOpen(false);
                  }}
                  style={{
                    fontFamily: "Open Sans, sans-serif",
                    fontSize: "16px",
                    color: "#444",
                  }}
                >
                  {suggestion}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-700">
                No recent locations
              </div>
            )}
          </div>
        )}


      </div>

      {/* Search Bar */}
      <div
        className="relative flex items-center max-lg:w-full max-md:mt-2 shadow-custom-shadow border px-2 py-1 rounded-full"
        style={{
          fontFamily: "Open Sans, sans-serif",
          fontSize: "16px",
          color: "#444",
        }}
      >
        <input
          type="text"
          className="px-2 w-96 max-xl:w-72 max-lg:w-60 max-md:w-full mr-2 outline-none"
          placeholder="Search for services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: "16px",
            color: "#444",
          }}
        />

        {searchQuery && (
          <RxCross2
            size={20}
            className="mr-2 cursor-pointer"
            onClick={() => setSearchQuery("")}
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "16px",
              color: "#444",
            }}
          />
        )}

        <span
          className="bg-red-400 p-1 text-white rounded-full"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: "600",
            fontSize: "16px",
            color: "#FFF",
            backgroundColor: "#F04A00",
          }}
        >
          <IoSearchOutline size={20} />
        </span>

        <SearchData
          searchQuery={searchQuery}
          handleSearchQuery={handleSearchQuery}
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: "16px",
            color: "#444",
          }}
        />
      </div>
    </>
  );
};

export default LocationSearchBarDiv;

import React, { useEffect, useRef, useState, useCallback } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TbCurrentLocation } from "react-icons/tb";
import { Search } from "./Search";
import SearchData from "./SearchData";
import { useDispatch, useSelector } from "react-redux";
import { getLocationSuggestions } from "../../slices/locationSlice";
import debounce from "lodash/debounce";

const LocationSearchBarDiv = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locationDropdownRef = useRef(null);
  const [locationsuggestions, setLocationsuggestions] = useState([]);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [recentLocations, setRecentLocations] = useState([]);
  const [showRecent, setShowRecent] = useState(true);
//   const { locationSuggestions, isLoading } = useSelector((state) => state.location);
//   console.log(locationSuggestions)
//   console.log(locationsuggestions)
//   useEffect(() => {
//     // Load recent locations from localStorage
//     const storedLocations = JSON.parse(localStorage.getItem('recentLocations')) || [];
//     setRecentLocations(storedLocations);
//   }, []);
//  useEffect(()=>{
//   setLocationsuggestions(locationSuggestions.suggestedLocations)
//  },[locationSuggestions])
  const handleSearchQuery = () => {
    setSearchQuery("");
  };

  // const debouncedGetLocationSuggestions = useCallback(
  //   debounce((value) => {
  //     dispatch(getLocationSuggestions(value));
  //   }, 1000),
  //   [dispatch]
  // );

  // const handleLocationSearch = (e) => {
  //   const value = e.target.value;
  //   setCity(value);
  //   setShowRecent(false);
  //   if (value.trim()) {
  //     debouncedGetLocationSuggestions(value);
  //   } else {
  //     setLocationsuggestions([]);
  //   }
  //   // Open the dropdown when user starts typing
  //   setIsLocationDropdownOpen(true);
  // };

  // const handleInputClick = () => {
  //   setCity("");
  //   setShowRecent(true);
  //   setLocationsuggestions([]);
  // };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          )
            .then((response) => response.json())
            .then((data) => {
              const detectedCity =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.display_name;
              const detectedPincode = data.address.postcode;
              setCity(detectedCity);
              setPincode(detectedPincode);
              // setLocationsuggestions([detectedCity]);
              addToRecentLocations(detectedCity);
            })
            
        },
        (error) => {
          // console.error("Error getting geolocation:", error);
        }
      );
    }
  };

  const addToRecentLocations = (location) => {
    const updatedLocations = [location, ...recentLocations.filter(loc => loc !== location)].slice(0, 5);
    setRecentLocations(updatedLocations);
    localStorage.setItem('recentLocations', JSON.stringify(updatedLocations));
  };

  const handleClearLocation = () => {
    // setLocationsuggestions([]);
    setCity("");
    setPincode("");
    setRecentLocations([]);
    localStorage.removeItem('recentLocations');
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

  useEffect(() => {
    // Check if location permission is already granted
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        // If granted, automatically detect location
        handleDetectLocation();
      }
    });
  }, []);
  
  // useEffect(() => {
  //   setLocationsuggestions(locationSuggestions.suggestedLocations);
  // }, [locationSuggestions]);

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
            <input
              className='border-none outline-none cursor-pointer'
              readOnly
              type="text"
              value={city}
              placeholder="Search for a location..."
              // onChange={handleLocationSearch}
              // onClick={handleInputClick}
            />
          </span>
        </div>

        <span
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

            {showRecent ? (
              recentLocations.length > 0 ? (
                <>
                  <div className="flex justify-between items-center px-4 py-2">
                    <span className="text-sm text-gray-600">RECENT LOCATIONS</span>
                    <button
                      className="text-sm text-blue-500"
                      onClick={handleClearLocation}
                    >
                      Clear All
                    </button>
                  </div>
                  {recentLocations.map((location, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      onClick={() => {
                        setCity(location);
                        setIsLocationDropdownOpen(false);
                      }}
                    >
                      {location}
                    </button>
                  ))}
                </>
              ) : (
                <div className="px-4 py-2 text-sm text-gray-700">
                  No recent locations
                </div>
              )
            ) : !showRecent && 
            locationsuggestions?.length > 0 ? 
            (
              <>
                <div className="px-4 py-2">SUGGESTIONS</div>
                {/* {locationsuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    onClick={() => {
                      setCity(suggestion.placeName);
                      setIsLocationDropdownOpen(false);
                      addToRecentLocations(suggestion.placeName);
                    }}
                  >
                    {suggestion.placeName}
                  </button>
                ))} */}
              </>
            ) : !showRecent ? (
              <div className="px-4 py-2 text-sm text-gray-700">
                No suggestions found
              </div>
            ) : null}
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

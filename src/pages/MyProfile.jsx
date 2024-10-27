import React, { useEffect } from "react";
import ProfileHeader from "../components/Dashboard/MyProfile/ProfileHeader";
import ProfileCard from "../components/Dashboard/MyProfile/ProfileCard";
import PersonalDetails from "../components/Dashboard/MyProfile/PersonalDetails";
import { Helmet } from "react-helmet-async";

function MyProfile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="flex  items-center justify-center w-full mt-10 max-sm:mt-4 max-xs:mt-6"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <Helmet>
        <title>Profile - Rehaabit</title>
        <meta
          name="description"
          content="Your personalized Rehaabit profile, where you can manage your account, change your password, and update your profile information."
        />
        <meta
          name="keywords"
          content="Rehaabit, profile, account, password, change password, update profile information"
        />
      </Helmet>

      <main className="flex flex-col bg-white items-center pb-20 max-sm:pb-4  shadow-custom-shadow max-xs:shadow-none p-10 max-sm:p-4 max-sm:ml-11 rounded-lg w-[60%] max-xl:w-[80%] max-md:w-[90%] max-xs:w-full">
        <ProfileHeader />
        <ProfileCard />
        <PersonalDetails />
      </main>
    </div>
  );
}

export default MyProfile;

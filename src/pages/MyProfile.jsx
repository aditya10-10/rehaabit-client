import React from "react";
import ProfileHeader from "../components/Dashboard/MyProfile/ProfileHeader";
import ProfileCard from "../components/Dashboard/MyProfile/ProfileCard";
import PersonalDetails from "../components/Dashboard/MyProfile/PersonalDetails";

function MyProfile() {
  return (
    <div className="flex items-center justify-center w-full mt-10 max-sm:mt-4 max-xs:mt-6">
      <main className="flex flex-col items-center pb-20 max-sm:pb-4 bg-white shadow-custom-shadow max-xs:shadow-none p-10 max-sm:p-4 rounded-lg w-[60%] max-xl:w-[80%] max-md:w-[90%] max-xs:w-full">
        <ProfileHeader />
        <ProfileCard />
        <PersonalDetails />
      </main>
    </div>
  );
}

export default MyProfile;

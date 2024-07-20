import React from "react";
import ProfileHeader from "../components/Dashboard/MyProfile/ProfileHeader";
import ProfileCard from "../components/Dashboard/MyProfile/ProfileCard";
import PersonalDetails from "../components/Dashboard/MyProfile/PersonalDetails";

function MyProfile() {
  return (
    <div className="flex items-center mx-auto">
      <main className="flex flex-col items-center pb-20 bg-white shadow-custom-shadow p-10 rounded-lg">
        <ProfileHeader />
        <ProfileCard />
        <PersonalDetails />
      </main>
    </div>
  );
}

export default MyProfile;

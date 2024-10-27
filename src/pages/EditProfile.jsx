import React from "react";
import ProfileHeader from "../components/Dashboard/EditPage/ProfileHeader";
import ProfilePicture from "../components/Dashboard/EditPage/ProfilePicture";
import ProfileInformation from "../components/Dashboard/EditPage/ProfileInformation";
import DeleteAccount from "../components/Dashboard/EditPage/DeleteAccount";
import { Helmet } from "react-helmet-async";

function ProfilePage() {
  return (
    <div className="flex items-center justify-center w-full mt-10 max-sm:mt-4 max-xs:mt-6">
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
      <main className="flex flex-col items-center pb-20 max-sm:pb-4 bg-white shadow-custom-shadow max-xs:shadow-none p-10 max-sm:p-4 rounded-lg w-[60%] max-xl:w-[80%] max-md:w-[90%] max-sm:w-full">
        <ProfileHeader />
        <div className="flex flex-col self-center mt-6 w-full">
          <ProfilePicture />
          <ProfileInformation />
          <DeleteAccount />
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;

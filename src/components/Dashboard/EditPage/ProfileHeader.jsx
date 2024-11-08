import React from "react";

function ProfileHeader() {
  return (
    <header className="flex flex-col items-start w-full px-5 py-6 bg-white shadow-sm max-md:max-w-full max-sm:py-3">
      <h1 className="text-2xl font-semibold text-black max-sm:text-xl">
        My Profile
      </h1>
    </header>
  );
}

export default ProfileHeader;

import React from 'react';

function ProfileHeader() {
  return (
    <header className="flex flex-col items-start self-stretch px-5 py-9 max-sm:py-4 w-full bg-white shadow-sm max-md:max-w-full">
      <h1 className="text-2xl font-medium text-black">My profile</h1>
    </header>
  );
}

export default ProfileHeader;
import React from 'react';
import ProfileHeader from '../components/Dashboard/EditPage/ProfileHeader';
import ProfilePicture from '../components/Dashboard/EditPage/ProfilePicture';
import ProfileInformation from '../components/Dashboard/EditPage/ProfileInformation';
import DeleteAccount from '../components/Dashboard/EditPage/DeleteAccount';

function ProfilePage() {
  return (
    <main className="flex flex-col pb-20 bg-white">
      <ProfileHeader />
      <div className="flex flex-col self-center mt-6 max-w-full w-[793px]">
        <ProfilePicture />
        <ProfileInformation />
        <DeleteAccount />
      </div>
    </main>
  );
}

export default ProfilePage;
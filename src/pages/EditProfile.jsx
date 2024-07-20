import React from 'react';
import ProfileHeader from '../components/Dashboard/EditPage/ProfileHeader';
import ProfilePicture from '../components/Dashboard/EditPage/ProfilePicture';
import ProfileInformation from '../components/Dashboard/EditPage/ProfileInformation';
import DeleteAccount from '../components/Dashboard/EditPage/DeleteAccount';

function ProfilePage() {
  return (
    <div className='flex items-center mx-auto'>
      <main className="flex flex-col pb-10 bg-white shadow-custom-shadow px-10 rounded-lg">
      <ProfileHeader />
      <div className="flex flex-col self-center mt-6 max-w-full w-[793px]">
        <ProfilePicture />
        <ProfileInformation />
        <DeleteAccount />
      </div>
    </main>
    </div>
  );
}

export default ProfilePage;
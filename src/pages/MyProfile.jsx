import React from 'react';
import ProfileHeader from '../components/Dashboard/MyProfile/ProfileHeader';
import ProfileCard from '../components/Dashboard/MyProfile/ProfileCard';
import PersonalDetails from '../components/Dashboard/MyProfile/PersonalDetails';

function MyProfile() {
  return (
    <main className="flex flex-col items-center pb-20 bg-white">
      <ProfileHeader />
      <ProfileCard />
      <PersonalDetails />
    </main>
  );
}

export default MyProfile;
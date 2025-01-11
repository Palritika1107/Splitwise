import { React, useState } from 'react';

import CreateGroupButton from '../components/CreateGroupButton';
import GroupCard from '../components/GroupCard';
import HomePageHeader from '../components/HomePageHeader';
import FriendListPopUp from '../components/FriendListPopUp';

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    console.log('closePopup triggered');
    setShowPopup(false);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-black dark:text-white">
      {/* Main Content */}
      <div
        className={`${
          showPopup ? 'blur-sm' : ''
        } transition duration-300 ease-in-out`}
      >
        <HomePageHeader openPopup={openPopup} />
        <GroupCard />
        <CreateGroupButton />
      </div>

      {/* Overlay for Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <FriendListPopUp closePopup={closePopup} />
        </div>
      )}
    </div>
  );
};

export default HomePage;

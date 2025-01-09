import {React , useState} from 'react'



import CreateGroupButton from '../components/CreateGroupButton'

import GroupCard from '../components/GroupCard'
import HomePageHeader from '../components/HomePageHeader'
import FriendListPopUp from '../components/FriendListPopUp'

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
    <>
    <div className="min-h-screen bg-slate-50 dark:bg-black dark:text-white">
    {!showPopup ? (
      <>
        <HomePageHeader openPopup={openPopup} />
        <GroupCard />
        <CreateGroupButton />
      </>
    ) : (
      <FriendListPopUp closePopup={closePopup} />
    )}
    </div>
    
    </>
    
  )
}

export default HomePage
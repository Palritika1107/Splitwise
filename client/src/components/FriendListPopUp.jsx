import React from 'react'
import {useState} from "react"


const FriendListPopUp = ({closePopup}) => {
  
 


  
  const [friend, setFriend] = useState("");
  const [friendsList, setFriendsList] = useState([]);

  

  const handleAddFriend = () => {
    if (friend.trim()) {
      setFriendsList([...friendsList, friend]);
      setFriend("");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
  

       
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full relative">
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-2 right-2 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-4 text-teal-500">Add a Friend</h2>
              <input
                type="text"
                value={friend}
                onChange={(e) => setFriend(e.target.value)}
                placeholder="Enter friend's name"
                className="w-full bg-gray-700 rounded-lg border border-gray-700 text-sm p-3 outline-none focus:ring-2 focus:ring-teal-500 mb-4"
              />
              <button
                onClick={handleAddFriend}
                className="w-full py-3 bg-teal-700 text-white rounded-md text-lg font-medium hover:bg-teal-600 transition"
              >
                Add Friend
              </button>

              {/* Friends List */}
              <ul className="mt-4 space-y-2">
                {friendsList.map((f, index) => (
                  <li
                    key={index}
                    className="bg-gray-700 px-4 py-2 rounded-lg text-gray-300"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        
      </div>
    </div>
 



  )
}

export default FriendListPopUp
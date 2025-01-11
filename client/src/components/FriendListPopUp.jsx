import React from 'react';
import {useState , useEffect} from "react";
import axios from 'axios';

const FriendListPopUp = ({closePopup}) => {
  
const [friendEmail, setFriendEmail] = useState(""); 
const [friendsList, setFriendsList] = useState([]);//want to inistialise friendsList from database on first fetch how to do?

const [userFlag,setUserflag] = useState(true);

useEffect(() => {
  const fetchUserData = async () => {
    try {
      // Fetch the user data (replace with your actual API endpoint)
      const token = localStorage.getItem('token');  // Assuming token is stored in localStorage
      // console.log(token);
      const response = await axios.get('/friends', {
        headers: {
          token: token,  // Sending the token in the header for authentication
        }
      });

      // Assuming the response contains the 'friends' array
      const user = response.data;
      setFriendsList(user.friends); // Initialize friends list state with data from the user
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchUserData();
}, []);


  

  const handleAddFriend = async() => {

    if(friendEmail.trim()) {

      const email = friendEmail.trim();

      const token = localStorage.getItem('token');
      // console.log(`token ${token}`);

      const response = await axios.post("/addfriends", 
        {
          "friendEmail" : email 
        },
        {
        headers: {
            'token': token
        }
      
    })

      if(response.data.user){
        const _id = response.data.friendId;
        const username = response.data.friendUsername;
        console.log("id",_id);
        console.log(username);



        setFriendsList([...friendsList, {
          "_id" : _id,
          "username" : username
        }]); 
        setFriendEmail("");
        setUserflag(true);

      }
      else{
          setUserflag(false);
      }
      
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
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                placeholder="Enter friend's email-id"
                className="w-full bg-gray-700 rounded-lg border border-gray-700 text-sm p-3 outline-none focus:ring-2 focus:ring-teal-500 mb-4"
              />
              {!userFlag && <p className='text-red'>invalid email id! re-enter email-id.</p>}
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
                    {f.username}
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
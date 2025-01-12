import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const GroupForm = () => {
  const [items, setItems] = useState([""]); // Array to hold items , friends added to the group
  const [friendsList, setFriendsList] = useState([]); // Array to hold all friends
  const [groupName, setGroupName] = useState("");

  const navigate = useNavigate();

  // Fetch friend list on component mount
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token
        const response = await axios.get("/friends", {
          headers: { token },
        });
        setFriendsList(response.data.friends); // Update the friend list
      } catch (error) {
        console.error("Error fetching friend list:", error);
      }
    };

    fetchFriends();
  }, []);

  // Add a new friend field
  const addItem = () => {
    if (items.length < friendsList.length) {
      setItems([...items, ""]);
    }
  };

  // Handle dropdown change for individual items
  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };
  
  // Filter friends to exclude already selected ones
  const availableFriends = (index) => {
    return friendsList.filter(
      (friend) => !items.includes(friend._id) || items[index] === friend._id
    );
  };

  // Handle group creation (submit form)
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/create-group",
        { groupName, members: items },
        { headers: { token } }
      );
      console.log("Group created:", response.data);
      navigate('/homepage');
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <>
    <div  className=" bg-gray-900 text-white min-h-screen flex items-center justify-center">

    

    
    <div className=" w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold mb-2 text-center">Create a Group</h1>
    <p className="text-sm text-gray-400 text-center mb-6">Complete the below fields to create your group.</p>
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >

<div className="flex items-center space-x-4">
            <label className="text-sm font-medium mb-1 text-teal-500 w-1/8" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className=" flex-grow bg-gray-700 rounded-lg border border-gray-700 text-sm p-3 outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* <h2 className="text-xl font-bold text-center mb-4">Dynamic Item Form</h2> */}
  
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <label
                  className="text-sm font-medium mb-1 text-teal-500 w-1/8"
                  htmlFor={`friend-${index}`}
                >
                  Friend {index + 1}
                </label>
                <select
                  id={`friend-${index}`}
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  className="flex-grow bg-gray-700 rounded-lg border border-gray-700 text-sm p-3 outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="" disabled>
                    Select Friend
                  </option>
                  {availableFriends(index).map((friend) => (
                    <option key={friend._id} value={friend._id}>
                      {friend.username}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Add Friend Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={addItem}
              className="flex items-center bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
            >
              + Add Friends
            </button>
          </div>

  
         

        <button
        type="submit"
        className="w-full py-3 bg-teal-700 text-white rounded-md text-lg font-medium hover:bg-teal-600"
        >
        Create Group
      </button>

        </form>
      </div>
      </div>
    </>
  )
}

export default GroupForm
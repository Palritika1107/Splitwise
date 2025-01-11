import React from 'react'
import { useState } from 'react';

const GroupForm = () => {
  const [items, setItems] = useState([""]); // Array to hold items

  // Add a new item field
  const addItem = () => {
    let n = items.length;

    if(items[n - 1].length){

    setItems([...items, ""]);
    }
  };

  // Handle input change for individual items
  const handleItemChange = (index, value) => {
    
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
    
  };

  return (
    <>
    <div  className=" bg-gray-900 text-white min-h-screen flex items-center justify-center">

    

    
    <div className=" w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-2 text-center">Create a Group</h1>
    <p class="text-sm text-gray-400 text-center mb-6">Complete the below fields to create your group.</p>
        <form
          className="space-y-6"
        >

<div className="flex items-center space-x-4">
            <label className="text-sm font-medium mb-1 text-teal-500 w-1/8" for="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Group Name"
              className=" flex-grow bg-gray-700 rounded-lg border border-gray-700 text-sm p-3 outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* <h2 className="text-xl font-bold text-center mb-4">Dynamic Item Form</h2> */}
  
          {/* Dynamic Item Fields */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <label
                  className="text-sm font-medium mb-1 text-teal-500 w-1/8"
                  htmlFor={`item-${index}`}
                >
                  Friend {index + 1}
                </label>
                <input
                  type="text"
                  id={`item-${index}`}
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  placeholder="Enter Name"
                  className="flex-grow bg-gray-700 rounded-lg border border-gray-700 text-sm p-3 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            ))}
          </div>
  
          {/* Add Item Button */}
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
        class="w-full py-3 bg-teal-700 text-white rounded-md text-lg font-medium hover:bg-teal-600"
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
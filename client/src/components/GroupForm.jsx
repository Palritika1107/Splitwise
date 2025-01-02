import React from 'react'
import { useState } from 'react';

const GroupForm = () => {
  const [items, setItems] = useState([""]); // Array to hold items

  // Add a new item field
  const addItem = () => {
    setItems([...items, ""]);
  };

  // Handle input change for individual items
  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  return (
    <>
    <div className="min-h-screen bg-black flex items-center justify-center">
        <form
          className="bg-black text-white p-6 rounded-lg w-full max-w-lg space-y-6"
        >
          <h2 className="text-xl font-bold text-center mb-4">Dynamic Item Form</h2>
  
          {/* Dynamic Item Fields */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <label
                  className="text-sm font-medium w-1/4"
                  htmlFor={`item-${index}`}
                >
                  Item {index + 1}
                </label>
                <input
                  type="text"
                  id={`item-${index}`}
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  placeholder="Enter item"
                  className="flex-grow bg-gray-800 rounded-lg border border-gray-700 text-sm p-3 outline-none focus:ring-2 focus:ring-teal-500"
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
              + Add Item
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default GroupForm
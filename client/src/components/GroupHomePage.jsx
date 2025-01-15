import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from 'react-router-dom';

const GroupHomePage = () => {

    const { id } = useParams(); // Extract the group ID from the URL
  const location = useLocation();
  const { groupName, groupId } = location.state;

  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: "", amount: "" });
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");



  

//   let currentUserId = 0;// Replace with logged-in user ID

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchExpenses = async () => {
      try {
        const userRes = await axios.get('/me',{
            headers:{
                'token' : token
            }
        })
        // console.log(`grouphomepage userees : ${userRes}`);

        

        setCurrentUserId(userRes.data.user._id.toString());
        console.log(currentUserId);

        const response = await axios.get(`/get-group/?groupId=${groupId}`);

        setExpenses(response.data.group.expenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [groupId]);

  useEffect(() => {
    if (currentUserId) {
        console.log("Current User ID:", currentUserId);
    }
}, [currentUserId]);

  const handleAddExpense = async () => {
    if (!newExpense.description || !newExpense.amount) return;

    console.log(`newExpense.desc : ${newExpense.description} and newExpense.amount : ${newExpense.amount}`);

    try {
      const response = await axios.post(`/add-expense`, {
        groupId : groupId,
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        payerIdString: currentUserId,
      });

      //after newExpense is added to db,it should be added to expenses state as we are dispalying on UI from this state
      console.log(response.data);
      console.log(response.data.expense);

      setExpenses((prevExpenses) => [...prevExpenses, response.data.expense]);
      
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="p-4 text-teal-600 bg-gray-800 text-lg font-bold">
        Group Expenses
      </header>

      {/* Expenses List */}
      <div className="flex-1 overflow-y-scroll p-4">
        {loading ? (
          <p className="text-center text-gray-400">Loading expenses...</p>
        ) : (
          expenses.map((expense, index) => (
            <div
              key={index}
              className={`flex ${
                expense.payer === currentUserId
                  ? "justify-end"
                  : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-xs p-4 rounded-lg shadow-md ${
                  expense.payer === currentUserId
                    ? "bg-teal-700 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                <p className="text-lg font-bold">₹{(expense.splits.find((obj) =>  obj.member === currentUserId
                )|| { amount: 0 }
                ).amount}</p>
                <p className="text-sm">{expense.description}</p>
                <p className="text-xs mt-2">
                  {expense.payer === currentUserId ? "You" : "Other User"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Expense Button */}
      <div className="fixed bottom-4 right-4">
        {isAddingExpense ? (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <input
              type="text"
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
              placeholder="Description"
              className="w-full bg-gray-700 rounded-lg border border-gray-700 text-sm p-2 mb-2 outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: e.target.value })
              }
              placeholder="Amount"
              className="w-full bg-gray-700 rounded-lg border border-gray-700 text-sm p-2 mb-2 outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsAddingExpense(false)}
                className="py-2 px-4 bg-red-600 text-white rounded-lg text-sm hover:bg-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpense}
                className="py-2 px-4 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-500"
              >
                Add
              </button>
             </div>
        </div>
         ) : (
          <button
            onClick={() => setIsAddingExpense(true)}
            className="bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-500"
          >
            🧾Add expense
          </button>
         )}
      </div>
    </div>
  );
};

export default GroupHomePage;

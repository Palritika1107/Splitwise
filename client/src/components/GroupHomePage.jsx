import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useLocation } from 'react-router-dom';
import usePagination from "../hooks/usePagination.jsx";
import { Link } from "react-router-dom";


  

const GroupHomePage = () => {

    const { id } = useParams(); // Extract the group ID from the URL
  const location = useLocation();
  const { groupName , groupId, nosOfMembers } = location.state;
  const [expenses, setExpenses] = useState([]); // All expenses

//   const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: "", amount: "" });
  const [isAddingExpense, setIsAddingExpense] = useState(false);
//   const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState("");

  



  

//   let currentUserId = 0;// Replace with logged-in user ID

 

useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchCurrentUser = async () => {
      try {
        const userRes = await axios.get('/me',{
            headers:{
                'token' : token
            }
        })
        // console.log(`grouphomepage userees : ${userRes}`);

        

        setCurrentUserId(userRes.data.user._id.toString());
        console.log(currentUserId);
        

        
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } 
    };

    fetchCurrentUser();
  }, []);

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

      setExpenses((prevExpenses) => [...prevExpenses,response.data.expense]);//todo -> tored in revrse 
      setIsAddingExpense(false);
      //oon adding new expense scroll to bottom
      setTimeout(() => {
        window.scrollTo(0, document.documentElement.scrollHeight);
      }, 0);
      
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handlePay = async (expenseId) => {
    // const memberId = localStorage.getItem('token'); // Current user ID

    try{
        console.log(currentUserId);
    const payResponse = await axios.post('/pay-expense', { groupId, 
        expenseId,
        "memberId" : currentUserId });

        console.log(payResponse.data.group.expenses)
        setExpenses(payResponse.data.group.expenses); //WHAT TO DO IN THIS CASE ??????????????????????????????????????????????????????????????

    }catch(err){
        console.log(err);
        console.log(err.status);
        console.log(err.error);
    }

    // try{

    //     const response = await axios.get(`/get-group/${groupId}`);
    // }catch(err){
    //     console.log(err);
    //     console.log(err.error);
    // }
    // // Re-fetch expenses after payment
    // setExpenses(response.data.expenses);
  };  

// ----------------------------pagination logic ----------------------------------------------------------

// Function to fetch paginated data
const fetchData = async (page, pageSize) => {
    console.log('grouphome page fetching data');
    const response = await axios.get(`/group/expenses/?page=${page}&pageSize=${pageSize}&groupId=${groupId}`);
    const data = await response.data;//array of expense objects
    return data.reverse(); // Adjust based on your API's response structure

  };

  console.log('before pagination');

const {loadMore, loading, hasMore, page} = usePagination(fetchData, 4,setExpenses);


  


// Scroll event handler
const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Scroll up: Load next page
    // const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    
    if ((scrollTop <= 10 || scrollTop === 0) && !loading) {
      const previousScrollHeight = document.documentElement.scrollHeight; // Get current scroll height before prepending
      loadMore(page + 1,true,previousScrollHeight); // Load the next page
    }

    // Scroll down: Load previous page
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore && !loading && page>1) {
      
      loadMore(page - 1, false ); // Pass previousScrollHeight for adjustment
    }
  }, [hasMore, loading, page, loadMore]);

  // Attach scroll listener on mount and detach on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    loadMore(1)
    .then(() => {
      // Scroll to bottom after loading the first page
      setTimeout(() => {
        window.scrollTo(0, document.documentElement.scrollHeight);
      }, 0);
    });
  }, []);
  




  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="p-4 text-teal-600 bg-gray-800 text-lg font-bold">
        <Link to={-1}> ⬅️</Link>
        <h4>{groupName}</h4>
        <h2>{nosOfMembers} members</h2>
      </header>

      {/* Expenses List */}
      <div className="flex-1 overflow-y-scroll p-4 min-h-[110vh]">
        {!hasMore && <p>No more items to load</p>}
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
                {(expense.splits.find((obj) =>  obj.member === currentUserId
                )|| { amount: 0 }
                ).paid? '(Paid)' : (
                  <button className={`${
                    expense.payer === currentUserId
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-500"
                      : "bg-teal-700 text-white hover:bg-teal-500"
                  }  p-4 rounded-full shadow-lg`} onClick={() => handlePay(expense._id,currentUserId)}>Pay Now</button>
                )}

              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Expense Button */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 bg-opacity-75 p-4">
      <div className=" bottom-4 right-4">
        
        {isAddingExpense ? (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-4/12">
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
            🧾Split an expense
          </button>
         )}
         </div>
      </div>
    </div>
  );
};

export default GroupHomePage;

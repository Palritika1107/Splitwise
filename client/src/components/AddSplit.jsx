import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSplit = ({ groupId }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await axios.get(`/get-group/${groupId}`);
      setExpenses(response.data.group.expenses);
    };

    fetchExpenses();
  }, [groupId]);

  const handlePay = async (expenseId) => {
    const memberId = localStorage.getItem('userId'); // Current user ID
    await axios.post('/pay-expense', { groupId, expenseId, memberId });
    // Re-fetch expenses after payment
    const response = await axios.get(`/get-group/${groupId}`);
    setExpenses(response.data.expenses);
  };

  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense._id}>
          <h3>{expense.description}</h3>
          <p>Total: ${expense.amount}</p>
          {expense.splits.map((split) => (
            <div key={split.member}>
              <p>
                {split.member} owes ${split.amount}{' '}
                {split.paid ? '(Paid)' : (
                  <button onClick={() => handlePay(expense._id)}>Pay Now</button>
                )}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AddSplit;
import React, { useState } from "react";

const GroupForm = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    name1: "",
    name2: "",
    name3: "",
    amount: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate the amount owed by each member
    const totalAmount = parseFloat(formData.amount);
    const numberOfMembers = 3; // Fixed number of members
    const share = totalAmount / numberOfMembers;

    setResult({
      groupName: formData.groupName,
      members: [
        { name: formData.name1, owes: share },
        { name: formData.name2, owes: share },
        { name: formData.name3, owes: share },
      ],
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Group Name:
            <input
              type="text"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Name 1:
            <input
              type="text"
              name="name1"
              value={formData.name1}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Name 2:
            <input
              type="text"
              name="name2"
              value={formData.name2}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Name 3:
            <input
              type="text"
              name="name3"
              value={formData.name3}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div>
          <h2>Group: {result.groupName}</h2>
          <ul>
            {result.members.map((member, index) => (
              <li key={index}>
                {member.name} owes ${member.owes.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GroupForm;

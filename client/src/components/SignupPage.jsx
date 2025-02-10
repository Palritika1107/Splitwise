import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = ({ setIsSignin, setError }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleDuplicateSignupError = (response) => {
    setIsSignin(true);
    alert(response.data.message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    const { email, username, password } = formValues;

    try {
      const response = await axios.post("/signup", { email, username, password });

      alert(response.data.message);
      navigate("/homepage");
    } catch (err) {
      if (err.response?.data?.isPresent) {
        handleDuplicateSignupError(err.response);
      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4">
      <form
        onSubmit={handleSubmitSignup}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md border border-gray-700"
      >
        <h2 className="text-white text-xl font-bold text-center mb-4">Sign Up</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-3 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-500 transition"
        >
          Sign Up
        </button>

        {/* Error Message */}
        {setError && <p className="text-red-500 text-sm text-center mt-2">{setError}</p>}
      </form>
    </div>
  );
};

export default SignupPage;

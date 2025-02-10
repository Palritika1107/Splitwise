import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SigninPage = ({ setIsSignin, setError, error }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmitSignin = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;

    try {
      const response = await axios.post("/signin", { email, password });

      if (response.data.isPresent) {
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/homepage");
      } else {
        alert(response.data.message);
        setIsSignin(false);
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form
        onSubmit={handleSubmitSignin}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md border border-gray-700"
      >
        <h2 className="text-white text-xl font-bold text-center mb-4">Sign In</h2>

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
          Sign In
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default SigninPage;

import React, { useState } from "react";
import SigninPage from "./SigninPage";
import SignupPage from "./SignupPage";
import axios from "axios";

axios.defaults.baseURL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`;

const Login = () => {
  const [isSignin, setIsSignin] = useState(true);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="flex flex-wrap md:flex-nowrap shadow-lg rounded-3xl overflow-hidden w-full max-w-4xl border border-gray-700">
        {/* Left Section */}
        <div className="w-full md:w-7/12 p-6 flex flex-col justify-center bg-gray-800">
          {/* Logo & Title */}
          <div className="flex items-center justify-center mb-4">
            <img className="w-10 h-10" src="/images/logo.png" alt="logo" />
            <h2 className="text-white font-bold text-xl ml-2">Splitwise</h2>
          </div>

          {/* Sign-in/Sign-up Heading */}
          <h1 className="font-bold text-2xl text-center text-white mb-4">
            {isSignin ? "Sign in" : "Sign up"}
          </h1>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="rounded-full h-10 w-10 flex items-center justify-center border-2 border-gray-700 text-gray-300">
              F
            </div>
            <div className="rounded-full h-10 w-10 flex items-center justify-center border-2 border-gray-700 text-gray-300">
              G+
            </div>
            <div className="rounded-full h-10 w-10 flex items-center justify-center border-2 border-gray-700 text-gray-300">
              in
            </div>
          </div>

          {/* Sign-in/Sign-up Form */}
          {!isSignin ? (
            <SignupPage isSignin={isSignin} setIsSignin={setIsSignin} setError={setError} error={error} />
          ) : (
            <SigninPage isSignin={isSignin} setIsSignin={setIsSignin} setError={setError} error={error} />
          )}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-5/12 bg-teal-600 text-white flex items-center justify-center p-6">
          <p className="text-lg text-center">Less stress when sharing expenses</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

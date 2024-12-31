import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';

// things to fix 1) decrease distance between splitwise logo and text 2)the login box is oveerflowing not responsive 


axios.defaults.baseURL = 'http://localhost:5000';
const Login = () => {

  
    const [formValues, setFormValues] = useState({
      username: '',
      password: '',
    });
    const [error, setError] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(`${name} : ${value}`);
      setFormValues({
        ...formValues,
        [name]: value, // Dynamically update state based on input's name attribute
      });
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault(); // Prevent page reload
      const { username, password} = formValues; // Extract individual variables
      console.log('username:', username);
      console.log('password:', password);

      
      

    try {
      const response = await axios.post("/signup",{

        "username" : username,
        "password" : password 

    });
      console.log(response.data);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.log(error);
    }
      

      
      // You can use these variables as needed
    };

    


    




  return (
    <>
      <div className="text-teal-600 mx-auto w-6/12  flex  max-w-800px  my-auto">
        {/* //left half */}
        <div className="w-8/12  p-9 bg-white flex flex-col justify-around">
        {/* heading 1 */}
          <div className="flex  w-3/12 justify-between mx-auto">
            <img className="w-10 block" src="/images/logo.png" alt="logo" />


            <h2 className="text-black text-center w-4/12 font-bold mt-3 ml-1 ">
              Splitwise
            </h2>
          </div>

          {/* <p>Less stress when sharing expenses with anyone.</p> */}
          {/* heading 2 */}
          <h1 className="font-bold w-3/12 text-2xl text-center  mx-auto p-4">Sign in</h1>

          {/* icons */}
          <div className="text-black font-extrabold flex mx-auto w-5/12 justify-around  p-4">
            <div className="rounded-full h-10 w-10 text-center p-1.5 border-solid border-2 border-gray-300">
              f
            </div>
            <div className="rounded-full h-10 w-10 text-center p-1.5 border-solid border-2 border-gray-300">
              G+
            </div>
            <div className="rounded-full h-10 w-10 text-center p-1.5 border-solid border-2 border-gray-300">
              in
            </div>
          </div>

          {/* form */}

          <div className="flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">

              {/* First Text Field */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm mb-2"
                  htmlFor="field1"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
              
                  placeholder="Enter your username"
                  className="w-full p-2 bg-gray-200 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-400"
                 
                />
              </div>

              {/* Second Text Field */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm mb-2"
                  htmlFor="field2"
                >
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full p-2 bg-gray-200 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-400"
                />
              </div>

              {/* Submit Button */}

              <Link to='/creategroup'>
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300"
                >
                  Sign up
                </button>
              </Link>
            </form>
          </div>
        </div>

        {/* //right half */}
        <div className="w-4/12  bg-teal-400  text-white flex justify-center items-center p-8">
          <p className="text-bold text-2xl">
            {" "}
            Less stress when sharing expenses{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

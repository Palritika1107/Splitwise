import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from "react";

const SignupPage = ({setIsSignin,setError,error}) => {
  // ------------------------------------------------------------------------------------------
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    email: ''
  });
  
 
const handleDublicateSignupError = (response) => {

  setIsSignin(true);
  alert(response.data.message);

}


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name} : ${value}`);


    setFormValues({
      ...formValues,
      [name]: value, // Dynamically update state based on input's name attribute
    });
  };
  // ---------------------------------------------------------------------------------------

    const navigate = useNavigate();

    const handleSubmitSignup =async (e) => {
        // console.log("onsumbit called");
        e.preventDefault(); // Prevent page reload
        console.log(`singup ${formValues.username} ${formValues.email}`);
  
  
        const { email ,username, password } = formValues; // Extract individual variables
        // console.log('username:', username);
        // console.log('password:', password);
  
        
        
  
      try {
        const response = await axios.post("/signup",{
          "email" : email,
          "username" : username,
          "password" : password 
  
      });
  
        console.log(`response-data ${response.data.status}`);
  
       
        alert(response.data.message);
        navigate('/homepage');
        
  
      } catch (err) { 


        console.log(`catch block reached`);
        if(err.response.data.isPresent)
        {
          handleDublicateSignupError(err.response);
        }
        else{

          console.log("uneexpected error");
        }

      }
        
  
        
        // You can use these variables as needed
      };
  
      
  





  return (
    <>

    {/* form */}

    <div className="flex justify-center items-center p-4">
            <form onSubmit={handleSubmitSignup} className="bg-white p-6 rounded shadow-md w-80">

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
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
              
                  placeholder="Enter your email-id"
                  className="w-full p-2 bg-gray-200 text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-400"
                 
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm mb-2"
                  htmlFor="field2"
                >
                  Username
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
                  htmlFor="field3"
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

              {/* <Link to='/creategroup'> */}
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300"
                >
                  Sign up
                </button>
             {/* </Link> */}
            </form>
          </div>


    </>
  )
}

export default SignupPage
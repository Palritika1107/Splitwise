import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from "react";

const SigninPage = ({setIsSignin,setError,error}) => {
  // ------------------------------------------------------------------------------------

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  
  



  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name} : ${value}`);


    setFormValues({
      ...formValues,
      [name]: value, // Dynamically update state based on input's name attribute
    });
  };



  // -----------------------------------------------------------------------------------

    const navigate = useNavigate();

    const handleSubmitSignin = async (e) => {
        // console.log("onsumbit called");
        e.preventDefault(); // Prevent page reload
        console.log(`singup ${formValues.username} ${formValues.email}`);
  
  
        const { email , password } = formValues; // Extract individual variables
        // console.log('username:', username);
        // console.log('password:', password);
  
        
        
  
      try {
        const response = await axios.post("/signin",{
  
          "email" : email,
          "password" : password 
  
      });
  
        console.log(response.status);
  
        if(response.data.isPresent){ //response.data because axios sends response inside an object named data and not the object directly
          // setIsSignup((isSignup) => !isSignup);
          
          alert(response.data.message);

          localStorage.setItem("token",response.data.token);

          navigate('/homepage');
        
        }
        else{
          alert(response.data.message);
          setIsSignin(false);
        }
  
      } catch (err) {
        setError('Login failed. Please check your credentials.');
        console.log(error);
      }
        
  
        
        // You can use these variables as needed
      };
  




    return(
    <>
             {/* form */}

      <div className="flex justify-center items-center p-4">
            <form onSubmit={handleSubmitSignin} className="bg-white p-6 rounded shadow-md w-80">

              {/* First Text Field */}
              <div className="mb-4">
                <label
                  className="block text-gray-600 text-sm mb-2"
                  htmlFor="field1"
                >
                  Email-id
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

              {/* <Link to='/creategroup'> */}
                <button
                  type="submit"
                  className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300"
                >
                  Sign in
                </button>
             {/* </Link> */}
            </form>
          </div>
    </>
  
  )
}

export default SigninPage
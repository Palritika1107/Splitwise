import React, { useEffect , useState } from "react";
import { Link } from 'react-router-dom';



import SigninPage from "./SigninPage";
import SignupPage from "./SignupPage";

import axios from 'axios';

// things to fix 1) decrease distance between splitwise logo and text 2)the login box is oveerflowing not responsive 


axios.defaults.baseURL = 'http://localhost:5000';
const Login = () => {

  const [isSignup,setIsSignup] = useState(true);
  const [error, setError] = useState('');
  
    

    




  return (
    <>
    {/* <div className=" bg-gray-900 text-white min-h-screen flex items-center justify-center"> '
    */}
      <div className="text-teal-600 mx-auto w-6/12  flex  max-w-800px  my-auto ">
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
          <h1 className="font-bold w-3/12 text-2xl text-center  mx-auto p-4">{isSignup ? "Sign up" : "Sign in"}</h1>

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


          {/* signin or signup form */}


          {isSignup && <SignupPage  isSignup={isSignup} setIsSignup={setIsSignup} setError={setError} error={error}/>}
          {!isSignup && <SigninPage  isSignup={isSignup} setIsSignup={setIsSignup} setError={setError} error={error}/>}



          
        </div>
        

        {/* //right half */}
        {/* this part if going out of parent box fix it  */}

        <div className="w-4/12  bg-teal-400  text-white flex justify-center items-center p-8 ">
          <p className="text-bold text-2xl inline-block">
            {/* {" "} */}
            Less stress when sharing expenses
          </p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Login;

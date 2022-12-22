import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import './../index.css'
import './login.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from "react-router-dom";
import RubberBand   from 'react-reveal/RubberBand';

const token = JSON.parse(localStorage.getItem("authToken"))

const LoginPage = () => {
  AOS.init();

    let {loginUser,authTokens}= useContext(AuthContext)
    const  navigate = useNavigate();
  return (
<>
    
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <RubberBand  >

        <img className="mx-auto h-12 w-auto" src="https://cdn1.iconfinder.com/data/icons/bokbokstars-121-classic-stock-icons-1/512/Network.png" alt="logo" />
        </RubberBand  >

        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">LogIn</h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Don't have an account ?
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={()=> navigate('/signup') }>Sign in</a>
        </p>
      </div>
    
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="mb-0 space-y-6" action="#" method="POST" onSubmit={loginUser}>
            <div>
              <label for="text" className="block text-sm font-medium text-gray-700">username/company name</label>
              <div className="mt-1">
                <input id="text" name="username" type="text" autocomplete="text" required className="" />
              </div>
            </div>
    
            <div>
              <label for="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input  name="password" type="password" autocomplete="current-password" required className="" />
              </div>
            </div>
    
            {/* <div>
              <label for="company-size" className="block text-sm font-medium text-gray-700">Company size</label>
              <div className="mt-1">
                <select name="company-size" id="company-size" className="">
                  <option value="">Please select</option>
                  <option value="small">1 to 10 employees</option>
                  <option value="medium">11 to 50 employees</option>
                  <option value="large">50+ employees</option>
                </select>
              </div>
            </div> */}
    
            <div className="flex items-center">
              {/* <input id="terms-and-privacy" name="terms-and-privacy" type="checkbox" className="" /> */}
              <label for="terms-and-privacy" className="text-blue-500 hover:text-blue-700  cursor-pointer "
                >forgot password
                {/* <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms</a>
                and
                <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>. */}
              </label>
            </div> 
    
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">log IN</button>
            
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default LoginPage

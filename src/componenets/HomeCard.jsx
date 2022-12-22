import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PopUP from '../componenets/PopUP'
import { useEffect } from "react";
import axios from "axios";
import {
  FaCalendarAlt,
  FaDribbble,
  FaEnvelopeOpenText,
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaTwitter,
} from "react-icons/fa";
// import img from "../assets/images/about/avatar.jpg";
// import downloadIcon from "../assets/images/download.png";

const HomeCard = (props) => {
  let { user, logoutUser, authTokens } = useContext(AuthContext)

  const navigate = useNavigate();
  const [userData,setUserData]= useState({
        
    image: "",
    objective: "",
    skill: " ",
    skil2: " ",
    skil3: " ",
    user: user.user_id,
})

function automatic(){
  props.getData(userData.objective)
}
  const token = JSON.parse(localStorage.getItem("authToken"))

  const getUserprofile = () => {
    axios.get("http://127.0.0.1:8000/accounts/userprofile",
        {
            headers: {
                Authorization: `Bearer ${token.access}`,
                "content-type": "application/json"
            }

        }
    ).then((response) => {
        console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd", response);
        setUserData({ ...response.data })
        { console.log(response.data); }
    })
}

useEffect(() => {
    getUserprofile()
    // automatic()
}, []);




  return (
    <div>
      <div className="w-full mb-6 lg:mb-0  mx-auto  mt-50px	 relative bg-white text-center dark:bg-[#111111] px-6 rounded-[20px] mt-[180px] md:mt-[220px] lg:mt-0 ">
        <img
          src={userData.image }
          className="w-[240px] absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto  rounded-[20px] -mt-[140px]"
          alt=""
        />
        {/* Social card */}
        <div className="pt-[100px] pb-8">
          <h1 className="mt-6 mb-1 text-5xl font-semibold  dark:text-white">
            {userData?.user?.first_name +" "+userData?.user?.last_name}
          </h1>
          <h3 className="mb-4 text-[#7B7B7B] inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg dark:text-[#A6A6A6]  ">
          username : <span className=" font-serif font-semibold text-black " > {userData?.user?.username}</span>
         
          </h3>

          {/* Social Links */}

          <div className="flex justify-center space-x-3">
            {/* facebook link add here */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="socialbtn text-[#1773EA]">
                <FaFacebookF />
              </span>
            </a>
            {/* twitter link add here */}
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="socialbtn text-[#1C9CEA]">
                <FaTwitter />
              </span>
            </a>
            {/* drop link add here */}
            <a
              href="https://dribbble.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="socialbtn text-[#e14a84] ">
                <FaDribbble />
              </span>
            </a>
            {/* linkedin link add here */}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="socialbtn text-[#0072b1]">
                <FaLinkedinIn />
              </span>
            </a>
          </div>

          {/* personal information */}
          <div className="p-7 rounded-2xl mt-7  bg-[#F3F6F6] dark:bg-[#1D1D1D]">
            <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] pb-2.5">
              <span className="socialbtn dark:bg-black text-[#E93B81] ">
                <FaMobileAlt />
              </span>
              <div className="text-left ml-2.5">
                <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                  Phone
                </p>
                <p className="dark:text-white">{userData?.user?.phone_number}</p>
              </div>
            </div>
            <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
              <span className="socialbtn  dark:bg-black text-[#6AB5B9] ">
                <FaEnvelopeOpenText />
              </span>
              <div className="text-left ml-2.5">
                <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                  Email
                </p>
                <p className="dark:text-white">{userData?.user?.email}</p>
              </div>
            </div>
            {/* <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
              <span className="socialbtn dark:bg-black text-[#FD7590]">
                <FaMapMarkerAlt />
              </span>
              <div className="text-left ml-2.5">
                <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                  Location
                </p>
                <p className="dark:text-white">HCMC, kochi</p>
              </div>
            </div> */}
            <div className="flex  py-2.5">
              <span className="socialbtn  dark:bg-black text-[#C17CEB] ">
                <FaCalendarAlt />
              </span>
              <div className="text-left ml-2.5">
                <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                  Skills
                </p>
                <p className="dark:text-white">{userData?.skill}</p>
                <p className="dark:text-white">{userData?.skil2}</p>

                <p className="dark:text-white">{userData?.skil3}</p>

              </div>
            </div>
          </div>
          <button className="flex items-center mx-auto bg-gradient-to-r  duration-200 transition ease-linear hover:bg-gradient-to-l from-[#1773EA]  to-[#1773EA] px-8 py-3 text-lg text-white rounded-[35px] mt-6" >
            Download CV
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;



import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PopUP from '../componenets/PopUP'
import { useEffect } from "react";
import axios from "axios";
import HomeCard from "./HomeCard";
import AboutCard from "./card";
import moment from "moment"; 


import {
  FaEnvelopeOpenText,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// import aboutImage from "../../assets/images/about/about.jpg";
import "../style/style.css";
// import SliderCommon from "../../Share/SliderCommon";
// import AboutCard from "./AboutCard";



const style = {
    position: '',
    top: '10%',
    left: '30%',
    right: '30%',
    bottom: '30%',
    transform: 'transilate(-50%,-50%)',
    backgroundColor: '#ededed',
    padding: '30px',
    zIndex: 1000,
    height: "fit-content"

}

const overLay = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(2,0,0,.5)',
    zIndex: 1000,
    

}

const Alldataprofile = ({ children, open, onclose, edit, id }) => {
    const [object, setObject] = useState("")
    const [data, setData] = useState([])
    const[userdata,setUserdata] =useState([])
    const[profile,setProfile] =useState([])
    const[experience,setExperience] =useState([])
    const[education,setEducation] =useState([])

    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem("authToken"))
    
    
    console.log("999999999999999999999999999999999999999999", id);
    const getdata = () => {
      console.log("bbbbbbbbbbbbbbbbbbbbbb",id)
        axios.get(`http://127.0.0.1:8000/recruiter/cvdata/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
              "content-type": "application/json"
            } 
      
          }
        ).then((response) => {
          console.log("77777777777777777777777", response);
          const {data}=response
          const {userprofile}= data
          const {profile}= data
          const {experience}= data
          const {education}= data


          setData(data)
      console.log("3333333333333333333333333333333",data);
        })
      }

  const findProfile = (userid,username) => {
        console.log("here is the id", userid);
        
        // navigate("/user/friend-profile/" + userid);
        navigate("/chatPage/"+userid+'/'+username)
      };
useEffect(()=>{
  getdata()
},[id]);



      if (open) {
        return (
    <>
      

      <section>
      <div className="flex flex-col">
                    <div style={overLay} className='overflow-y-scroll hide-scrollbar'>

        <div className="container w-full lg:rounded-2xl bg-white dark:bg-[#111111] mx-auto px-4 sm:px-5 md:px-10 lg:px-20">
                        <button className='cursor-pointer absolute text-lg  rounded top-[5px] right-[50px] style={style}' onClick={onclose}>X</button>
          <div >
            <div className="py-12">
              {/* Page Title */}
              <div className="flex"> 

              <h2 className="after-effect after:left-52 mt-12 font-medium lg:mt-0 ">
                About Me
              </h2>
              <button
               className="bg-blue-500 p-2 text-white rounded-md ml-auto"
                onClick={()=>findProfile(data?.id,data?.username)}
                >
                Message
              </button>
              </div>

              <div className="grid grid-cols-12 md:gap-10 pt-4 md:pt-[40px] items-center">
                <div className="col-span-12 md:col-span-4">
                  {/* personal images for about page  */}
                  <img
                    className="w-full md:w-[330px] md:h-[400px] object-cover overflow-hidden rounded-[35px] mb-3 md:mb-0"
                    src={data?.userprofile?.image }
                    alt="appliacnt image"
                  />
                </div>
                <div className="col-span-12 md:col-span-8 space-y-2.5">
                  {/* About me information */}
                  <div className=" md:mr-12 xl:mr-16">
                    <h3 className="text-4xl font-medium dark:text-white mb-2.5 ">
                      Who am i?
                    </h3>
                    <p className="text-gray-lite  dark:text-color-910 leading-7">
                    {data?.userprofile?.objective}
                    
                    </p>
                    {/* <p className="text-gray-lite leading-7 mt-2.5 dark:text-color-910">
                      My aim is to help every part of the business run smoothly and provide leadership and vision, motivation, removing roadblocks, coaching, and inspiring the team to do their best work.
                    </p> */}
                  </div>

                  {/* personal information */}
                  <div>
                    <h3 className="text-4xl font-medium my-5 dark:text-white">
                      Personal Info
                    </h3>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex">
                        <span className="text-oriange dark:bg-color-990 shadow-icon mr-2.5 flex items-center justify-center rounded-md text-2xl w-12 text-">
                          <FaMobileAlt />
                        </span>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-lite dark:text-color-910">
                            Phone
                          </p>
                          <h6 className="font-medium dark:text-white">
                          {data?.phone_number}

                          </h6>
                        </div>
                      </div>
                      {/* <div className="flex">
                        <span className="text-oriange-lite dark:bg-color-990 shadow-icon mr-2.5 flex items-center justify-center rounded-md text-2xl w-12 text-">
                          <FaMapMarkerAlt />
                        </span>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-lite dark:text-color-910">
                            Location
                          </p>
                          <h6 className="font-medium dark:text-white">
                            HCMC, Vietnam
                          </h6>
                        </div>
                      </div> */}
                      <div className="flex">
                        <span className="text-green dark:bg-color-990 shadow-icon mr-2.5 flex items-center justify-center rounded-md text-2xl w-12 text-">
                          <FaEnvelopeOpenText />
                        </span>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-lite dark:text-color-910">
                            Email
                          </p>
                          <h6 className="font-medium dark:text-white">
                            {data?.email}
                          </h6>
                        </div>
                      </div>
                      <div className="flex">
                        <span className="text-color-50 dark:bg-color-990 shadow-icon mr-2.5 flex items-center justify-center rounded-md text-2xl w-12 text-">
                          <FaRegCalendarAlt />
                        </span>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-lite dark:text-color-910">
                            Skill
                          </p>
                          <h6 className="font-medium dark:text-white">
                           {data?.userprofile?.skill},
                           {data?.userprofile?.skil2},
                           {data?.userprofile?.skil3}


                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End personal information */}
                </div>
              </div>
            </div>

            <div className="  pb-12 ">
              <h3 className="text-[35px] dark:text-white font-medium pb-5">
                What I do!
              </h3>
              {/* <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 "> */}
                {/* Experience information  */}

                {/* {experienceArray.map((item, i) => (
                  <AboutCard key={i} item={item} local={local} />
                ))}
              </div>
            </div> */}

            {/* <div> */}
              {/* Slick Slider call here  */}
              {/* <SliderCommon /> */}

              <div className="  pb-12 px-2 sm:px-5 md:px-10 lg:px-14 ">
            <h3 className="text-[35px] dark:text-white font-medium pb-{">
              My Education
            </h3>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 ">
              {/* Experience information  */}

              {data?.usereducation?.map((item, id) => {
                return (
                  <div >

                    {/* <img className="w-10 h-10 object-contain  block" src={item.icon} alt="" /> */}

                    <div className="p-7 rounded-2xl mt-7 bg-blue-85  dark:bg-[#325252] ">
                      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] pb-2.5">

                        <div className="text-left ml-2.5">
                          <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                            institution
                          </p>
                          <p className="dark:text-white">{item?.institution}</p>
                        </div>
                      </div>
                      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">

                        <div className="text-left ml-2.5">
                          <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                            type
                          </p>
                          <p className="dark:text-white">{item?.type}</p>
                        </div>
                      </div>
                      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">

                        <div className="text-left ml-2.5">
                          <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                            join date
                          </p>
                          <p className="dark:text-white">{moment(item?.join_date).format("MMM Do YY") } </p>
                        </div>
                      </div>
                      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">

                        <div className="text-left ml-2.5">
                          <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                            Leave_date
                          </p>
                          <p className="dark:text-white">{moment(item?.Leave_date).format("MMM Do YY")} </p>
                        </div>
                      </div>

                      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">

                        <div className="text-left ml-2.5">
                          <p className="text-xs bg-blue-50 dark:text-[#A6A6A6]">
                            Objective
                          </p>
                          <p className="dark:text-white overflow-auto">{item?.aim}</p>
                        </div>
                      </div>


                    </div>
                  </div>

                );
              })}



            </div>
          </div>
            </div>
      </div>
        </div>
          </div>
        </div>
      </section>
    </>
         )
        } else {
            return (null)
        }
    
    }
export default Alldataprofile;

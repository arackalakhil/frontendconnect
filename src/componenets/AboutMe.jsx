
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
import AOS from 'aos';
import 'aos/dist/aos.css';
import moment from "moment"; 

const AboutMe = () => {
AOS.init();

  const [educationData, setEducationData] = useState([])
  const [object, setObject] = useState("")
  const [experience, setExperience] = useState([])
  const token = JSON.parse(localStorage.getItem("authToken"))

  const getEducation = () => {
    axios.get("http://127.0.0.1:8000/accounts/education",
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
          "content-type": "application/json"
        }

      }
    ).then((response) => {
      console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd", response);
      const { data } = response
      setEducationData(data)
      console.log("fffffffffffffffffffffffffffffffffffffffffff", data);
    })
  }

  const getExperience = () => {
    axios.get("http://127.0.0.1:8000/accounts/experience",
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
          "content-type": "application/json"
        }

      }
    ).then((response) => {
      console.log("111111111111111111111111111111111111111111111111111111111111111", response);
      setExperience(response.data)

    })

  }


  useEffect(() => {
    getEducation()
    getExperience()

  }, []);

  function GetObject(obj) {
    setObject(obj)
  }

  console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL", object);



  return (
    <section>
      {/* <PageTitle title="About"></PageTitle> */}
      {/* End pagetitle */}

      <div className=" lg:rounded-2xl bg-white dark:bg-[#111111]">
        <div  >
          <div className=" pt-12 md:py-12 px-2 sm:px-5 md:px-10 lg:px-14 ">
            {/* About page title */}
            <h2 className="after-effect after:left-52">About Me</h2>
            <div className="lg:hidden">
              {/* Sidebar personal information for mobile devices */}
              <HomeCard getData={GetObject} />
            </div>
            <div className="lg:grid grid-cols-12 md:gap-10 pt-4 md:pt-[30px] items-center hidden ">
              <div className="col-span-12 space-y-2.5">
                <div className="lg:mr-16">
                  <p className="text-gray-lite  dark:text-color-910 leading-7">
                    I'm a super energetic and highly motivated Project Manager who have always been striving for excellent performance and exceptional standards, developing his teams with Agile mindset and driving towards a culture of excellence.
                  </p>
                  <p className="text-gray-lite leading-7 mt-2.5 dark:text-color-910">
                    My aim is to help every part of the business run smoothly and provide leadership and vision, motivation, removing roadblocks, coaching, and inspiring the team to do their best work.
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          {/* End about descriptions */}

          <div className="  pb-12 px-2 sm:px-5 md:px-10 lg:px-14 ">
            <h3 className="text-[35px] dark:text-white font-medium pb-5">
              My Experience
            </h3>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 ">
              {/* Experience information  */}

              {experience?.map((item, id) => {
                return (
                  <div >

                    {/* <img className="w-10 h-10 object-contain  block" src={item.icon} alt="" /> */}

                    <div className="p-7 rounded-2xl mt-7 h-96  bg-blue-100  dark:bg-[#325252] " data-aos="fade-up"  data-aos-anchor-placement="bottom-bottom">
                      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] pb-2.5">

                        <div className="text-left ml-2.5">
                          <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                            Comany
                          </p>
                          <p className="dark:text-white">{item?.company}</p>
                        </div>
                      </div>
                      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">

                        <div className="text-left ml-2.5">
                          <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                            Job Post
                          </p>
                          <p className="dark:text-white">{item?.Post}</p>
                        </div>
                      </div>
                      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">

                        <div className="text-left ml-2.5">
                          <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                            Joining date
                          </p>
                          <p className="dark:text-white">{ moment(item?.join_date).format("MMM Do YY")}  </p>
                        </div>
                      </div>
                      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">

                        <div className="text-left ml-2.5">
                          <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                          Leave date
                          </p>
                          <p className="dark:text-white">{ moment(item?.Leave_date).format("MMM Do YY")} </p>
                        </div>
                      </div>
                      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">

                        <div className="text-left ml-2.5">
                          <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                            Moto
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
          {/* /////////////////////education//////////////////// */}
          <div className="  pb-12 px-2 sm:px-5 md:px-10 lg:px-14 ">
            <h3 className="text-[35px] dark:text-white font-medium pb-5">
              My Education
            </h3>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 ">
              {/* Experience information  */}

              {educationData?.map((item, id) => {
                return (
                  <div >

                    {/* <img className="w-10 h-10 object-contain  block" src={item.icon} alt="" /> */}

                    <div className="p-7 rounded-2xl mt-7 bg-blue-100  dark:bg-[#325252] " data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
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
                          <p className="dark:text-white">{ moment(item?.join_date).format("MMM Do YY")}</p>
                        </div>
                      </div>
                      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">

                        <div className="text-left ml-2.5">
                          <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
                            Leave_date
                          </p>
                          <p className="dark:text-white"> { moment(item?.Leave_date).format("MMM Do YY")}</p>
                        </div>
                      </div>

                      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">

                        <div className="text-left ml-2.5">
                          <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
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
          {/* service provide end */}

          <div className="px-2 sm:px-5 md:px-10 lg:px-14 ">
            {/* Slick Slider call here  */}
            {/* <SliderCommon /> */}
          </div>

          {/* Common Footer call here */}
          {/* <Footer bg={"#FFFF"} /> */}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

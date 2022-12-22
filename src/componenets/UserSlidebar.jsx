import React, { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import { HiAcademicCap } from "react-icons/hi2";
import { ImHome } from "react-icons/im";
import AuthContext from '../context/AuthContext'
import { FaBattleNet } from "react-icons/fa";
import { MdLogout,MdManageAccounts, } from "react-icons/md";
import { RiGovernmentLine } from "react-icons/ri";
import userEvent from '@testing-library/user-event';


function UserSidebar() {
  let { user, AdminLogOut } = useContext(AuthContext)

  const [sideBar, setSideBar] = useState(true)
  const navigate = useNavigate()

  const menu = [
 

    {
      menuTitle: "Experience",
      path: "/settings/experience",
      logo: " "
    },
    {
      menuTitle: "Education",
      path: "/settings/education",
      logo: ""
    },
    {
      menuTitle: "UserProfile",
      path: "/settings/userprofile",
      logo: ""
    },
    {
      menuTitle: "MyProjects",
      path: "/settings/myProjects",
      logo: ""
    },
    user?.is_recruiter ? 
   {
    menuTitle: "comapny profile",
    path: "/settings/comapnyprofile",
    logo: ""
   }
    :{
      menuTitle: "Jobs applied",
      path: "/settings/profileData",
      logo: ""
    }
    
  ]
  

  return (
    <div className={`${sideBar ? "w-62" : "w-20"} h-screen  relative `}>
      <div className={` ${sideBar ? "w-[15rem]" : "w-20"}  p-5 pt-8 bg-blue-500 shadow-custom`}>
        {/* < img src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/control.png" alt="control"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-blue-900
    border-2 rounded-full  ${!sideBar && "rotate-180"}`} */}
    <ImHome  className={`absolute cursor-pointer -right-3 top-9 w-7 border-blue-900
    border-2 rounded-full  ${!sideBar && "rotate-180"}`} 

          onClick={() => setSideBar(!sideBar)} />
        <div className="flex gap-x-4 items-center">
          {/* <img src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/logo.png" alt="logo"
            className={`cursor-pointer duration-500 ${sideBar && "rotate-[360deg]"
              }`} /> */}
              < MdManageAccounts className={`cursor-pointer duration-500 w-6 h-6 ${sideBar && "rotate-[360deg]" }`} />

         <h1MdOfflineBolt
            className={`text-white origin-left font-medium text-xl duration-200 ${!sideBar && "scale-0"
              }`}>User</h1MdOfflineBolt>

        </div>
        <ul className="pt-6">
    
          {menu.map((menuNames, index) => {
            return (



              <li  onClick={()=>{
                navigate(menuNames?.path)}}
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-500 text-white text-sm items-center gap-x-4  mt-5
              ${menuNames?.logo ? "mt-9" : "mt-2"} ${index === { index } && "bg-blue-500"
                  } `}
              >
                {/* <img src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/User.png" alt="menu" /> */}
                <FaBattleNet/>
                <span className={`${!sideBar && "hidden"} origin-left duration-200`}>
                  {menuNames?.menuTitle} 
                </span>
               
              </li>

            )})}
         
          <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-500 text-white text-sm items-center gap-x-4 
                "bg-blue-500"  mt-5
               `} >
                <MdLogout/>
            {/* <img onClick={AdminLogOut} src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/User.png" alt="menu" /> */}
            <span  onClick={AdminLogOut} className={`${!sideBar && "hidden"} origin-left duration-200`}>
              Logout
            </span>

          </li>
        </ul>
      </div>
    </div>
  );
}
export default UserSidebar;
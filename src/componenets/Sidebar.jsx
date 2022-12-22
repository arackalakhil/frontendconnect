import React, { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiAcademicCap } from "react-icons/hi2";
import AuthContext from '../context/AuthContext'
const menu = [
  {
    menuTitle: "User data",
    path: "/adminHome/userdata",
    logo: "🌏"
  },

  {
    menuTitle: "Compnayt Data",
    path: "/adminHome/dashboard",
    logo: " "
  },
  {
    menuTitle: "Reported account",
    path: "/adminHome/products",
    logo: ""
  },
  {
    menuTitle: "Reported compnay",
    path: "/adminHome/userdata",
    logo: ""
  },
  {
    menuTitle: "Reported Post",
    path: "/adminHome/booking",
    logo: ""
  },

]


function Sidebar() {
  let { AdminLogOut } = useContext(AuthContext)

  const [sideBar, setSideBar] = useState(true)
  const navigate = useNavigate()


  return (
    <div className={`${sideBar ? "w-72" : "w-20"} h-screen p-5 pt-8  relative `}>
      <div className={`fixed left-0 top-0 ${sideBar ? "w-[15rem]" : "w-20"} h-screen p-5 pt-8 bg-blue-900 `}>
        < img src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/control.png" alt="control"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-blue-900
    border-2 rounded-full  ${!sideBar && "rotate-180"}`}
          onClick={() => setSideBar(!sideBar)} />
        <div className="flex gap-x-4 items-center">
          <img src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/logo.png" alt="logo"
            className={`cursor-pointer duration-500 ${sideBar && "rotate-[360deg]"
              }`} />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!sideBar && "scale-0"
              }`}>Admin</h1>

        </div>
        <ul className="pt-6">
          {menu.map((menuNames, index) => {
            return (



              <li  onClick={()=>{
                navigate(menuNames.path)}}
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-500 text-white text-sm items-center gap-x-4 
              ${menuNames.logo ? "mt-9" : "mt-2"} ${index === { index } && "bg-blue-500"
                  } `}
              >
                <img src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/User.png" alt="menu" />
                <span className={`${!sideBar && "hidden"} origin-left duration-200`}>
                  {menuNames.menuTitle} 
                </span>
               
              </li>

            )})}
          <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-500 text-white text-sm items-center gap-x-4 
                "bg-blue-500"
               `} >
            <img onClick={AdminLogOut} src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/User.png" alt="menu" />
            <span  onClick={AdminLogOut} className={`${!sideBar && "hidden"} origin-left duration-200`}>
              Logout
            </span>

          </li>
        </ul>
      </div>
    </div>
  );
}
export default Sidebar;
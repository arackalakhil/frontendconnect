import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../componenets/Sidebar'
import { Outlet, useNavigate } from "react-router-dom"
import AuthContext from '../context/AuthContext'



const AdminHome = () => {
  const nav = useNavigate()
  let { loginUser, authTokens } = useContext(AuthContext)
  useEffect(() => {
    if (authTokens == null) {
      console.log(authTokens);
      nav("/adminLogin")
    }
  }, [authTokens]);
    useEffect(() => {
  nav('/adminHome/userdata')
    }, [])

  return (
    <div className='flex overflow-hidden'>
      <div>
        < Sidebar />
      </div>
      <div className='w-full'>
        <Outlet />
      </div>
    </div>
  )
}
export default AdminHome

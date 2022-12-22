import React, { useContext, useEffect, useState } from 'react'
import UserSidebar from '../componenets/UserSlidebar'
import { Outlet, useNavigate } from "react-router-dom"
import AuthContext from '../context/AuthContext'
import Header from './Header'
export const Settings = () => {
    // e.preventDefault()
    const nav = useNavigate()
    let { loginUser, authTokens } = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    let {user,logoutUser}=useContext(AuthContext)

    // useEffect(() => {
    //     nav('/settings/experience')
    //       }, [])
    return (
        <> 
            <Header />
            <div className='flex overflow-hidden mt-[60px] '>
                <div>
                    < UserSidebar />
                </div>
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default Settings;


import React from 'react'
import {IoHeartOutline,IoChatbubbleOutline,IoShareOutline} from "react-icons/io5";
function UserPanel() {
    return (
        <div className='bg-white p-5 rounded-lg shadow-light  mt-7 shadow-lg '>
            <div className='flex my-3 items-center '>
                <div>
                    <div className='rounded-full h-[50px] w-[50px] overflow-hidden'>
                        <img src="../images/signUp.jpg" className='objuct-cover w-full h-full ' alt="" />
                    </div>
                </div>
                <div className='ml-2'>
                    <h2 className='text-[16px] font-bold'>Akhil</h2>
                    <p className='text-[12px] text-gray-500'>July 26 2018 1:30pm</p>
                </div>
            </div>

            <p className='text-gray-600 text-sm'>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
            
            <div className=' mt-4 '>
                <img src="../images/post.jpg" className='object-cover w-full h-[500px] rounded-lg' alt="" />
            </div>
{/* 
            <div className='flex justify-center mt-3 '>
                <div className='px-4  '><span className='text-[22px]    '><IoHeartOutline/></span> <span className='text-[10px]'>200</span></div>
                <div className='px-4 '><span className='text-[20px]'><IoChatbubbleOutline/></span> <span className='text-[10px]'>200</span></div>
                <div className='px-4 '><span className='text-[20px]'><IoShareOutline/></span> <span className='text-[10px]'>200</span></div>
            </div> */}
        </div>
    )
}

export default UserPanel 

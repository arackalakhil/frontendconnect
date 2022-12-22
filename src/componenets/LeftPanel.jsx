import React from 'react'

function LeftPanel() {
    return (
        <div className='fixed mt-7 w-[20%]'>
        <div className='bg-white p-3 rounded-lg shadow-light shadow-lg '>

        <div className='flex my-3'>
                <div>
                    <div className='rounded-full h-[50px] w-[50px] overflow-hidden'>
                    <img src="../images/signUp.jpg" className='objuct-cover w-full h-full ' alt="" />
                    </div>
                </div>
                <div className='ml-2'>
                    <h2 className='text-[16px] font-semibold'>Akhil Mohan</h2>
                    <p className='text-[12px] text-gray-500'>Inter at brototype</p>
                </div>
            </div>

            <h1 className='font-semibold text-gray-600'>Jobs For You</h1>
            <div className='flex my-3 justify-between items-center'>
                <div className='flex '>
                    <div className='rounded-full overflow-hidden relative w-[30px] h-[30px]'>
                        <img src="../images/signUp.jpg" className='objuct-cover w-full h-full ' alt="" />
                    </div>
                
                <div className='ml-2'>
                    <h2 className='text-[14px] font-semibold'>DJANGO</h2>
                    <p className='text-[10px] text-gray-500'>Company name</p>
                </div>
                </div>
                <div className='ml-2'>
                    <h2 className='text-[14px] font-semibold  text-blue-600 float-right cursor-pointer'>Follow</h2>
                </div>
            </div>

            <div className='flex my-3 justify-between items-center'>
                <div className='flex '>
                    <div className='rounded-full overflow-hidden relative w-[30px] h-[30px]'>
                        <img src="../images/signUp.jpg" className='objuct-cover w-full h-full ' alt="" />
                    </div>
                
                <div className='ml-2'>
                    <h2 className='text-[14px] font-semibold'>python</h2>
                    <p className='text-[10px] text-gray-500'>compnay name</p>
                </div>
                </div>
                <div className='ml-2'>
                    <h2 className='text-[14px] font-semibold  text-blue-600 float-right cursor-pointer'>Follow</h2>
                </div>
            </div>
    </div>
    </div>
    )
}

export default LeftPanel
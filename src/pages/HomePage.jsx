import React from 'react'
import LeftPanel from '../componenets/LeftPanel'
import RightPanel from '../componenets/RightPanel'
import UserPanel from '../componenets/UserPanel'

const HomePage = () => {
  return (
    <div className='container m-auto' >
      <div className='md:grid mb-7 md:mb-0  mt-7 grid-cols-4 grid-flow-col gap-4'>
        <div className=' text-Red-500 p-7  mb-7 md:mb-0  rounded-md '>
        <LeftPanel/>
        </div>
        <div className='  text-Orange-500 p-7 mb-7 md:mb-0   rounded-md col-span-2'>
        <UserPanel/>
        </div>
        <div className='  text-gray-500 p-7 mb-7 md:mb-0  rounded-md '>
        <RightPanel/>
        </div>
      </div>
    </div>
  )
}

export default HomePage

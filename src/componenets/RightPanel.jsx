import React from 'react'

function RightPanel() {
  return (
    <div className='bg-white p-3 rounded-lg shadow-light shadow-lg mt-7 ' >
    <h1 className='font-semibold text-gray-600'>Jobs matching your skils</h1>
    <div className='flex my-3'>
        <div>
            <div className='rounded-full   w-[30px] h-[30px]'>
                <img src="../assets/Folder.png" className='rounded-full objuct-cover w-full h-full ' alt="" />
                <div className='rounded-full  bottom-0 right-0 p-1 text-gray-500'></div>
            </div>
        </div>
        <div className='ml-2'>
            <h2 className='text-[14px] font-semibold'>Python developer </h2>
            <p className='text-[10px] text-gray-500'>Active</p>
        </div>
    </div>

    <div className='flex my-3'>
        <div>
            <div className='rounded-full   w-[30px] h-[30px]'>
                <img src="../logo512.png" className='rounded-full objuct-cover w-full h-full ' alt="" />
                <div className='rounded-full  bottom-0 right-0 p-1 bg-green-400'></div>
            </div>
        </div>
        <div className='ml-2'>
            <h2 className='text-[14px] font-semibold'>React Developer</h2>
            <p className='text-[10px] text-gray-500'>oooo</p>
        </div>
    </div>


    <div className='flex my-3'>
        <div>
            <div className='rounded-full   w-[30px] h-[30px]'>
                <img src="../logo512.png" className='rounded-full objuct-cover w-full h-full ' alt="" />
                <div className='rounded-full  bottom-0 right-0 p-1 bg-green-400'></div>
            </div>
        </div>
        <div className='ml-2'>
            <h2 className='text-[14px] font-semibold'>Django developer</h2>
            <p className='text-[10px] text-gray-500'>Active</p>
        </div>
    </div>


    
</div>
  )
}

export default RightPanel
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { format, render, cancel, register } from 'timeago.js';
import axios from "axios";

function Notify({props}) {
    const [seeall, setSeeall] = useState(false)
    const token = JSON.parse(localStorage.getItem("authToken"))
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)

    console.log("2222222222222222222222222222222222222",props);
    
      
  return (

    // <div class="flex ">
        <div  class="relative mx-44 my-12">
          
    
            
    
            <div  class={`absolute top-0 min-w-[230px] ${seeall?" max-h-screen":"max-h-[200px]"}  overflow-y-scroll hide-scrollbar right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20`}>
                <div class="py-2">
                    {props?.map((list,id)=>{
                        return(
                    <div class="flex items-center  px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                        {/* <img class="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar"/> */}
                        <p class="text-gray-600 text-sm mx-2 ">
                            <span class="font-bold " >{list?.notification}</span>  <span class="font-bold text-blue-500" href="#"></span><span className='text-sm'>{format(list?.timestamp)}</span> 
                            <p class="px-2   inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 ">
                                seen
                              </p>
                        </p>
                    </div>
                    )})}
                   

                </div>
                <a href="#" class="block bg-gray-800 text-white text-center font-bold py-2"onClick={()=>setSeeall(!seeall)} >See all notifications</a>
            </div>
        </div>
    // </div>
  )
}

export default Notify
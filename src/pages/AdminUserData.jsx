




import React, { useEffect, useState } from 'react'
import axios from "axios";
import PopUP from '../componenets/PopUP';
import Sidebar from '../componenets/Sidebar';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';







const UserData = () => {
    let {authTokens} = useContext(AuthContext)
    console.log('ddddd',authTokens.access);

    const [data, setData] = useState([])
    const [pop, setPop] = useState(false)

    const Swal = require("sweetalert2")
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/admins/userdata", ).then((response) => {  
               console.log(response);
            setData(response.data)

        }).catch(err=>{
            console.log('ffff',err);
        })

    }, []);

console.log("mfhun",data);

function PopupFunction(){
    setPop(!pop)
}
function closeSlot(){
    setPop(!pop)
}

const Blockuser= (id)=>{
    Swal.fire({ title:"are you sure",
    text:"block/unblock the user ",
    icon:"warning",
    showCancelButton:"true",
    confirmButtonColor:"#3085D6",
    cancelButtonColor:"#d33",
    confirmButtonText:"YES,Approve",}).then((result)=>{
      if(result.isConfirmed){

        axios.post(`http://127.0.0.1:8000/admins/usermanipulation/${id}`).then((response)=>
        {
          if (response.status===200){
            window.location.reload()
          }
          else{
            console.log("Somthing is wrong")
          }
        })
      }

    })

  }

 const DeleteUser=(id)=>{
    Swal.fire({ title:"are you sure",
    text:"Delete the user ",
    icon:"warning",
    showCancelButton:"true",
    confirmButtonColor:"#3085D6",
    cancelButtonColor:"#d33",
    confirmButtonText:"YES,Approve",}).then((result)=>{
      if(result.isConfirmed){

        axios.delete(`http://127.0.0.1:8000/admins/usermanipulation/${id}`).then((response)=>
        {
          if (response.status===200){
            window.location.reload()
          }
          else{
            console.log("Somthing is wrong")
          }
        })
      }

    })

 }









// function addsSlot() {
//   setAddsslots(!addsslots)
// }
// function popupchange(id) {
//   console.log(popup)
//   setPopup(!popup)
//   console.log(popup)
//   setSlotId(id)


// }

    return (
        <>
        <PopUP onclose={closeSlot} open={pop}>

        </PopUP>
        
        <div className='flex'>
            {/* < Slidebar > */}

                <div className="table w-full p-2">
                <div className="flex items-center ml-auto  w-[250px] justify-end">
                <input className="bg-gray-50 outline-none ml-1 block  shadow" type="text" name="" id="" placeholder="search..." />
            <div className="flex bg-gray-50 items-center p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          
          </div>
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-50 border-b">

                                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                                    <div className="flex items-center justify-center">
                                        ID
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                                    <div className="flex items-center justify-center">
                                        Name
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                                    <div className="flex items-center justify-center">
                                        first name
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                                    <div className="flex items-center justify-center">
                                    Email
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                                    <div className="flex items-center justify-center">
                                        Action
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </div>
                                </th>
                                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                                    <div className="flex items-center justify-center">
                                        block/unblock
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((list, id) => {


                                return (


                                    <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">

                                        <td className="p-2 border-r m">{list.id}</td>
                                        <td className="p-2 border-r">{list.username}</td>
                                        <td className="p-2 border-r">{list.first_name}</td>
                                        <td className="p-2 border-r">{list.email}</td>
                                        {console.log(list.is_active,"dddddddddddddddddddddddddddddddddddddddddddddddd")}
                                      
                                    <td>
                                            <a href="#" className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin" onClick={()=>DeleteUser(list.id)}>Delete</a>

                                        </td>
                                   
                                            <td>
                                                 <a href="#"  className={list.is_active ? "bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin":"bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin"} onClick={()=>Blockuser(list.id)}>{list.is_active ?<span>Block</span> : <span>unblock</span> }</a>

                                            </td>

                                       
                                      
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>

        </div>
            {/* </Slidebar> */}



</div >

</>



  )
}

export default UserData

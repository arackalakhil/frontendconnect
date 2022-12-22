import React, { useContext } from "react";

import AuthContext from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchChat = ({get_id}) => {

    const [searchTxt, setSearchTxt] = useState("")
    const [searchvalue, setsearchvalue] = useState("")
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const token = JSON.parse(localStorage.getItem("authToken"))

    const Listuser = () => {
        console.log("5555555555555555555555555555555555555",searchTxt);
        axios.get(`http://127.0.0.1:8000/chat/displayusertochat?username=${searchTxt}`,
            {
                headers: {
                    Authorization: `Bearer ${token.access}`,
                    "content-type": "application/json"
                }

            }
        ).then(async(response) => {
            console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd", response);
            const { data } =await response
            setData(data)
            console.log("userdata",data);
            const {applicant} =await data
            
            console.log("fffffffffffffffffffffffffffffffffffffffffff", data);
            
            
        })
    }
function Clear(){
    setSearchTxt("")
}
const Finduser = (e) => {
    console.log(searchTxt.length);
    console.log("ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
 setSearchTxt(e.target.value)
 console.log("searchTxtsearchTxtsearchTxt",e.target.value)
 searchTxt.length != 0 &&  Listuser()
}
function Cleardata() {
    setData("")
 

}
    let { user } = useContext(AuthContext)

    const findProfile = (userid,username) => {
        console.log("here is the id", userid);
        
        // navigate("/user/friend-profile/" + userid);
        navigate("/chatPage/"+userid+'/'+username)
      };


    return (
        <>
            <div className="pr-1 ">
                <p
                    className="inline-flex text-gray-800 hover:text-gray-900"
                    
                >
                    <h2 className="text-xl leading-snug ">
                        {/* {user.username}*/}
                        <div className="flex justify-center">
                            <div className=" xl:w-fit">
                                
                                <div className="input-group relative flex  items-stretch w- mb-4 rounded">
                                    <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"
                                        value={searchTxt}
                                        onChange={(e) => Finduser(e)} />
                                        
                                    <span className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded" id="basic-addon2">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                        </svg>
                                        <p className="px-1 font-bold cursor-pointer" ></p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </h2>

                </p>
                {/* ??????????//////////////////////// */}
                <div className="divide-y divide-gray-200">
                                {/* <!-- User --> */}
                                {searchTxt.length != 0 && data?.map((list) => {
                                    return (

                                        <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50"
                                        onClick={()=>get_id(list?.id,list?.username)}
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    className="rounded-full items-start flex-shrink-0 mr-3"
                                                    src={list?.userprofile?.image}
                                                    width="32"
                                                    height="32"
                                                    alt="img"
                                                />
{/* onClick={() => get_id(list?.id, list?.username, list?.userprofile?.image)} */}
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-900"  >
                                                        {list?.username}
                                                    </h4>
                                                    <div className="text-[13px]"></div>
                                                </div>
                                            </div>
                                        </button>
                                    )
                                })}

                            </div>

                {/* ?///////////////////// */}
               
            </div>
        </>
    )
}

export default SearchChat
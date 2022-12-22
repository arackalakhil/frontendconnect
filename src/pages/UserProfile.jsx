import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PopUP from '../componenets/PopUP'
import { useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
    let { user, logoutUser } = useContext(AuthContext)
    // let baseurl = "http://127.0.0.1:8000/accounts"
    const { register, handleSubmit, getValues, formState: { errors } } = useForm()
    const navigate = useNavigate();
    const [popUp, setPopUp] = useState(false)
    // const [data, setData] = useState({})
    const [skillpop, setSkillPop] = useState(false)
    const [editpop,setEditpop] = useState(false)
    const [popadd,setPopadd]=useState(false)
    const Swal = require("sweetalert2")
    const [userData,setUserData]= useState({
        
        image: '',
        objective: "",
        skill: " ",
        skil2: " ",
        skil3: " ",
        user: user.user_id,
    }

    )
    function change() {
        setPopUp(!popUp)
    }
    function AddSkillpop() {
        setSkillPop(!skillpop)
    }
    function EditSkillpop(){
        setEditpop(!editpop)
    }
    console.log(popUp);


    
    function addpop(){
        setPopadd(!popadd)
    }
    const uploadImage = (e) => {
        const file = e.target.files[0]
        console.log(file);
        setUserData({ ...userData, image: file })
        console.log(userData);
    }

    const token = JSON.parse(localStorage.getItem("authToken"))





    const onHandlechange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const getUserprofile = () => {
        axios.get("http://127.0.0.1:8000/accounts/userprofile",
            {
                headers: {
                    Authorization: `Bearer ${token.access}`,
                    "content-type": "application/json"
                }

            }
        ).then((response) => {
            console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd", response);
            setUserData({ ...response.data })
            { console.log(response.data); }
        })
    }

    useEffect(() => {
        getUserprofile()
    }, []);

   
    const Addprofile = (e) => {
        let data={
            id:userData.id,
            image: userData.image,
            objective: userData.objective,
            skill: userData.skill,
            skil2: userData.skil2,
            skil3: userData.skil3,
            user: user.user_id,
        }
        e.preventDefault()
        axios.post("http://127.0.0.1:8000/accounts/userprofile",data,     
        {
           headers: {
                    Authorization: `Bearer ${token.access}`,
                    // "content-type": "application/json"
                }

            }
        ).then((response) => {
            console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd", response);
            setUserData({ ...response.data })
            { console.log(response.data); }
        })
    }




    return (
        <>
            <PopUP className="h-fit" onclose={() => {
                setPopUp(false)
            }} open={popUp}>

                <div className="max-w-2xl mx-auto">


                    <form >
                        <div className="w-[30%]">
                            <div className="text-center">
                                <img className="h-28 w-28  rounded-full mx-auto object-contain "
                                    src={userData.image}
                                    alt="profile pic" />
                            </div>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <div className="relative z-0 mb-6 w-full group" onChange={uploadImage}>
                                <input type="file" name="image" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={uploadImage} required />
                                <label for="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> image</label>
                            </div>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input onChange={onHandlechange}
                                type="text" name="objective"
                                defaultValue={userData.objective}
                                id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer overflow overflow-hidden" placeholder=" type" required />

                            <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>

                        </div>
                
                        <div className="relative z-0 mb-6 w-full group">
                            <input onChange={onHandlechange}
                                type="text" name="skill"
                                defaultValue={userData.skill}
                                id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer overflow overflow-hidden" placeholder=" type" required />

                            <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>

                        </div>  <div className="relative z-0 mb-6 w-full group">
                            <input onChange={onHandlechange}
                                type="text" name="skil2"
                                defaultValue={userData.skil2}
                                id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer overflow overflow-hidden" placeholder=" type" required />

                            <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>

                        </div>
                          <div className="relative z-0 mb-6 w-full group">
                            <input onChange={onHandlechange}
                                type="text" name="skil3"
                                defaultValue={userData.skil3}
                                id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer overflow overflow-hidden" placeholder=" type" required />

                            <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>

                        </div>

                        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
                    </form>


                </div>


            </PopUP>

            <PopUP className="h-auto" onclose={addpop} open={popadd}>
            <div className="max-w-2xl mx-auto">


<form  onSubmit={Addprofile}>
    <div className="w-[30%]">
        <div className="text-center">
            <img className="h-40 w-40  rounded-full mx-auto object-contain "
                src={userData.image}
                alt="profile pic" />
        </div>
    </div>
    <div className="relative z-0 mb-6 w-full group">
        <div className="relative z-0 mb-6 w-full group" onChange={uploadImage}>
            <input type="file" name="image" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={uploadImage}  />
            <label for="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> image</label>
        </div>
    </div>
    <div className="relative z-0 mb-6 w-full group">
        <input onChange={onHandlechange}
            type="text" name="objective"
            value={userData.objective}
            id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer overflow overflow-hidden" placeholder=" type" required />

        <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>

    </div>

    <div className="relative z-0 mb-6 w-full group">
        <input onChange={onHandlechange}
            type="text" name="skill"
            value={userData.skill}
            id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer overflow overflow-hidden" placeholder=" type" required />

        <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>

    </div>  <div className="relative z-0 mb-6 w-full group">
        <input onChange={onHandlechange}
            type="text" name="skil2"
            value={userData.skil2}
            id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer overflow overflow-hidden" placeholder=" type" required />

        <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>

    </div>
      <div className="relative z-0 mb-6 w-full group">
        <input onChange={onHandlechange}
            type="text" name="skil3"
            value={userData.skil3}
            id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer overflow overflow-hidden" placeholder=" type" required />

        <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>

    </div>

    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
</form>


</div>


            </PopUP>


            <PopUP className="h-auto" onclose={EditSkillpop} open={editpop}>
    



            </PopUP>


            <div
                className="h-full flex flex-col bg-gray-100 dark:bg-gray-700 shadow-xl">
                <div className="ml-3 h-7 flex justify-end items-center">

                </div>
                <div className="bg-blue-500 shadow-lg pb-3 ">
                    <div
                        className="  bg-gray-100 dark:bg-gray-700 space-y-5 py-7">
                        <div className="flex">
                            <div className="w-[30%]">
                                <div className="text-center">
                                    <img className="h-28 w-28  rounded-full mx-auto object-contain "
                                        src={userData.image}
                                        alt="User" />
                                    <span
                                        className="text-h1 pl-0.5">{user.username}</span>
                                </div>

                            </div>
                            <div className="flex" >
                                <div>
                                    <p class="text-ellipsis overflow-hidden">
                                        {userData.objective}
                                    </p>
                                </div>

                                {/* <div>
                            <p class="text-ellipsis overflow-hidden">
                                {data.objective}
                            </p>
                        </div> */}
                            </div>

                        </div>
                        {userData.skil1 || userData.skil2 || userData.skil3 ?
                        <div className="flex ml-[50px] h-fit w-fit shadow rounded p-3 " >
                        <h1 className=" font-bold ">My skills:&nbsp;&nbsp;</h1>
                            
                                    <p class="text-ellipsis  font-semibold overflow-hidden">
                                        {userData?.skill},&nbsp;{userData?.skil2},&nbsp;{userData?.skil3},&nbsp;
                                    </p>
                        </div>: <p></p> }
                    </div>

                    {/* <div
                        className="grid px-7 py-2  items-center justify-around grid-cols-3 gap-4 divide-x divide-solid ">
                        <div className="col-span-1 flex flex-col items-center ">
                            <span className="text-2xl font-bold dark:text-gray-500"></span>
                            <span className="text-lg font-medium 0">Jobs applied</span>
                        </div>
                        <div className="col-span-1 px-3 flex flex-col items-center ">
                            <span className="text-2xl font-bold dark:text-gray-500">
                                </span>
                            <span className="text-lg font-medium" onClick={EditSkillpop}>Delete Skill</span>
                        </div>
                        <div className="col-span-1 px-3 flex flex-col items-center ">
                            <span className="text-2xl font-bold dark:text-gray-500">
                                </span>
                            <span className="text-lg font-medium" onClick={AddSkillpop}>Add Skill</span>
                        </div>
                    </div> */}

                </div>

                <div
                    className="grid rounded-2xl divide-y divide-dashed hover:divide-solid  justify-evenly bg-gray-50 dark:bg-gray-300 m-3 mt-10 grid-cols-3">
                    <div className="col-span-1 cursor-pointer  p-3">
                        <div className="flex flex-col items-center ">
                            <button
                                className="tr-300">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="h-14 w-14 text-gray-500" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor"
                                    stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {userData.objective ? <span className="text-lg font-medium" onClick={change}>Edit</span> : <span className="text-lg font-medium" onClick={addpop} >add</span>}
                            </button>
                        </div>
                    </div>
                    {/* <div className="col-span-1  p-3">
                                                    <div className="flex flex-col items-center ">
                                                        <a href=""> <button
                                                                className="tr-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-14 w-14 text-gray-500" fill="none"
                                                                    viewBox="0 0 24 24" stroke="currentColor"
                                                                    stroke-width="2">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                                </svg>
                                                                <span className="text-lg font-medium">Messages</span>
                                                            </button></a>
                                                    </div>
                                                </div> */}
                    <div className="col-span-1  p-3">
                        <div className="flex flex-col items-center ">
                            <a href=""> <button
                                className="tr-300">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    className="h-14 w-14 text-gray-500" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor"
                                    stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                                <span className="text-lg font-medium">Deactivate</span>
                            </button></a>
                        </div>
                    </div>
                    <div className="col-span-1  p-3">
                        <div className="flex flex-col items-center ">
                            <a href="">
                                <button className="tr-300">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        className="h-14 w-14 text-gray-500" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor"
                                        stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="text-lg font-medium"> Delete</span>
                                </button></a>
                        </div>
                    </div>
                    {/* <div className="col-span-1  p-3">
                    <div className="flex flex-col items-center ">
                        <a href=""> <button className="tr-300">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-14 w-14 text-gray-500" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor"
                                stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-lg font-medium">Messages</span>
                        </button></a>
                    </div>
                </div> */}
                    {/* <div className="col-span-1 bg-red-50 p-3" onClick={logoutUser}>
                    <div className="flex  flex-col items-center ">
                        <a href=""> <button className="tr-300">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-14 w-14 text-gray-500" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor"
                                stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="text-lg font-medium"  >Logout</span>
                        </button></a>
                    </div>
                </div> */}
                </div>

                {/* <div className="flex mx-auto mt-3 w-100 ">
                                                <a href=""> <button
                                                        className="p-2 shadow-lg xltr-300 w-100 font-medium  bg-green-500 rounded-md hover:bg-green-600 text-gray-50">Logout
                                                        </button></a>
                                            </div> */}
            </div>
        </>
    )
}

export default UserProfile
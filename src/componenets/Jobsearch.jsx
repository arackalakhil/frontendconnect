import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PopUP from '../componenets/PopUP'
import { useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import { format, render, cancel, register } from 'timeago.js';
import Freepopup from "./Freepopup";

const Jobsearch = () => {
    // const initialValues = { Fulltime: '', Parttime: '', Internship: '' }
    const [value, setValue] = useState('')
    let { user } = useContext(AuthContext)
    const [data, setData] = useState([])
    const[popup,setPopUp] =useState(false)
    let { authTokens } = useContext(AuthContext)
    const[companydata,setCompanydata]=useState({})
    const [searchTxt, setSearchTxt] = useState("")
    const token = JSON.parse(localStorage.getItem("authToken"))
    const Swal = require("sweetalert2")


function closePopUP(){
    setPopUp(!popup)
}
 function Viewcompany(id) {
        console.log("fdddddddddssssssssssssssssssssssssssssssssssssssssssssssssssss");
        setPopUp(!popup)
       
     {data?.map((userdata, index) => {
      if(  userdata?.Company?.id === id){
            console.log(id);
           console.log(userdata?.Company?.company_name);
           setCompanydata ({
        //   id:userdata.id,
        company_name:userdata?.Company?.company_name,
          vision: userdata?.Company?.vision,
          location: userdata?.Company?.location,
          number: userdata?.Company?.number,
      })
    
      }
      
      })}
      console.log("ComapnydataComapnydataComapnydataComapnydata",companydata);
    
      }



    
    const Reportjob = async (id) => {
        // Swal.fire({
        //     title: "do you want to apply",
        //     showCancelButton: "true",
        //     confirmButtonColor: "#3085D6",
        //     confirmButtonText: "YES,",
        //   }).then((result)=>{
        //     if (result.isConfirmed) {
        axios.put("http://127.0.0.1:8000/accounts/reportjob", {

            id: id
        },
            {
                headers: {
                    Authorization: `Bearer ${token.access}`,
                }

            },




        ).then((response) => {
            if (response.status === 201) {
                console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBB", response.data);
                Listjob()

            }
            if (response.status === 208) {
                console.log("xxxxxxxxxxxx", response.data);
                Swal.fire({
                    title: "already reported",

                })
            }


        })
        // })

    }



    const Applyjob = async (id, creator) => {
        console.log("idddddddd",id);
        console.log("creator",creator);

        // Swal.fire({
        //     title: "do you want to apply",
        //     showCancelButton: "true",
        //     confirmButtonColor: "#3085D6",
        //     confirmButtonText: "YES,",
        //   }).then((result)=>{
        //     if (result.isConfirmed) {
        axios.put("http://127.0.0.1:8000/accounts/applyjob", {

            id: id,
            creator:creator
        },
            {
                headers: {
                    Authorization: `Bearer ${token.access}`,
                }

            },




        ).then((response) => {
            if (response.status === 201) {
                console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBB", response.data);
                Listjob()

            }
            if (response.status === 208) {
                console.log("xxxxxxxxxxxx", response.data);
                Swal.fire({
                    title: "already applied",

                })
            }


        })
        }


   

    const Listjob = () => {
        console.log("5555555555555555555555555555555555555",searchTxt);
        axios.get(`http://127.0.0.1:8000/recruiter/alljob?heading=${searchTxt}`,
            {
                headers: {
                    Authorization: `Bearer ${token.access}`,
                    "content-type": "application/json"
                }

            }
        ).then(async(response) => {
            // console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd", response);
            const { data } =await response
            setData(data)
            console.log("jobdata",data);
            const {applicant} =await data
            
            console.log("fffffffffffffffffffffffffffffffffffffffffff", data[1].applicant);

        })
    }



    useEffect(() => {
        Listjob()

    }, [searchTxt]);

    const handleChange = (e) => {
        // const { name, value } = e.target
        setValue(e.target.value)
    }
    console.log(value);

    console.log(data.applicant,'dataa');



    return (
        <>
    <PopUP className="h-auto" onclose={closePopUP} open={popup}>
    <div className="max-w-2xl mx-auto">
     
           
                  
              <div className="relative z-0 mb-6 w-full group">
                <p
             

                  type="text" className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required >
                    {companydata?.company_name?.toUpperCase()}
                  </p>
                <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Name</label>

              </div>
              <div className="relative z-0 mb-6 w-full group">
                <p
                 
                  type="text" name="type"

                  id="floating_first_name" className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" type" required >
                                     {companydata?.vision}
    </p>

                <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vision</label>

              </div>
              <div className="relative z-0 mb-6 w-full group">
                <p
                 
                  type="text" name="type"

                  id="floating_first_name" className=" py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" type" required >
                                     {companydata.location}
    </p>

                <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Location</label>

              </div>

              <div className="grid xl:grid-cols-2 xl:gap-6">
                
                <div className="relative z-0 mb-6 w-full group">
                  <p  className=" overflow-y: auto py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    >{companydata?.number}</p>
                  <label for="Leave_date" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">vision</label>
                </div>
              </div>
           
     

      </div>


        </PopUP>
            <div>



                <div className="w-full bg-white shadow mt-14 px-4">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-5 py-4 sm:divide-x sm:divide-gray-100 place-items-start sm:place-items-center gap-4 sm:gap-0">

                        <div className="flex flex-row gap-2 items-center justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input className="text-gray-900 focus:outline-none p-2"
                                value={searchTxt}
                                onChange={e => setSearchTxt(e.target.value)} placeholder="job/skill" />
                        </div>

                     

                    </div>
                </div>


                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-4 pt-10 place-items-start px-4 ">
                    <div className="flex flex-col gap-6 items-start justify-center w-full divide-y divide-gray-100 pr-10">
                        <div>
                            <p className="text-2xl font-semibold">Filters</p>
                        </div>

                        <div className="grid grid-cols-1 divide-y divide-gray-100 w-full">
                            <div className="py-4 gap-4 flex flex-col items-start justify-start">
                                <h1 className="text-gray-400 font-semibold text-sm">Schedule</h1>
                                <div className="flex md:flex-col items-start justify-center gap-2">
                                    <label className="inline-flex flex-row items-center justify-center gap-2">
                                        <input type="radio" name="jobtype"
                                            className="bg-blue-500 border-blue-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded cursor-pointer " value={'Full time'} onChange={(e) => handleChange(e)} />
                                        <span>Full time</span>
                                    </label>

                                    <label className="inline-flex flex-row items-center justify-center gap-2">
                                        <input type="radio" name="jobtype"
                                            className="bg-blue-500 border-blue-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded cursor-pointer " value={'Part time'} onChange={(e) => handleChange(e)} />
                                        <span>Part time</span>
                                    </label>



                                    <label className="inline-flex flex-row items-center justify-center gap-2">
                                        <input type="radio" name="jobtype"
                                            className="bg-blue-500 border-blue-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded cursor-pointer " value={'Internship'} onChange={(e) => handleChange(e)} />
                                        <span>Internship</span>
                                    </label>

                                    <label className="inline-flex flex-row items-center justify-center gap-2">
                                        <input type="radio" name="jobtype"
                                            className="bg-blue-500 border-blue-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded cursor-pointer  "  value={''} onChange={(e) => handleChange(e)}  />
                                        <span>All</span>
                                    </label>

                                </div>
                            </div>


                        </div>

                    </div>
                    <div className="col-span-3 flex flex-col gap-6 items-start justify-start">
                        {/* <div className="flex items-center justify-between w-full"> */}
                        {/* <p className="text-2xl font-semibold space-x-4"><span>Results</span> <span className="text-gray-400">600</span></p> */}
                        {/* <div className="flex items-center justify-start gap-2"> */}
                        {/* <span className="text-sm text-gray-400">Sort by</span> */}
                        {/* <select className="text-blue-500 focus:outline-none">
                                    <option>latest</option>
                                    <option>salary</option>
                                    <option>created</option>
                                </select> */}
                        {/* </div> */}
                        {/* </div> */}
                        {/* //////////////////////////////////////////// */}


                        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                        {data.map((list, id) => {
                  return (
                            <div className="flex flex-col bg-blue-50 p-4 rounded-xl">
                                <div className="flex items-center justify-between pb-6">
                                    <img className="w-6 h-6 rounded-full" />
                                    <span className="text-xs text-gray-400">{format(list.created_on)}</span>
                                </div>

                                <div className="flex flex-col items-start justify-between gap-4 w-full">
                                    <div className="flex items-center justify-between w-full">
                                        <p className="text-2xl font-semibold truncate">{list.heading}</p>
                                        <span className="text-xs text-blue-500 font-semibold">{list.number_of_appicants?`applicants:`+list.number_of_appicants:``}</span>
                                    </div>

                                    <div className="flex items-center justify-start gap-2 w-full">
                                        <label className="bg-purple-200 text-purple-500 px-2 py-1 text-xs rounded-2xl">{list.skill}</label>
                                        <label className="bg-green-100 text-green-300 px-2 py-1 text-xs rounded-2xl">{list.skil2}</label>
                                        <label className="bg-blue-100 text-indigo-500 px-2 py-1 text-xs rounded-2xl">{list.skil3}</label>
                                        <label className="bg-red-100 text-indigo-500 px-2 py-1 text-xs rounded-2xl">{list.type}</label>

                                    </div>

                                    <div>
                                        <h1 className="text-sm font-semibold">{list.creater.first_name}</h1>
                                    </div>

                                    <div className="max-w-[270px]">
                                        <p className="text-sm text-gray-500 truncate whitespace-normal">
                                          {list.description}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 w-full">
                                        {list.applicant.includes(user)?
                                        <p>okkkkkkkkk</p>
                                        :
                                        <p  className=" px-4 rounded-xl text-white py-3 inline-flex items-center justify-center bg-blue-500 cursor-pointer  " onClick={()=>{Applyjob(list.id)}} >Apply</p>
                                        }
                                        <p  className=" px-4 rounded-xl py-3 inline-flex items-center justify-center border border-gray-400 text-gray-500 cursor-pointer  "  >Report</p>
                                    </div>
                                </div>
                            </div>
                            
                            )
                        })}

                        </div> */}



                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                            {/* {names.filter(name => name.includes('J')).map(filteredName => ( */}
                            {
                                data?.filter(name => name.type.includes(value)).map((filterdlist, id) => {
                                    let applied
                                    // )}
                                    // {data.map((list, id) => {
                                    return (
                                        <div className="flex flex-col bg-blue-50 p-4 rounded-xl">
                                            <div className="flex items-center justify-between pb-6">
                                                <img className="w-6 h-6 rounded-full" />
                                                <span className="text-xs text-gray-400">{format(filterdlist?.created_on)}</span>
                                            </div>

                                            <div className="flex flex-col items-start justify-between gap-4 w-full">
                                                <div className="flex items-center justify-between w-full">
                                                    <p className="text-2xl font-semibold truncate">{filterdlist?.heading}</p>
                                                    <span className="text-xs text-blue-500 font-semibold">{filterdlist?.number_of_appicants ? `applicants:` + filterdlist?.number_of_appicants : ``}</span>
                                                </div>

                                                <div className="flex items-center justify-start gap-2 w-full">
                                                    <label className="bg-purple-200 text-purple-500 px-2 py-1 text-xs rounded-2xl">{filterdlist?.skill}</label>
                                                    <label className="bg-green-100 text-green-300 px-2 py-1 text-xs rounded-2xl">{filterdlist?.skil2}</label>
                                                    <label className="bg-blue-100 text-indigo-500 px-2 py-1 text-xs rounded-2xl">{filterdlist?.skil3}</label>
                                                    <label className="bg-red-100 text-indigo-500 px-2 py-1 text-xs rounded-2xl">{filterdlist?.type}</label>

                                                </div>

                                                <div className="flex gap-2">
                                                    <h1 className="text-sm font-semibold " > Recruiter:{filterdlist?.creater?.first_name}</h1>
                                                    <h1 className="text-sm font-semibold text-blue-400 cursor-pointer hover:text-blue-700 " onClick={() => { Viewcompany(filterdlist?.Company?.id) }}>Company:{filterdlist?.Company?.company_name.toUpperCase()}</h1>

                                                    


                                                </div>

                                                <div className="max-w-[270px]">
                                                    <p className="text-sm text-gray-500 truncate whitespace-normal">
                                                        {filterdlist?.description}
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 w-full">

                                 


                            


                                                    {/* { filterdlist?.applicant?.map ((applicants,id) => {
                                                        return(
                                                            
                                                            <>
                                                            {applicants?.map((Udatas,id)=>{
                                                        return(

                                                            <>

                                                            // { filterdlist?.applicant?.includes(user)? 
                                                            //     <p>sggf</p>: */}

                                                                       
                                                    {
                                              filterdlist.applicant.some((ite)=>{
                                                  return(
                                                
                                                        ite.username === user.username ?  <p className=" px-4 rounded-xl text-white py-3 inline-flex items-center justify-center bg-gray-600  cursor-pointer  " onClick={() => { Applyjob(filterdlist.id, filterdlist?.creater?.first_name) }} >{filterdlist?.creater?.first_name}Applyed</p>   :    <p className=" px-4 rounded-xl text-white py-3 inline-flex items-center justify-center bg-gray-600  cursor-pointer  " onClick={() => { Applyjob(filterdlist.id,filterdlist?.creater?.first_name) }} >Applyed</p>
                                      
                                                     )
                                                    })
                                                    
                                                    
                                                    } 
                                                       {/* <p className=" px-4 rounded-xl text-white py-3 inline-flex items-center justify-center bg-blue-600  cursor-pointer  " onClick={() => { Applyjob(filterdlist.id) }} > Applyed</p> */}

                                                    {/* {
                                                        filterdlist.applicant.forEach(()=>{
                                                            if(ite.username==user){
                                                               applied = true
                                                               break
                                                            }
                                                            else{
                                                                return false;
                                                            }
                                                        })
                                                    } */}
{/* 

   {/* {
    filterdlist.applicant.find((eachApplicant=>{
        if(eachApplicant.username === user){

        }else{

        }
    }))
   } */}
                                                
                                                   
        <p className=" px-4 rounded-xl text-white py-3 inline-flex items-center justify-center bg-blue-500 cursor-pointer" onClick={() => { Applyjob(filterdlist.id, filterdlist?.creater?.id) }} > Apply</p>   

                                                   
                                                    <p className=" px-4 rounded-xl py-3 inline-flex items-center justify-center border border-gray-400 text-gray-500 cursor-pointer  " onClick={() => { Reportjob(filterdlist.id) }} >view</p>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })}

                        </div>




                    </div>
                </div>
            </div>




        </>
    )
}

export default Jobsearch

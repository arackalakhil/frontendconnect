import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PopUP from '../componenets/PopUP'
import { useEffect } from "react";
import axios from "axios";
const Companydata = () => {

    let { user } = useContext(AuthContext)

    const navigate = useNavigate();
    const [popUp, setPopUp] = useState(false)
    const [data, setData] = useState([])
    const [errorData, setErrorData] = useState([])
    const [selection, setSelection] = useState(false)
    const [edit, setEdit] = useState({})
    const Swal = require("sweetalert2")
  const [preloaddata,setPreloaddata]=useState({})
    const id = user.user_id
    let { authTokens } = useContext(AuthContext)
    const [userData, setUserData] = useState({
      institution: '',
      type: '',
      join_date: '',
      Leave_date: '',
      aim: '',
      // user:user.user_id, 
    })
  
    function closePopUP() {
      setPopUp(!popUp)
      setPreloaddata({})
      setEdit([])
  
    }
    function closeAddpopup(){
      setSelection(!selection)
  
    }
    function AddPopup() {
      
      setSelection(!selection)
    }
  
    function EditPopup(id) {
      setEdit(id)
      setPopUp(!popUp)
     
   {data.map((userdata, index) => {
    if(  userdata.id === id){
          console.log(id);
         console.log(userdata.id);
       setPreloaddata ({
        id:userdata.id,
        compnany_name: userdata.compnany_name,
        vision: userdata.vision,
        number: userdata.number,
        location: userdata.location,
     
    })
      console.log(preloaddata);
  
    }
    
    })}
  
    }
  
    const token = JSON.parse(localStorage.getItem("authToken"))
  
    console.log('Tokennnn', token.access);
    console.log("..........................", authTokens.access);
    const handleChange = (e) => {
      setUserData({
        ...userData, [e.target.name]: e.target.value
      })
  
      console.log(userData)
  
  
    }
  
  
  
    const handleeditChange = (e) => {
      setPreloaddata({
        ...preloaddata, [e.target.name]: e.target.value
      })
  
      console.log(userData)
  
    }
    const getCompanydata = () => {
      axios.get("http://127.0.0.1:8000/recruiter/comanyprofile",
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
            "content-type": "application/json"
          }
  
        }
      ).then((response) => {
        console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd", response);
        const {data}=response
        setData(data)
  console.log("fffffffffffffffffffffffffffffffffffffffffff",data);
      })
    }
  
  
    
    useEffect(() => {
        getCompanydata()
  
    }, []);
  
  
   
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
      defaultValues: preloaddata
    });
  
  
   
  const AddCompanydata = async (e) => {
    // e.preventDefault()

    console.log("dddddddddddddddddddddddd", userData);
    // if(selection)
  
    // {
    await axios.post("http://127.0.0.1:8000/recruiter/comanyprofile", {
  
      compnany_name: userData.compnany_name,
      number: userData.number,
      vision: userData.vision,
      location: userData.location,
      user: user.user_id,
    },
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
        }
  
      }
  
    ).then((response) => {
      console.log("gggggggggggggggggggggggggggggggggsssssssssssssssssddddddd", response.status);
      if (response.status === 201) {
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBB", response.status);
  
        userData.compnany_name = ""
        userData.vision = ""
        userData.number = null
        userData.location = ""
        setSelection(!selection)
        getCompanydata()
      }
  
  
  
  
    }).catch((error) => {
  
      const { data: { data } } = error.response
      console.log("responseerror.data", error);
      console.log("error", error.response);
      console.log("00000", data);
      setErrorData(data)
    }
  
  
    )
  
  }
  
  
  
  // }
  
  
  







  return (
<>
<PopUP className="h-auto" onclose={closeAddpopup} open={selection}>
{console.log("Ffffffffffffffffffffffffffffffffffffffffffiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiifffffffffffffffff")}

      <div className="max-w-2xl mx-auto">
        
            
            <form onSubmit={handleSubmit(AddCompanydata)}>
             
              <div className="relative z-0 mb-6 w-full group">
                <input
                  {...register('compnany_name', {
                    required: 'compnany_name is required',
                    pattern: {
                      value: /^[A-Za-z\s]{3,}$/,
                      message: 'Must be Characters & should not be less than 3'
                    }
                  })}
                  name="compnany_name"
                  onChange={handleChange}
                  placeholder=""
                  value={userData.compnany_name} 
                  type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                {errors.compnany_name && (<small className='text-red-500'>{errors.compnany_name.message}</small>)}

                <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> compnany_name</label>

              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  {...register('location', {
                    required: 'type is required',
                    pattern: {
                      value: /^[A-Za-z\s]{3,}$/,
                      message: 'Must be Characters & should not be less than 3'
                    }
                  })}
                  type="text" name="location"
                  onChange={handleChange}

                  value={userData.location} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

                <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">location</label>
                {errors.location && (<small className='text-red-500'>{errors.location.message}</small>)}

              </div>

              <div className="relative z-0 mb-6 w-full group">
                <input
                  {...register('number', {
                    required: 'type is required',
                    pattern: {
                 
                      message: 'Must be Characters & should not be less than 3'
                    }
                  })}
                  type="number" name="number"
                  onChange={handleChange}

                  value={userData.number} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

                <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">number</label>
                {errors.vision && (<small className='text-red-500'>{errors.vision.message}</small>)}

              </div>
            
              <div className="">

                <div className="relative z-0 mb-6 w-full group">
                  <textarea onChange={handleChange}
                    value={userData.vision}
                    placeholder=" " id="floating_company" name="vision" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" ></textarea>
                  {errors.vision && (<small className='text-red-700'>{errors.vision.message}</small>)}

                  <label for="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">AIM</label>
                </div>
              </div>
              <button type="submit" className="text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
            </form>
          

      </div>


    </PopUP>

    <div className="bg-white p-8 rounded-md w-full">
    <div className=" flex items-center justify-between pb-6">
      <div>
        <h2 className="text-gray-600 font-semibold">Company</h2>
        {data?.compnany_name? <span  className="text-xs">Data added cannot changed</span> :<span className="text-xs"> After adding Data cannot be changed</span>}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex bg-gray-50 items-center p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd" />
          </svg>
          <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
        </div>
        <div className="lg:ml-40 ml-10 space-x-8">
          {/* <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">New Report</button> */}
          {data?.company_name?null: <button className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={AddPopup}>Add New</button>}
        </div>
      </div>
    </div>
    <div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal table-auto">
            <thead>
              <tr>
                <th
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Comany Name
                </th>
                <th
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                   number
                </th>
                <th
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  location
                </th>
                <th
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  vision
                </th>
            
        
              </tr>
            </thead>


            <tbody>
            
             


                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">

                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.company_name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{data.number}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {data.vision}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {data.location}                      </p>
                    </td>
                
                  </tr>
                
            </tbody>

          </table>



         
        
        
        </div>
      </div>
    </div>
  </div>
</>
  )
}

export default Companydata

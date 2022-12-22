import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PopUP from '../componenets/PopUP'
import { useEffect } from "react";
import axios from "axios";


const Experience = () => {

  let {user}=useContext(AuthContext)

	const navigate = useNavigate();
	const [popUp, setPopUp] = useState(false)
	const [check, setCheck] = useState(false)
  const [data, setData] = useState([])
	const [errorData, setErrorData] = useState([])
  const Swal = require("sweetalert2")
  const [preloaddata,setPreloaddata]=useState({})
  const [selection, setSelection] = useState(false)

  const [edit, setEdit] = useState({})
  const token = JSON.parse(localStorage.getItem("authToken"))

  const id=user.user_id
  let {authTokens} = useContext(AuthContext)
  const [userData, setUserData] = useState({
    company : '',
		Post : '',
		join_date: '',
		Leave_date: '',
		aim: '',
    user:user.user_id, 
	})

  function closePopUP() {
    setPopUp(!popUp)
    setPreloaddata({})
    setEdit([])

  }
  function Popup(){
    setPopUp(!popUp)
  }
  function Check(){
    setSelection(!selection)
  }
  function closeAddpopup(){
    setSelection(!selection)

  }

  const handleChange = (e) => {
    setUserData({
      ...userData, [e.target.name]: e.target.value
    })
    console.log(userData);

  }
  const handleeditChange = (e) => {
    setPreloaddata({
      ...preloaddata, [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    getExperience()
  }, []);
  function EditPopup(id) {
    setEdit(id)
    setPopUp(!popUp)
   
 {data.map((userdata, index) => {
  if(userdata.id === id){
        console.log("ddddddddddddddddddddddddddddddd",id);
       console.log(userdata.id);
     setPreloaddata ({
      id:userdata.id,
      company: userdata.company,
      Post: userdata.Post,
      join_date: userdata.join_date,
      Leave_date: userdata.Leave_date,
      aim: userdata.aim,
  })
    console.log("22222222222222222222222222222",preloaddata);

  }
  
  })}

  }

 
  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues: preloaddata
  });



  const getExperience=()=>{
    axios.get("http://127.0.0.1:8000/accounts/experience",
    {
      headers:{
        Authorization:`Bearer ${authTokens.access}`,
        "content-type":"application/json"
      }

    }
    ).then((response) => {
      console.log("kkkkkkk",response);
        setData(response.data)

    })

  }

const addExperiences = async (e) => {
  console.log("ddddddddddddddddddddddddhhh",userData);
    await axios.post("http://127.0.0.1:8000/accounts/experience", {
      company: userData.company,
      Post:userData.Post,
      join_date:userData.join_date,
      Leave_date:userData.Leave_date,
      aim: userData.aim,
      user:user.user_id, 
},
      {headers:{
        Authorization:`Bearer ${token.access}`,
    
      }

    }).then((response) => {
      console.log("gggggggggggggggggggggggggggggggggsssssssssssssssssddddddd",response.status);
      if (response.status === 201) {
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBB", response.status);
        
      userData.company=""
      userData.Post=""
      userData.join_date=""
      userData.Leave_date=""
      userData.aim=""
      }
      setPopUp(!popUp)
      window.location.reload()
  
  
  
    }).catch((error) => {
  
      const { data: { data } } = error.response
      console.log("responseerror.data", error);
      console.log("error", error.response);
      console.log("ddddddddddddddddddddddddddddddddddd", data);
      setErrorData(data)
    }
  
  
    )
  
  }
  
const DeleteData = (id) => {


  Swal.fire({
    title: "are you sure",
    text: "Delete the Education ",
    icon: "warning",
    showCancelButton: "true",
    confirmButtonColor: "#3085D6",
    cancelButtonColor: "#d33",
    confirmButtonText: "YES,Approve",
  }).then((result) => {
    if (result.isConfirmed) {

      axios.delete(`http://127.0.0.1:8000/accounts/deleteExperience/${id}`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "content-type": "application/json"
        }
      }

      ).then((response) => {
        if (response.status === 200) {
          console.log("DDDdddddddddd111111111111111111", response.status);
          getExperience()
        }
        else {
          console.log("Somthing is wrong")
        }
      })
    }

  })

}

const updateExperiance= async (e) => {
  e.preventDefault()
  console.log("00000ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo00000000", preloaddata);

  await axios.put("http://127.0.0.1:8000/accounts/experience", {
    id:preloaddata.id,
    company: preloaddata.company,
    Post: preloaddata.Post,
    join_date: preloaddata.join_date,
    Leave_date: preloaddata.Leave_date,
    aim: preloaddata.aim,
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

      preloaddata.company = ""
      preloaddata.Post = ""
      preloaddata.join_date = ""
      preloaddata.Leave_date = ""
      preloaddata.aim = ""
      setPopUp(!popUp)
      getExperience()
    }




  }).catch((error) => {

    const { data: { data } } = error.response
    console.log("responseerror.data", error);
    console.log("error", error.response);
    console.log("ddddddddddddddddddddddddddddddddddd", data);
    setErrorData(data)
  }


  )

}

  return (
<>
<PopUP className="h-auto" onclose={closePopUP} open={popUp}>
{console.log("9999999999999999999999999999999999999999999999999999999",preloaddata)}
{console.log("..................................................")}
      <div className="max-w-2xl mx-auto">
     
            <form onSubmit={(updateExperiance)} >
                  
              <div className="relative z-0 mb-6 w-full group">
                <input
             
                  name="company"
                  onChange={handleeditChange}
                  placeholder={preloaddata.company}
                  defaultValue={preloaddata.company}
                  type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />

                <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Institution</label>

              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                 
                  type="text" name="Post"
                  onChange={handleeditChange}

                  defaultValue={preloaddata.Post} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" type" required />

                <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>

              </div>

              <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input type="date" name="join_date" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onChange={handleeditChange}

                    placeholder="" required />
                  <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Join_date</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type="date" name="Leave_date" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               onChange={handleeditChange}

                    defaultValue={preloaddata.Leave_date}
                    placeholder=" " required />
                  <label for="Leave_date" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End_date</label>
                </div>
              </div>
              <div className="">

                <div className="relative z-0 mb-6 w-full group">
                  <textarea 
                    defaultValue={preloaddata.aim}
                    onChange={handleeditChange}

                    placeholder=" " id="floating_company" name="aim" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" ></textarea>

                  <label for="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">AIM</label>
                </div>
              </div>
              <button  type="submit" className="text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
            </form>
     

      </div>


    </PopUP>

    <PopUP className="h-auto" onclose={closeAddpopup} open={selection}>
{console.log("Ffffffffffffffffffffffffffffffffffffffffffiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiifffffffffffffffff")}

      <div className="max-w-2xl mx-auto">
        
            
            <form onSubmit={handleSubmit(addExperiences)}>
             
              <div className="relative z-0 mb-6 w-full group">
                <input
                  {...register('company', {
                    required: 'institution is required',
                    pattern: {
                      value: /^[A-Za-z\s]{3,}$/,
                      message: 'Must be Characters & should not be less than 3'
                    }
                  })}
                  name="company"
                  onChange={handleChange}
                  placeholder=""
                  value={userData.institution} 
                  type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                {errors.institution && (<small className='text-red-500'>{errors.institution.message}</small>)}

                <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Institution</label>

              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  {...register('Post', {
                    required: 'Post is required',
                    pattern: {
                      value: /^[A-Za-z\s]{3,}$/,
                      message: 'Must be Characters & should not be less than 3'
                    }
                  })}
                  type="text" name="Post"
                  onChange={handleChange}

                  value={userData.type} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" type" required />

                <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>
                {errors.type && (<small className='text-red-500'>{errors.type.message}</small>)}

              </div>

              <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input type="date" name="join_date" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onChange={handleChange}
                    value={userData.join_date}

                    placeholder="" required />
                  <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Join_date</label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input type="date" name="Leave_date" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={handleChange}
                    value={userData.Leave_date}
                    placeholder=" " required />
                  <label for="Leave_date" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End_date</label>
                </div>
              </div>
              <div className="">

                <div className="relative z-0 mb-6 w-full group">
                  <textarea onChange={handleChange}
                    value={userData.aim}
                    placeholder=" " id="floating_company" name="aim" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" ></textarea>
                  {errors.aim && (<small className='text-red-700'>{errors.aim.message}</small>)}

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
            <h2 className="text-gray-600 font-semibold">Experience</h2>
            <span className="text-xs">data</span>
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
              <button className="bg-blue-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={Check}>Add New</button>
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Company
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Post 
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Joining Date
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Passing date
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Edit
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider " >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                {data.map((list, id) => {
                                return ( 
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                          {list.company}

                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{list.Post}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                      {list.join_date}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                      {list.Leave_date}       
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative cursor-pointer" onClick={() => {EditPopup(list.id)}}>Edit</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden
                          className="absolute inset-0 bg-red-500 opacity-50 rounded-full"></span>
                        <span className="relative" onClick={(e) => DeleteData(list.id)}>Delete</span>
                      </span>
                    </td>
                  </tr>
                     )
                    })}
                </tbody>
              </table>












              <div
                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    className="text-sm text-indigo-50 transition duration-150 hover:bg-blue-500 bg-blue-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button
                    className="text-sm text-indigo-50 transition duration-150 hover:bg-blue-500 bg-blue-600 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Experience
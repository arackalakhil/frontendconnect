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
import SelectionSlot from "./SelectionSlot";
import Appllicantlist from "./Appllicantlist";
const AddJob = () => {
    let { user } = useContext(AuthContext)
    const [popUp, setPopUp] = useState(false)
    const navigate = useNavigate();
    const [selection, setSelection] = useState(false)
    const [preloaddata, setPreloaddata] = useState(null)
    const [data, setData] = useState([])
    const [applicants, setApplicants] = useState(false)
    const [applicantdata, setApplicantdata] = useState([])
    const [edit, setEdit] = useState({})
    const [id,SetCompany]=useState("")
    const Swal = require("sweetalert2")
    const [compnayid, Setcompnayid] = useState("")
    const [editpopup, setEditpopup] = useState(false)
    const [userData, setUserData] = useState({
        heading: '',
        type: '',
        description: '',
        skill: '',
        skil2: '',
        skil3: '',
        creater: user.user_id,
        Company: compnayid
    })


    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        defaultValues: preloaddata
    });


    function Applicantlist(applicantdatas) {
        setApplicants(!applicants)
        setApplicantdata(applicantdatas)

    }

    function closeapplicantdata() {
        setApplicants(!applicants)

    }
    function Edipopup() {

        setEditpopup(!editpopup)
    }
    function AddPopup() {

        setPopUp(!popUp)
    }
    const handleChange = (e) => {
        setUserData({
            ...userData, [e.target.name]: e.target.value
        })
    }

    const token = JSON.parse(localStorage.getItem("authToken"))

    const Getjob = () => {
        axios.get("http://127.0.0.1:8000/recruiter/",
            {
                headers: {
                    Authorization: `Bearer ${token.access}`,
                    "content-type": "application/json"
                }

            }
        ).then((response) => {
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", response);
            const { data } = response
            setData(data)
            // const {Company} =response.data
            

            // console.log("22222222222222222222222222222222222222222222", data);
            console.log("/////////////////////////////////////////////////", data[0].Company);
             SetCompany( data[0].Company)


            Setcompnayid(data[0]?.Company?.id)
        })
    }

    console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", compnayid);


    useEffect(() => {
        Getjob()

    }, []);

    const handleeditChange = (e) => {
        setPreloaddata({
            ...preloaddata, [e.target.name]: e.target.value
        })
        console.log(userData)
    }

    function EditPopup(id) {
        setEdit(id)
        setEditpopup(!editpopup)

        {
            data.map((userdata, index) => {
                if (userdata.id === id) {
                    console.log(id);
                    console.log(userdata.id);
                    setPreloaddata(userdata)

                }

            })
        }

    }
    console.log("777777777777777777777777777777777777777777777", preloaddata);



    const Jobadd = async (e) => {
        // e.preventDefault()
        console.log("pppppppppppppppppppppppppppppppppppppppp", userData);
        // if(selection)

        // {
        await axios.post("http://127.0.0.1:8000/recruiter/", {

            heading: userData.heading,
            type: userData.type,
            skill: userData.skill,
            description: userData.description,
            skil2: userData.skil2,
            skil2: userData.skil2,
            creater: user.user_id,
            Company: compnayid,
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

                userData.institution = ""
                userData.type = ""
                userData.join_date = ""
                userData.Leave_date = ""
                userData.aim = ""
                // setSelection(!selection)
                // getEducation()
                Getjob()

                AddPopup(!popUp)
            }
        })
    }




    const UpdateJob = async (e) => {
        e.preventDefault()
        console.log("00000ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo00000000", preloaddata);

        await axios.put("http://127.0.0.1:8000/recruiter/", {
            id: preloaddata.id,
            heading: preloaddata.heading,
            type: preloaddata.type,
            skill: preloaddata.skill,
            description: preloaddata.description,
            skil2: preloaddata.skil2,
            skil2: preloaddata.skil2,
            creater: user.user_id,
            Company: compnayid
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

                preloaddata.institution = ""
                preloaddata.type = ""
                preloaddata.join_date = ""
                preloaddata.Leave_date = ""
                preloaddata.aim = ""
                preloaddata.id =""
                // setPopUp(!popUp)
                Edipopup()
                Getjob()

            }




        }).catch((error) => {

            const { data: { data } } = error.response
            console.log("responseerror.data", error);
            console.log("error", error.response);
            console.log("ddddddddddddddddddddddddddddddddddd", data);
        }


        )

    }








    const DeleteData = (id) => {


        Swal.fire({
            title: "are you sure",
            text: "remove the job ",
            icon: "warning",
            showCancelButton: "true",
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "YES,Approve",
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`http://127.0.0.1:8000/recruiter/deletejob/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token.access}`,
                        "content-type": "application/json"
                    }
                }

                ).then((response) => {
                    if (response.status === 200) {
                        console.log("DDDdddddddddd111111111111111111", response.status);
                        Getjob()

                    }
                    else {
                        console.log("Somthing is wrong")
                    }
                })
            }

        })

    }
















    return (
        <>
            <PopUP className="h-auto" onclose={AddPopup} open={popUp}>
                <div className="max-w-2xl mx-auto">


                    <form onSubmit={handleSubmit(Jobadd)}>

                        <div className="relative z-0 mb-6 w-full group">
                            <input
                                {...register('heading', {
                                    required: 'heading is required',
                                    pattern: {
                                        value: /^[A-Za-z\s]{3,}$/,
                                        message: 'Must be Characters & should not be less than 3'
                                    }
                                })}
                                name="heading"
                                onChange={handleChange}
                                placeholder=""
                                value={userData?.heading}
                                type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            {errors.heading && (<small className='text-red-500'>{errors.heading.message}</small>)}

                            <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Heading</label>

                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <textarea
                                // {...register('description', {
                                //     required: 'type is required',
                                //     pattern: {
                                //         value: /^[A-Za-z\s]$/,
                                //         message: 'Must be Characters & should not be less than 3'
                                //     }
                                // })}
                                type="text" name="description"
                                onChange={handleChange}

                                value={userData.description} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" type" required />

                            <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                            {/* {errors.description && (<small className='text-red-500'>{errors.description.message}</small>)} */}

                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            {/* //////////// */}


                            {/* <div className="flex justify-center"> */}

                        </div>
                        <div className="flex justify-center">
                            <div className="form-check form-check-inline">
                                <input onChange={handleChange} name="type" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineCheckbox1" value="Full time" required />
                                <label className="form-check-label inline-block text-gray-800" for="inlineCheckbox1">  Full time</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onChange={handleChange} name="type" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineCheckbox2" value="Part time" />
                                <label className="form-check-label inline-block text-gray-800" for="inlineCheckbox2"> Part time</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onChange={handleChange} name="type" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer " type="radio" id="inlineCheckbox3" value="Internship" />
                                <label className="form-check-label inline-block text-gray-800 opacity-50" for="inlineCheckbox3">Internship </label>
                            </div>
                        </div>

                        {/* </div> */}




                        {/* ///// */}



                        <div className="">

                            <div className="relative z-0 mb-6 w-full group">
                                <textarea onChange={handleChange}
                                    value={userData.skill}
                                    placeholder=" " id="floating_company" name="skill" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" ></textarea>
                                {errors.skill && (<small className='text-red-700'>{errors.skill.message}</small>)}

                                <label for="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Skill</label>
                            </div>
                        </div>
                        <div className="">

                            <div className="relative z-0 mb-6 w-full group">
                                <input onChange={handleChange}
                                    value={userData.skil2}
                                    placeholder=" " id="floating_company" name="skil2" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" ></input>
                                {errors.skil2 && (<small className='text-red-700'>{errors.skil2.message}</small>)}

                                <label for="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Skill</label>
                            </div>
                        </div>
                        <div className="">

                            <div className="relative z-0 mb-6 w-full group">
                                <input onChange={handleChange}
                                    value={userData.skil3}
                                    placeholder=" " id="floating_company" name="skil3" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" ></input>
                                {errors.skil3 && (<small className='text-red-700'>{errors.skil3.message}</small>)}

                                <label for="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Skill</label>
                            </div>
                        </div>
                       
                        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
                    </form>


                </div>

            </PopUP>
            <PopUP className="h-auto" onclose={Edipopup} open={editpopup}>
                <div className="max-w-2xl mx-auto">


                    <form onSubmit={(UpdateJob)}>

                        <div className="relative z-0 mb-6 w-full group">
                            <input

                                name="heading"
                                onChange={handleeditChange}
                                placeholder=""
                                value={preloaddata?.heading}
                                type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />

                            <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Heading</label>

                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <textarea

                                type="text" name="description"
                                onChange={handleeditChange}

                                value={preloaddata?.description} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" type" required />

                            <label for="floating_first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>

                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            {/* //////////// */}


                            {/* <div className="flex justify-center"> */}

                        </div>
                        <div className="flex justify-center">
                            <div className="form-check form-check-inline">
                                <input onChange={handleeditChange} name="type" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineCheckbox1" value="Full time" required />
                                <label className="form-check-label inline-block text-gray-800" for="inlineCheckbox1">Full time</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onChange={handleeditChange} name="type" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" id="inlineCheckbox2" value="Part time" />
                                <label className="form-check-label inline-block text-gray-800" for="inlineCheckbox2"> Part time</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onChange={handleeditChange} name="type" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer " type="radio" id="inlineCheckbox3" value="Internship" />
                                <label className="form-check-label inline-block text-gray-800 opacity-50" for="inlineCheckbox3">Internship </label>
                            </div>
                        </div>

                        {/* </div> */}




                        {/* ///// */}



                        <div className="">

                            <div className="relative z-0 mb-6 w-full group">
                                <textarea onChange={handleChange}
                                    value={preloaddata?.skill}
                                    placeholder=" " id="floating_company" name="skill" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" ></textarea>

                                <label for="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Skill</label>
                            </div>
                        </div>
                        <div className="">

                            <div className="relative z-0 mb-6 w-full group">
                                <input onChange={handleChange}
                                    value={preloaddata?.skil2}
                                    placeholder=" " id="floating_company" name="skil2" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" ></input>

                                <label for="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Skill</label>
                            </div>
                        </div>
                        <div className="">

                            <div className="relative z-0 mb-6 w-full group">
                                <input onChange={handleChange}
                                    value={preloaddata?.skil3}
                                    placeholder=" " id="floating_company" name="skil3" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" ></input>

                                <label for="floating_company" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Skill</label>
                            </div>
                        </div>
                       
                        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
                    </form>


                </div>

            </PopUP>
            <Appllicantlist open={applicants} className="h-auto" onclose={closeapplicantdata} appdata={applicantdata} />






            <div>
                <div className='flex mt-[70px]    px-5 '>
                    <h5 className="  text-white bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-500" onClick={AddPopup}>Add a Job</h5>
                </div>
                <div className='pt-[30px] ' >
                    <h1>  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pl-6 pr-4 w-full">

                        {data.map((list, id) => {
                            return (

                                <div className="flex flex-col bg-blue-50 p-4 rounded-xl">

                                    <div className="flex items-center justify-between pb-6">
                                        <span className="text-xs text-gray-400">{moment(list.created_on).format("MMM Do YY")}</span>
                                    </div>

                                    <div className="flex flex-col items-start justify-between gap-4 w-full">
                                        <div className="flex items-center justify-between w-full">
                                            <p className="text-2xl font-semibold truncate">{list.heading}</p>
                                            <span className="text-xs text-blue-500 font-semibold cursor-pointer " onClick={() => { Applicantlist(list.applicant) }} >{list.number_of_appicants}applied</span>
                                        </div>

                                        <div className="flex items-center justify-start gap-2 w-full">
                                            <label className="bg-purple-200 text-purple-500 px-2 py-1 text-xs rounded-2xl">{list.skil1}</label>
                                            <label className="bg-green-100 text-green-300 px-2 py-1 text-xs rounded-2xl">{list.skil2}</label>
                                            <label className="bg-blue-100 text-indigo-500 px-2 py-1 text-xs rounded-2xl">{list.skil3}</label>
                                        </div>

                                        <div>
                                            <h1 className="text-sm font-semibold">Web Developer</h1>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500 job-desc">
                                                {list.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            <p  className=" px-4 rounded-xl text-white py-3 inline-flex items-center justify-center bg-blue-500" onClick={() => { EditPopup(list.id) }}>Edit</p>
                                            <p className=" px-4 rounded-xl py-3 inline-flex items-center justify-center border border-gray-400 text-gray-500" onClick={(e) => DeleteData(list.id)}>Remove</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div></h1>
                </div>

            </div>

        </>

    )
}

export default AddJob

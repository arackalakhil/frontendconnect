import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import PopUP from "../componenets/PopUP";




const CompanySignup = () => {
	const [otpStatus, setotpStatus] = useState(false)
	const [otpValue, setOtpValue] = useState(new Array(4).fill(""))
	const [errorData, setErrorData] = useState([])
	const { Register, error } = useContext(AuthContext)
	const navigate = useNavigate();
	const Swal = require("sweetalert2")
	const { register, handleSubmit, getValues, formState: { errors } } = useForm()
	
	const [userData, setUserData] = useState({
		username: '',
		email: '',
		first_name: '',
		last_name: '',
		phone_number: '',
		password: '',
		password2: '',

	})
	const handleChange = (e) => {
		setUserData({
			...userData, [e.target.name]: e.target.value
		})
	}
	function addWindow() {
		setotpStatus(!otpStatus)
	}
	function closeSlot() {
		setotpStatus(!otpStatus)

	}
 

	const AddOtpvalue = (e,index) => {
		
		console.log("otpValue",otpValue);

		setOtpValue([...otpValue.map((dt,idx)=>(idx===index ? e.value :dt))]);
	}



	const otpverify = async (e) => {
		console.log('otpValue4444444444444444444444444444444444');
		console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",userData.email)
		console.log(otpValue);
		
		await axios.post("http://127.0.0.1:8000/accounts/verifyotp",
		{otpValue:otpValue,email:userData.email}).then((response)=>{
		
			
		if (response.status === 201) {
				Swal.fire({
					position: 'top',
					icon: 'success',
					title: 'Your work has been saved',
					showConfirmButton: false,
					timer: 1500

				})
				setotpStatus(!otpStatus)
				navigate("/")

			}

			else {
				Swal.fire({
					position: 'top',
					icon: 'Failed',
					title: 'otp dosent match',
					showConfirmButton: false,
					timer: 1500
				})
			}
		})
		
	}





	const onSubmitng = async (e) => {

		console.log('aaaaaaaaa');
		console.log(userData);

		await axios.post("http://127.0.0.1:8000/accounts/register", {
			username: userData.username,
			email: userData.email,
			first_name: userData.first_name,
			last_name: userData.last_name,
			phone_number: userData.phone_number,
			password: userData.password,
			password2: userData.password2,
		}).then((response) => {

			if (response.status === 202) {
				console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBB", response.status);
				setotpStatus(!otpStatus)



			}








			// if (response.status === 201) {
			// 	Swal.fire({
			// 		position: 'top',
			// 		icon: 'success',
			// 		title: 'Your work has been saved',
			// 		showConfirmButton: false,
			// 		timer: 1500

			// 	})
			// 	userData.username=""
			//  userData.email=""
			//  userData.first_name=""
			//  userData.last_name=""
			//  userData.phone_number=""
			//  userData.password=""
			//  userData.password2=""
			// 	navigate("/")

			// }
		// 	else {
		// 		Swal.fire({
		// 			position: 'top',
		// 			icon: 'Failed',
		// 			title: 'account not created',
		// 			showConfirmButton: false,
		// 			timer: 1500
		// 		})
		// 	}
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
			<PopUP onclose={closeSlot} open={otpStatus}>
				<div className="h-screen bg-blue-500 py-20 px-3">
					<div className="container mx-auto">
						<div className="max-w-sm mx-auto md:max-w-lg">
							<div className="w-full">
								<div className="bg-white h-64 py-3 rounded text-center">
									<h1 className="text-2xl font-bold">OTP Verification</h1>
									<div className="flex flex-col mt-4">
										<span>Enter the OTP you received at</span>
										<span className="font-bold">{userData.email}</span>
									</div>

									<div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
										{otpValue.map((data, index) => {

											return (
												<input className="m-2 border h-10 w-10 text-center form-control rounded" onChange={(e)=>{AddOtpvalue(e.target,index)}} type="text" id="first" maxlength="1" name="otp" value={data}  />
											)
										})
										}
									</div>

									<div className="flex  justify-center  mt-5">
										<a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer mr-5" ><span className="font-bold" onClick={onSubmitng}>Resend OTP</span><i className='bx bx-caret-right ml-1'></i></a>

										<a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer" ><span className="font-bold" onClick={otpverify}>submit</span><i className='bx bx-caret-right ml-1'></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</PopUP>


			<div className="container mx-auto">

				<div className="flex justify-center px-6 my-12">

					<div className="w-full xl:w-3/4 lg:w-11/12 flex">

						<div
							className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
							style={{ backgroundImage: `url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')` }} ></div>

						<div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
							<h3 className="pt-4 text-2xl text-center">Create a compnay Account!</h3>
							<form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit(onSubmitng)}>
								<div className="mb-4 md:flex md:justify-between">
									<div className="mb-4 md:mr-2 md:mb-0">

										<label className="block mb-2 text-sm font-bold text-gray-700" for="firstName">
											First Name
										</label>
										<input
											{...register('first_name', {
												required: 'Name is required',
												pattern: {
													value: /^[A-Za-z\s]{3,}$/,
													message: 'Must be Characters & should not be less than 3'
												},
											})}
											className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											name="first_name"
											type="text"
											onChange={handleChange}
											placeholder="First Name"
											value={userData.first_name}

										/>
										{errors.first_name && (<small className='text-red-500'>{errors.first_name.message}</small>)}


									</div>
									<div className="md:ml-2">
										<label className="block mb-2 text-sm font-bold text-gray-700" for="lastName">
											Last Name
										</label>
										<input
											{...register('last_name', {
												required: 'Name is required',
												pattern: {
													value: /^[A-Za-z\s]{3,}$/,
													message: 'Must be Characters & should not be less than 3'
												},
											})}
											className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											name="last_name"
											type="text"
											onChange={handleChange}
											value={userData.last_name}

											placeholder="Last Name"
										/>
										{errors.last_name && (<small className='text-red-500'>{errors.last_name.message}</small>)}

									</div>
								</div>
								<div className="mb-4">
									<label className="block mb-2 text-sm font-bold text-gray-700" for="email">
										Email
									</label>
									<input
										{...register('email', {
											required: 'Email required',
											pattern: {
												value: /^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{2,3}$/,
												message: 'Invalid email'
											}
										})}
										className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="email"
										type="email"
										onChange={handleChange}
										value={userData.email}

										placeholder="Email"
									/>
									{errors.email && (<small className='text-red-500'>{errors.email.message}</small>)}
									<small className='text-red-500'>{errorData.email}</small>
								</div>
								<div className="mb-4">
									<label className="block mb-2 text-sm font-bold text-gray-700" for="email">
										phone number
									</label>
									<input
										{...register('phone_number', {
											required: 'phone_number required',
											pattern: {
												value: /^\d{10}$/,
												message: 'Invalid phone_number'
											}
										})}
										className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
										name="phone_number"
										type="text"
										onChange={handleChange}
										value={userData.phone_number}

										placeholder="number"
									/>
									{errors.phone_number && (<small className='text-red-500'>{errors.phone_number.message}</small>)}
									<small className='text-red-500'>{errorData.phone_number}</small>

								</div>
								<div className="mb-4 md:flex md:justify-between">
									<div className="mb-4 md:mr-2 md:mb-0">
										<label className="block mb-2 text-sm font-bold text-gray-700" for="password">
											Username
										</label>
										<input
											{...register('username', {
												required: 'Name is required',
												pattern: {
													value: /^[A-Za-z\s]{3,}$/,
													message: 'Must be Characters & should not be less than 3',
												}
											})}
											className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											name="username"
											type="text"
											onChange={handleChange}
											value={userData.username}

											placeholder="username"
										/>
										{errors.username && (<small className='text-red-700'>{errors.username.message}</small>)}
										{<small className='text-red-500'>{errorData.username}</small>}


									</div>
									<div className="md:ml-2">
										<label className="block mb-2 text-sm font-bold text-gray-700" for="c_password">
											Password
										</label>
										<input
											{...register('password', {
												required: 'password is required',


											})}
											className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											name="password"
											type="password"
											onChange={handleChange}

											value={userData.password}

											placeholder="******************"
										/>
										{errors.password && (<small className='text-red-700'>{errors.password.message}</small>)}

									</div>
									<div className="md:ml-2">
										<label className="block mb-2 text-sm font-bold text-gray-700" for="c_password">
											Password2
										</label>
										<input
											{...register('password2', {
												required: 'password2 is required',
												validate: (value) => {
													const { password } = getValues()
													return password === value || "password should match"


												}
											})}
											className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											name="password2"
											type="password"

											onChange={handleChange}
											value={userData.password2}

											placeholder="******************"
										/>
										{errors.password2 && (<small className='text-red-700'>{errors.password2.message}</small>)}

									</div>
								</div>
								<div className="mb-6 text-center">
									<button
										className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"

									>
										Register Account
									</button>
								</div>
								<hr className="mb-6 border-t" />
								<div className="text-center">
									<a
										className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
										href="#"
									>

									</a>
								</div>
								<div className="text-center" >
									<a
										className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
										onClick={() => navigate('/login')}
									>
										Already have an account? Login!
									</a>
								</div>
							</form>
						</div>
					</div>
				</div>

			</div>
		</>
	);
};
export default CompanySignup;

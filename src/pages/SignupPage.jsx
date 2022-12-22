import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import PopUP from "../componenets/PopUP";
import Freepopup from "../componenets/Freepopup";
import SelectionSlot from "../componenets/SelectionSlot";


const SignupPage = () => {
	const [otpStatus, setotpStatus] = useState(false)
	const [otpValue, setOtpValue] = useState(new Array(4).fill(""))
	const [errorData, setErrorData] = useState([])
	const { Register, error } = useContext(AuthContext)
	const [showModal, setShowModal] = useState(true)
	const [recruiter,setRecuter]=useState(false)

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
	function Modalclose() {
		setShowModal(!showModal)
	}
function Modalclose1  (){
	setShowModal(!showModal)
	setRecuter(true)
	console.log("fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",recruiter);

}

	const AddOtpvalue = (e, index) => {

		console.log("otpValue", otpValue);

		setOtpValue([...otpValue.map((dt, idx) => (idx === index ? e.value : dt))]);
	}



	const otpverify = async (e) => {

		console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", userData.email)
		console.log(otpValue);
		const email_otp = otpValue.join('')
		console.log(email_otp)
		console.log('otpValue4444444444444444444444444444444444');
		await axios.post("http://127.0.0.1:8000/accounts/verifyotp",
			{ email_otp: email_otp, email: userData.email }).then((response) => {


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

		console.log('aaaaaaaaa',recruiter);
		console.log(userData);

		await axios.post("http://127.0.0.1:8000/accounts/register", {
			username: userData.username,
			email: userData.email,
			first_name: userData.first_name,
			last_name: userData.last_name,
			phone_number: userData.phone_number,
			password: userData.password,
			password2: userData.password2,
			is_recruiter:recruiter
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
			<Freepopup  open={otpStatus}>
				<div className="h-auto  ">
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
												<input className="m-2 border h-10 w-10 text-center form-control rounded" onChange={(e) => { AddOtpvalue(e.target, index) }} type="text" id="first" maxlength="1" name="otp" value={data} />
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
			</Freepopup>
			<SelectionSlot open={showModal}>



				<div className="">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="sm:text-center">
						<img className="mx-auto h-12 w-auto" src="https://cdn1.iconfinder.com/data/icons/bokbokstars-121-classic-stock-icons-1/512/Network.png" alt="logo" />

							<h1 className="text-lg font-bold leading-8 text-blue-500 italic">Con-Net</h1>
							<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Connect <span className=" text-blue-500" >&</span> Create</p>
						</div>

						<div className="mt-10 max-w-lg sm:mx-auto md:max-w-none">
							<div className="grid grid-cols-1 gap-y-16 md:grid-cols-2  md:gap-y-16">
								<div className="relative flex flex-col sm:flex-row md:flex-col lg:flex-row">

									<div className="sm:min-w-0 sm:flex-1">
										<p className="text-lg font-bold leading-8 text-gray-900 mr-1 w-fit ml-auto">I am a Job Seeker</p>
										<div className="ml-auto w-fit">
											<button class="bg-blue-500 mr-8 hover:bg-blue-700 text-white font-bold  border p-2 ml-auto w-fit border-blue-700 rounded" onClick={Modalclose}>
											Seeker
											</button>
										</div>
										</div>
									<div className="bg-gray-300 w-0.5">

									</div>
								</div>

								<div className="relative flex flex-col  sm:flex-row md:flex-col lg:flex-row">

									<div className="sm:min-w-0 sm:flex-1">
										<p className="text-lg font-bold leading-8 text-gray-900 md:ml-8">I am Job Provider</p>
										<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold  border p-2 md:mx-9 border-blue-700 rounded" onClick={Modalclose1}>
											Recuter
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					

						<p className="pt-5 flex justify-center text-[15px] italic ">The chosen post is irreversible.</p>
					
				</div>





			</SelectionSlot>

			<div className="container mx-auto">

				<div className="flex justify-center px-6 my-12">

					<div className="w-full xl:w-3/4 lg:w-11/12 flex">

						<div
							className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
							style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80')` }} ></div>

						<div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
							
					
							<h3 className="pt-4 text-2xl text-center">Create an Account {recruiter ?<span> recruiter!</span>:<span> user!</span>} </h3>
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
export default SignupPage;

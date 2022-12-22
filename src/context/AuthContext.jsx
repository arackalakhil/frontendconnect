import { createContext, useEffect, useState, } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom";
import axios from "axios"
const AuthContext = createContext()



export default AuthContext

const token = JSON.parse(localStorage.getItem("authToken"))

export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null)
    const [admin, setAdmin] = useState(
        localStorage.getItem("authToken")
            ? jwt_decode(localStorage.getItem("authToken"))
            : null
    );
    let [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const [error, setError] = useState(false)
    const Swal = require("sweetalert2")

    let loginUser = async (e) => {
        e.preventDefault()
        console.log("form submitted");
        console.log(e.target.username.value);
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, "password": e.target.password.value })
        })
        let data = await response.json()
        console.log("data", data);
        if (response.status === 200) {

            setAuthTokens(data)
            

            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
           
            navigate('/jobs')

        } else {
            alert("ENTER CORRECT DATA")
        }
    }
    let logoutUser = () => {
        Swal.fire({
            title: "do you want to log out",
            text: "log out ",
            icon: "warning",
            showCancelButton: "true",
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "YES",
        }).then((result) => {
            if (result.isConfirmed) {
                setAuthTokens(null)
                setUser(null)
                localStorage.removeItem("authToken")
                console.log("log out sucess")
                console.log(authTokens)
                console.log(user)
                navigate('/login')
            }
        })
    }
    let updateToken = async () => {
        let responce = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ 'refersh': authTokens?.refersh })
        })
        let data = await responce.json()
        if (responce.status === 200) {

            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
        } else {
            console.log('ttttttttttttttt',responce.status);

            logoutUser()
        }
    };

    // register
    // const Register = async (e) => {
        // e.preventDefault();
        // if(e.target.password.value !=e.target.password2.value)
        // {
        //     setError(true)
        //     return
        //     navigate('/login')
        // }
        // if(e.target.first_name.value.length<=3){
        //     setError(true)
        // return
        // navigate('/login')
        // }
    //     const response = await fetch("http://127.0.0.1:8000/accounts/register", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             first_name: e.target.first_name.value,
    //             last_name: e.target.last_name.value,
    //             email: e.target.email.value,
    //             username: e.target.username.value,
    //             password: e.target.password.value,
    //             password2: e.target.password.value,

    //         }),
    //     });
    //     const data = await response.json();
    //     console.log(data);
    //     console.log(response);
    //     if (response.status === 201) {
    //         navigate("/login");
    //         alert("Account created successfully");
    //     } else {
    //         alert("Please try again!");
    //     }
    // };
    /////////////////////////// form fill ///////////////////////////////////////////

    // const booking=async(e)=>{

    //     e.preventDefault()
    //     console.log(e.target.fullname.value)
    //     console.log(e.target.phone.value)
    //     console.log(e.target.company_name.value)
    //     console.log(e.target.city.value)

    //     console.log(e.target.state.value)
    //     console.log(e.target.email.value)
    //     console.log(e.target.address.value)



    //     const response =await fetch("http://127.0.0.1:8000/api/booking",{
    //         method:"POST",
    //         headers:{
    //             "Content-Type":"application/json",
    //             // "Authorization":`Bearer ${token.access}`
    //         },

    //         body:JSON.stringify({  "fullname":e.target.fullname.value,
    //             "phone":e.target.phone.value,
    //             "company_name":e.target.company_name.value,
    //             "city":e.target.city.value,
    //             "state":e.target.state.value,   
    //             "email":e.target.email.value,
    //             "address":e.target.address.value,
    //             "image":e.target.files[0]
    //             })

    //     }
    //     )


    //     if (response.status===200)
    //     {
    //         alert("Form submitted sucessfully")
    //         e.target.fullname.value = (" ")
    //         e.target.company_name.value= (" ")
    //         e.target.city.value= (" ")
    //         e.target.phone.value= (" ")
    //         e.target.email.value= (" ")
    //         e.target.address.value= (" ")
    //         e.target.state.value= (" ")

    //     }
    //     else{
    //         alert("Please try again!"

    //         )
    //     }


    // }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const fileUpload = (e) => {
        let file = e.target.files[0]


    }


    // const booking = (e) => {
    //     e.preventDefault()
    //     console.log("Ssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
    //     console.log(e.target.fullname.value)
    //     console.log(e.target.phone.value)
    //     console.log(e.target.company_name.value)
    //     console.log(e.target.city.value)

    //     console.log(e.target.state.value)
    //     console.log(e.target.email.value)
    //     console.log(e.target.file[0])
    //     axios
    //         .post("http://127.0.0.1:8000//api/booking", {
    //             Authorization:`Bearer ${token.access}`,
    //             fullname: e.target.fullname.value,
    //             phone: e.target.phone.value,
    //             company_name: e.target.company_name.value,
    //             city: e.target.city.value,
    //             state: e.target.state.value,
    //             email: e.target.email.value,
    //             address: e.target.address.value,
    //             image: e.target.file[0]
    //         })
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 alert("Form submitted sucessfully")
    //                 e.target.fullname.value = (" ")
    //                 e.target.company_name.value = (" ")
    //                 e.target.city.value = (" ")
    //                 e.target.phone.value = (" ")
    //                 e.target.email.value = (" ")
    //                 e.target.address.value = (" ")
    //                 e.target.state.value = (" ")

    //             }
    //             else {
    //                 alert("Please try again!" )
    //             }
    //         });
    // };

































    //loginadmin

    const AdminLogins = async (e) => {
        e.preventDefault()
        console.log(e.target.username.value);
        let response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value,
            }),

        })
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data);
            setAdmin(jwt_decode(data.access));
            console.log(admin, "ggggggggggggggggggggggggggggggggggggggg");
            localStorage.setItem("authToken", JSON.stringify(data));
            if (admin.is_superadmin) {
                console.log("pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp");

                navigate('/adminHome/application')
            }
            else {
                Swal.fire(
                    'error', 'only admin can login'
                )
                console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");

            }
        }

        else {
            Swal.fire(
                'error', 'check data'
            )
        }
    }

    const AdminLogOut = () => {
        Swal.fire({
            title: "do you want to log out",
            text: "log out ",
            icon: "warning",
            showCancelButton: "true",
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "YES,Approve",
        }).then((result) => {
            if (result.isConfirmed) {

                setAuthTokens(null);
                setAdmin(null);
                localStorage.removeItem("authToken");
                console.clear();
                navigate("/adminLogin");
            }
        })
    }








    /////////////////////////////////////////////////////////////

   
    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        // Register: Register,
        // booking: booking,
        AdminLogins: AdminLogins,
        AdminLogOut: AdminLogOut,
        // fileUpload:fileUpload
        authTokens: authTokens,
        error: error,

    }
    useEffect(() => {
        console.log('qweqweqwe');
        let three = 1000 * 60 * 40
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, three, [])
        return () => clearInterval(interval)

    }, [authTokens, loading])
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

    //////////////////////////////////////////////////////////////////////////////////////

}









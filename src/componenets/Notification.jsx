import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { fadeIn } from 'react-animations'
import 'animate.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notify from "./Notify";


function Notification() {
  const socketRef = useRef()
  const [count, setCount] = useState(0)

  const [data, setData] = useState([])
  const [some, setsome] = useState(false)
  const [open,setOpen] =useState(false)
  let { user } = useContext(AuthContext)
  const id = user.user_id
  let akhil ;
  const Swal = require("sweetalert2")

  const token = JSON.parse(localStorage.getItem("authToken"))

  const getnotifications = (e) => {
    axios.get("http://127.0.0.1:8000/accounts/notifications",
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
          "content-type": "application/json"
        }

      }).then((response) => {
        // console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd", response);
        const { data } = response
        setData(data)
        console.log("55555555",data)
        console.log("fffffffffffffffffffffffffffffffffffffffffff", data[0]?.count);
        setCount(data[0].count)

      })
  }

  
  useEffect(() => {
    getnotifications()
    socketRef.current = new WebSocket('ws://127.0.0.1:8000/ws/socket-servers/' + id + '/')
    socketRef.current.onopen = e => {
      console.log("socket  open", e);
    }
    
  }, []);
  const Updatenotification = (e) => {
    axios.put("http://127.0.0.1:8000/accounts/notifications",
      {

        headers: {
          Authorization: `Bearer ${token.access}`,
          "content-type": "application/json"
        }

      }).then((response) => {
        // console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd", response);
        // const { data } = response
        // setData(data)
        // console.log("55555555",data)
        // console.log("fffffffffffffffffffffffffffffffffffffffffff", data[0]?.count);
        // setCount(data[0].count)
        getnotifications()

      })
  }


  useEffect(() => {
    // getnotifications()
    

    socketRef.current.onmessage = e => {
      console.log("socket   message", e);
  
      console.log("socket   message", e?.data);
      akhil = JSON.parse(e?.data)
      console.log("socket   length", akhil);
      console.log("socket   length", akhil?.payload[0]?.notification);
      setsome(!some)
      noti(akhil)
      console.log(akhil,"88888888888888888888888888888888888");
      setCount(akhil?.payload[0]?.count)
      getnotifications()
     

    }
   


    // socketRef.current.onerror = e => {
    //   // console.log("socket   errot",e);
    // }

  }, [akhil]);
 
  const noti = (akhil) =>{

    notify(akhil?.payload[0]?.notification)
    
  }
 
  const notify = async (a) => toast(`🦄 ${a}`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


function notificate(){
console.log("ghfhftgrftgrft");
  getnotifications()
  setOpen(!open)
  
}

console.log("sssssssssssssssssss",open);

  return (
    <>

      {/* <ToastContainer
        position="top-right"
        autoClose={8001}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      /> */}
      
      <div className="m-2">


        <div className="inline-flex relative w-fit">
          <div className="absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 h-6 w-6 pt-[4px] text-xs bg-green-300 rounded-full z-100  text-center text-white overflow-x-hidden">{count}</div>
         
        {count != 0 && open&&

          <div className="absolute  top-1 left-16    "><Notify props={data}/></div>
        }
          
          
          
          <div className="px-2 py-2 bg-blue-500 flex items-center justify-center text-center rounded-lg shadow-lg" onClick={notificate}>
            <div>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" className="mx-auto text-white w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z" ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Notification

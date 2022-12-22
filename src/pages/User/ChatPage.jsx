import Header from "../Header"
import { useState } from "react"
import AuthContext from "../../context/AuthContext"
import { useContext } from "react"
import Axios from "axios"
import { useEffect } from "react"
import ChatList from "../../componenets/ChatList"
import Chat from "../../componenets/Chat"
import { useRef } from "react"
import {useParams} from 'react-router-dom'
const baseUrl = "http://127.0.0.1:8000/"
function ChatPage() {
    let {user, authTokens} = useContext(AuthContext)
    const [userChatList,setUserChatList] = useState([])
    const [username, setUsername] =useState() 
    const [image, setImage] =useState() 

    const [id, setId] = useState()
    const [onMessage, setOnMessage] = useState()
    const [chatMessage, setChatMessage] = useState([])
    const scrollRef =useRef(null)
    const myid = user.user_id
    const {otherid,otherusername} = useParams()

  const socket = new WebSocket('ws://127.0.0.1:8000/ws/'+myid+'/'+id+'/')


  socket.onopen = function(e){
    console.log('Connection Established',e);
  }

  socket.onclose = function(e){
    console.log('Connection lost');
  }

  socket.onerror = function(e){
    console.log('Error',e);
  }

  socket.onmessage = function(e){
    console.log('message',e);
    const data = JSON.parse(e.data)
    setOnMessage(data)
    chatData(username)
    getChatlist()
  }
// useEffect(()=>{
// scrollRef.current?.scrollIntoView({behavior:"smooth"})

// console.log("Dddddddddddddddddddddddddddddddddddddddddddd");
// },[chatMessage])
  

//To call the total numbers of chat users list.
useEffect(()=>{
    getChatlist()
},[])

const getChatlist =()=>{Axios.get(baseUrl+'chat/chat-list',{
  headers:{
    Authorization:`Bearer ${authTokens.access}`
  }
}).then((res)=>{
  console.log('resultsssssssssss',res.data);
  setUserChatList(res.data)
})
}

  useEffect(()=>{
    if (otherid!=='' && otherusername!=='') {
        console.log('here is message id',otherid,otherusername);
        // setId(id)
        // setUsername(username)
        get_id(otherid,otherusername)
    }
    // getUserChatList(baseUrl)
  },[])

   //to get the username and id of the person the logged in user want to chat.
   const get_id = (id,username,image)=>{
    console.log('other id is',id,username);
    setId(id)
    setUsername(username)
    chatData(username)
    setImage(image)
  }

  const get_message = (message,msg_username)=>{
    console.log('message',message,msg_username);
    // socket.onmessage = JSON.parse(message)
    socket.send(JSON.stringify({
      'message':message,
      'username':msg_username, //sender name
      'reciever_user':username
  }))
}

  //to get the chat data of the loggedin user and other person.
  const chatData = (username)=>{
    // console.log('hhhhhh',username);
    Axios.get(baseUrl+'chat/chat-data/'+username,{
      headers:{
        Authorization:`Bearer ${authTokens.access}`
      }
    }).then((res)=>{
      console.log('chat data',res.data);
      setChatMessage(res.data)
    })
  }


  return (
    <div className="mt-[71px] overflow-y-hidden ">

    <div className='flex '>
        <div className='w-3/12'>
        <ChatList userChatList={userChatList} get_id={get_id} ></ChatList>
        
        </div>

        <div ref={scrollRef} className='w-9/12'>
        <Chat chatMessage={chatMessage} get_message={get_message} username={username} image={image} ></Chat>
        </div>
    </div>
  

    </div>
  )
}

export default ChatPage
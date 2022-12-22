import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
import { format, render, cancel, register } from 'timeago.js';
import { useEffect } from "react";

function Chat({chatMessage,get_message,username,image}) {
    let {user} = useContext(AuthContext)
    const [message,setMessage] = useState([])
console.log("chatMessagessssss",chatMessage);
console.log("username",username);
console.log("iddddddddddddddddddd",user.user_id);
console.log("imagimageimageimageimageimagee",image);


    return (

        <div>
            
          <body class="flex flex-col  h-[90vh] bg-blue-50 text-gray-800 p-5">
          { username ?<>
            <div class="flex h-6 w-6 rounded-full bg-gray-300 mb-3"> <img className="rounded-full inline-block w-fit h-fit " src={image} alt="" /><h1 className="text-lg pl-2">{username?.toUpperCase()}</h1></div>
       
            <div class="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">

              <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
                {chatMessage?.map((chat)=>{
                  return(
                    <>
                    {chat?.sender !==user?.user_id? 
                    <div class="flex w-full mt-2 space-x-3 max-w-xs">
                      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                        {/* <img src={image} alt="" /> */}
                      </div>
                      <div>
                        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                          <p class="text-sm">
                           {chat?.message}
                          </p>
                        </div>
                        <span class="text-xs text-gray-500 leading-none">
                          {format(chat?.timestamp)}
                        </span>
                      </div>
                    </div> :
                    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        
                        <div>
                          <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                            <p class="text-sm">
                            {chat?.message}
                            </p>
                          </div>
                          <span class="text-xs text-gray-500 leading-none">
                          {format(chat?.timestamp)}
                          </span>
                        </div>
                        <div class="flex-shrink-0 h-6 w-6 rounded-full bg-gray-300"> <img className="rounded-full w-fit h-fit " src={image} alt="" /></div>
                      </div>
                      }
                      </>
                )
                })}
                
               
    
    
    
    
    
    
    
                
              </div>
    
    
    
    
    
    
    
    
              <div class="bg-gray-300 p-4 flex">
                <input
                // value={message}
                  class="flex items-center h-10 w-full rounded px-3 text-sm"
                  type="search"
                  placeholder="Type your message…"
                  onChange={(e) =>  setMessage(e?.target?.value)}
                />
                <button
                 onClick={()=>get_message(message,user.username)}
                 className="px-2 bg-blue-700 hover:bg-blue-900 rounded-r font-semibold text-cyan-50 hover:text-white"
                 type="submit">
                  Send
                </button>
              </div>
            </div>
            </>:<>
             {/* <img className="rounded-full inline-block w-5/12 mx-auto " src="https://cdn.dribbble.com/users/5328231/screenshots/19039841/media/47a4dff91094b30b580d32488690e6fb.mp4" alt="" /> */}
             <video loop="true" autoplay="autoplay" controls="controls" id="vid" muted>
  <source src="https://cdn.dribbble.com/users/5328231/screenshots/19039841/media/47a4dff91094b30b580d32488690e6fb.mp4" type="video/mp4"/>

</video></>}

          </body>
        </div>
      );
}

export default Chat;
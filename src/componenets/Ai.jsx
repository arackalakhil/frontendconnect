import React, { useState } from 'react'
import axios from 'axios'
const Ai = () => {
  const [question, setQuestion] = useState("")
  const [lastquestion,setLastquestion]=useState()
  const [answer, setAnswer] = useState("")
  const [load,setLoad]=useState(false)
  const token = JSON.parse(localStorage.getItem("authToken"))

  console.log("question", question);

  const Getanswer = () => {
    setLoad(true)
    setQuestion(lastquestion)
    axios.post("http://127.0.0.1:8000/chat/answer",

      {
        question: lastquestion
      },
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
          // "content-type": "application/json"
        }

      }
    ).then((response) => {
      console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd", response);
      const { data } = response
      setAnswer(data?.response)
      setLoad(false)
      console.log("fffffffffffffffffffffffffffffffffffffffffff", data.response);
    })
  }
  return (
    <>
      <div className="flex-1 mt-11  p:2 sm:p-6 sm:mt-0  flex flex-col h-screen">
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <span className="absolute text-green-500 right-0 bottom-0">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
              <img className='w-20 h-fit pt-10 rounded' src="https://cdn.dribbble.com/users/537078/screenshots/16327422/media/0a3c62694156e98f04f6c6efd9919aa7.gif" />
            </div>
            <div className="flex flex-col sm:mt-7 leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3 font-extrabold font-mono">Chitti</span>
              </div>
              <span className="text-lg text-gray-600 font-serif">Ask me anything</span>
            </div>
          </div>

        </div >
        <div className='h-[68vh] sm:h-[70vh] md:h-[80vh] overflow-y-scroll'>
          {question &&
            <>

              <div id="messages" className="flex flex-col  p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                <div className="chat-message">
                  <div className="flex items-end">
                    <div className="">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-400 text-black-600 text-3xl ">{question}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </>

          }
          {answer &&
            <>
              <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                <div className="chat-message">
                  <div className="flex items-end">

                    <div className="overflow-y-auto">
                      <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none  text-black-600 text-3xl">{answer}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </>

}
</div>
        <div className="border-t-2 border-gray-200 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            
            <input type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3" onChange={(e) => { setLastquestion(e.target.value) }} />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">

              <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none" onClick={Getanswer}>
                <span className="font-bold">Send</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Ai
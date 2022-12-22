import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Alldataprofile from './Alldataprofile'

const style = {
    position: 'fixed',
    top: '10%',
    left: '30%',
    right: '30%',
    bottom: '30%',
    transform: 'transilate(-50%,-50%)',
    backgroundColor: '#ededed',
    padding: '30px',
    zIndex: 1000,
    height: "fit-content"

}

const overLay = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(2,0,0,.5)',
    zIndex: 1000

}




const Appllicantlist = ({ children, open, onclose, edit, appdata }) => {

    const [modal, setModal] = useState(false)
    const [id, setUserId]=useState({})
    function Findone(id){
        setModal(!modal)
        setUserId(id)
        
    }
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", appdata);
    if (open) {
        return (
            <>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 overflow-auto ">
                <div className="flex flex-col">
                    <div style={overLay} className='overflow-y-scroll hide-scrollbar'>
                <Alldataprofile open={modal} className="h-auto" onclose={Findone} id={id} />

                        <button className='cursor-pointer absolute  rounded top-[10px] right-[10px] style={style}' onClick={onclose}>X</button>
                        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8 ">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center">
                                    <thead className="border-b bg-blue-500">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                id
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                Name
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                email
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                username
                                            </th>
                                        </tr>
                                    </thead >
                                    {appdata.map((list, id) => {
                                        return (

                                            <tbody>
                                                <tr className="bg-white border-b">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-serif text-gray-900">{id + 1}</td>
                                                    <td className="text-sm hover:text-blue-700  text-blue-500  font-light px-6 py-4 whitespace-nowrap">
                                                        <span className='cursor-pointer' onClick={()=>{Findone(list.id)}}>{list.first_name + list.last_name}</span>
                                                    </td>
                                                    
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {list.email}
                                                    </td>
                                                    <td className="text-sm font-light  text-gray-900 px-6 py-4 whitespace-nowrap" >
                                                        <span className=' ' >{list.username}</span>
                                                    </td>
                                                </tr >


                                            </tbody>
                                        )
                                    })}
                                </table>
                            </div>
                        </div>
                    </div>








                </div>
            </div>
            </> )
    } else {
        return (null)
    }

}



export default Appllicantlist
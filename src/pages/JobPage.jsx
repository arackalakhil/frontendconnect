import React from 'react'
import { useContext } from 'react';
import AddJob from '../componenets/AddJob';
import Jobsearch from '../componenets/Jobsearch';
import AuthContext from "../context/AuthContext";

const JobPage = () => {
    let { user } = useContext(AuthContext)
console.log(user);
console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",user.is_recruiter);

    return (
        <div>
            { user.is_recruiter ? <AddJob/> : <div><Jobsearch /></div>}
        </div>


    )
}

export default JobPage

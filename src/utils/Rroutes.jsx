import { useContext } from "react";
import { Route,Redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Rroute =({children})=>{
    const {user} = useContext(AuthContext)
    if(user.is_recruiter){
        return children
    }
    
    return <Navigate to='/settings/experience'/>

}
export default Rroute
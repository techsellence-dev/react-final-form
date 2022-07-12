import React from "react";
import { Navigate } from "react-router-dom";

const Protected =() =>{
   
    const token=localStorage.getItem("token")

    if(!token){
        return <Navigate to="/" replace/>
    }
}

export default Protected
import React,{useState,useEffect} from 'react'
import { Route, Navigate } from 'react-router-dom'
import { Cookies } from 'react-cookie';
const ProtectedRoutes = ({ children }) => {
  
    const auth = ()=>{
         const cookies = new Cookies();
         if(cookies.get("accessToken")){
            return true;
        }
        return false;
    };
  
    return auth() ? <>{children}</> : <Navigate to="/signup" />;
 
  
};

export default ProtectedRoutes
import React, { useEffect, useState } from 'react'
import { LoginContext } from './LoginContext';
import axios from 'axios';

function LoginContextProvider({children}) {

    let [login,setLogin]=useState(false);
    let [user,setUser]=useState(null);
    let [loading,setLoading]=useState(true);
    let [role,setRole]=useState(null);

    useEffect(()=>{
        const verifyUser=async()=>{
          const token=localStorage.getItem('token');
          if(!token){
            setLoading(false);
            return;
          }
          try{
            const res = await axios.get(
  `${import.meta.env.VITE_BACKEND_URL}/api/verify`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

          console.log("response from verify",res);
            
            if (res.status===200){
              setLogin(true);
              setUser(res.data.username);
              setRole(res.data.role);

            }
            else{
              setLogin(false);
              setUser(null);
              setRole(null);
              localStorage.removeItem('token');
            }
            }
        
        catch(err){
          setLogin(false);
        setUser(null);
        setRole(null);
        localStorage.removeItem('token');

        }
      
    };  verifyUser();} ,[])
  return (
    <LoginContext.Provider value={{login,setLogin,user,setUser,role,setRole}}>
        {children}
        </LoginContext.Provider>
  )
}

export default LoginContextProvider;
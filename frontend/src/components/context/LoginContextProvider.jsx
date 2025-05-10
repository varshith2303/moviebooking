import React, { useState } from 'react'
import { LoginContext } from './LoginContext'

function LoginContextProvider({children}) {

    let [login,setLogin]=useState(false);
    let [user,setUser]=useState(null);
  return (
    <LoginContext.Provider value={{login,setLogin,user,setUser}}>
        {children}
        </LoginContext.Provider>
  )
}

export default LoginContextProvider;
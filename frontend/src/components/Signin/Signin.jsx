    import React, { useContext } from 'react';
    import { useState } from 'react';
    import {useForm} from 'react-hook-form';
    import { LoginContext } from '../context/LoginContext';
    import axios from 'axios';
    import { useEffect } from "react";
    import { useNavigate } from 'react-router-dom';




    function Signin() {
        
    let {
        register,
        handleSubmit,
        formState:{errors}

    }=useForm();

    let {login,setLogin,user,setUser}=useContext(LoginContext);

    let [err,setErr]=useState('');

    let navigate=useNavigate();

    useEffect(() => {
        console.log("Updated Login status: ", login);
        console.log("Updated User is: ", user);
    }, [login]); // Runs whenever `login` or `user` changes


    async function onSubmit(userObj){
        console.log(userObj);
        if (userObj.role==='user' || userObj.role==='manager' ){
        let res=await axios.post('/user-api/login',userObj);

        console.log("Response is",res);
        if(res.data.message==='login success'){
        setLogin(true);
        setUser(res.data.user.username);
        console.log("Login status ",login);
        console.log("User is",user);
        if(userObj.role==='user'){
            alert("Login successful!")
            navigate('/userprofile');
            localStorage.setItem("token",res.data.token)    
        }
        else{
            console.log(res);
          localStorage.setItem("token",res.data.token)  
          console.log("Stored Manager ID:", localStorage.getItem("managerId"));
          alert("Login successful!");
            navigate('/managerprofile');
        }

        }
        }
        else{
            let res=await axios.post('/admin-api/login',userObj);
            console.log(res);
            
            if(res.data.message==='login success'){
                setLogin(true);
            setUser(res.data.user.username);
            console.log("Login status ",login);
            console.log("User is",user);
                localStorage.setItem("token",res.data.token)
                navigate('/adminprofile')
            }
            else{
                alert(res.data.message);
            }
        }





    }
    return (
        <div className='container d-flex justify-content-center  vh-100 align-items-center bg-light'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-50 mx-auto shadow-lg rounded-3 p-4     '>
                <div className='d-flex' >
                    <label htmlFor='user' className='form-check-label me-3'>Register as</label>

                <div className='form-check form-check-inline' >
                    <input type='radio' className='form-check-input' id='user' value='user' {...register("role",{disabled:false})}/>
                    <label htmlFor='user' className='form-check-label'>User</label>
                </div>

                <div className='form-check form-check-inline'>
                    <input type='radio' className='form-check-input' id='manager' value='manager'{...register("role",{disabled:false})}/>

                    <label htmlFor='manager' className='form-check-label'>Manager</label>


                </div>

                <div className='form-check-inline'>
                    <input type='radio' className='form-check-input' id='admin' value='admin' {...register("role",{disabled:false})}>
                    </input>
                    <label htmlFor='admin' className='form-check-label' >Admin</label>
                </div>

                <div>
                    
                </div>
                </div>

                <div>
                    <input type='text' className='form-control mt-3' id='username' placeholder='Username' {...register("username",{required:true})}
                    ></input>
                </div>
                <input type='email' className='form-control mt-3  ' placeholder='Email' {...register("email")}></input>
                <div>
                    <input type='password' className='form-control mt-3 ' placeholder='Password' {...register("password")}></input>
                </div>
                <button type='submit' className='btn btn-success mt-3 mx-auto d-block '>Submit</button>



            </form>

        </div>
    )
    }

    export default Signin;
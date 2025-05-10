import React from 'react';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import axios from "axios";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';





function Signup() {
    
let {
    register,
    handleSubmit,
    formState:{errors}

}=useForm();

let navigate=useNavigate();

let [err,setErr]=useState('');

async function onSubmit(userObj){
    console.log(userObj);
    const res=await axios.post('/user-api/user',userObj);
    console.log(res);
    if(res.data.message=== 'New User created'){
        navigate('/signin');
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
    

            <div>
                
            </div>
            </div>

            <div>
                <input type='text' className='form-control mt-3' id='username' placeholder='Username' {...register("username",{required:true})}
                ></input>
            </div>
            <input type='email' className='form-control mt-3 border-primary ' placeholder='Email' {...register("email")}></input>
            <div>
                <input type='password' className='form-control mt-3 ' placeholder='Password' {...register("password")}></input>
            </div>
            <button type='submit' className='btn btn-success mt-3 mx-auto d-block '>Register</button>



        </form>

    </div>
  )
}

export default Signup;
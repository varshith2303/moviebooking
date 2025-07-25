import React from 'react';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import axios from "axios";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';





function AddManager() {
    
let {
    register,
    handleSubmit,
    formState:{errors}

}=useForm();

let navigate=useNavigate();

let [err,setErr]=useState('');

async function onSubmit(userObj){
    console.log(userObj);
    userObj.role='manager';
    userObj.status=true;
    const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin-api/manager`,userObj);
    console.log(res);
    alert(res.data.message);
}
  return (
    <div className='container d-flex justify-content-center  vh-100 align-items-center bg-light'>
    
        <form onSubmit={handleSubmit(onSubmit)} className='w-50 mx-auto shadow-lg rounded-3 p-4'>
            

            <div>
                <input type='text' className='form-control mt-3' id='username' placeholder='Username' {...register("username",{required:true})}
                ></input>
            </div>
            <input type='email' className='form-control mt-3 ' placeholder='Email' {...register("email")}></input>
            <div>
                <input type='password' className='form-control mt-3 ' placeholder='Password' {...register("password")}></input>
            </div>
            <button type='submit' className='btn btn-success mt-3 mx-auto d-block '>Register</button>



        </form>

    </div>
  )
}

export default AddManager;
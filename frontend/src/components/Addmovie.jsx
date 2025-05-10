import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'

function Addmovie() {

  let {
    register,
    handleSubmit,
    formState:{errors}
  }=useForm();

  async function onSubmit(obj) {
    obj.status=true;
    console.log(obj);
    const res=await axios.post('/admin-api/movie',obj);
    console.log("Response is for movie",res);
    
  }
  return (
    <div>
      <div className='container d-flex justify-content-center vh-100 align-items-center '>
        <form onSubmit={handleSubmit(onSubmit)} className='w-50 mx-auto shadow-lg rounded-3 p-4'>
          <input type='text' placeholder='Movie name' id='moviename' className='form-control mt-3' {...register("moviename",{required:true})}/>

          <input type='text' placeholder='Movie image' id='image' className='form-control mt-3' {...register("image",{required:true})}/>
          <input type='date' placeholder='Release date' className='form-control mt-3' {...register("release_date")}/>
          <input type='text' placeholder='Genre' id='genre' className='form-control mt-3' {...register("genre")}/>

          <button type='submit' className='btn btn-success mx-auto d-block mt-3'>Submit</button>
          


        </form>

      </div>
    </div>
  )
}

export default Addmovie;
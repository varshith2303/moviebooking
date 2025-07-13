import React from 'react'
import Movies from './Movies';
import Carousel from './Carousel';
import axios from 'axios';
import H1 from './H1';
import { useCity } from './context/CityContext.jsx';
import { useState ,useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function UserProfile() {
  const [articles,setArticles]=useState([]);
  const {city}=useCity();
  const navigate=useNavigate();

  async function getMovies(){
    const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user-api/movies`);
    console.log("res",res);
    if(res.data.message==='Movies List')
    {
      setArticles(res.data.payload);
    }


  }

  useEffect(()=>{
    getMovies()
  },[]);

  return (
    <div>
      <Outlet/>
     
      <Carousel/>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4'>
          {articles.map((article)=>(
            <div className='col  mt-3  border-red-600 my-3 ' key={article._id}>
              <div className="h-100  border-solid border-red-600 p-2 rounded-lg shadow-lg">

              <div className='card-body mx-auto'>
                <h5 className='card-title  text-danger text-center'>
                  {article.moviename}

                </h5>
                <img src={article.image} alt='not ok' className='rounded mt-2 mx-auto' style={{height:250, width:175}}/>
                <p className='text-center'>Genre: {article.genre}</p>  
                  <button style={{borderRadius:"5px"}} className=" p-2 border-0   text-white bg-blue-400 hover:bg-violet-500 block mx-auto "onClick={() => navigate(`/theatres/${article._id}/${city}`)}>
            Book Tickets
    </button>         


              </div>

              </div>
            </div>
        ))}
        <div>

        </div>

      </div>

    </div>
  )
}

export default UserProfile;
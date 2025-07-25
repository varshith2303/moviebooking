import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AssignMovie() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const selectedTheatre = watch("theatre");

  // Retrieve managerId from localStorage
  const managerId = localStorage.getItem("managerId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movies
        const managerId = localStorage.getItem("managerId");
        const moviesRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user-api/movies`);
        setMovies(moviesRes.data.payload);

        // Fetch all theatres
        const theatresRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin-api/theatres`);
        const allTheatres = theatresRes.data.payload;

        // Fetch logged-in manager's details (to get assigned theatres)
        console.log("mgrid",managerId);
        const managerRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user-api/users/${managerId}`);
        const assignedTheatreIds = managerRes.data.payload.assigned_theatres;

        // Filter theatres based on assigned IDs
        const filteredTheatres = allTheatres.filter(theatre => 
          assignedTheatreIds.includes(theatre._id)
        );

        setTheatres(filteredTheatres);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load movies or theatres.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [managerId]);

  useEffect(() => {
    if (selectedTheatre) {
      const theatre = theatres.find(t => t._id === selectedTheatre);
      setScreens(theatre ? theatre.screens : []);
      setValue("screen", "");
    }
  }, [selectedTheatre, theatres]);

  async function submit(formData) {
    const requestData = {
      theatre_id: formData.theatre,
      screen_id: formData.screen,
      movie_id: formData.movie,
      time_slots: [
        { time: formData.show_time, available_seats: 50 }
      ],
      ticket_price: Number(formData.ticket_price)
    };

    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/manager-api/assign-movie`, requestData);
      alert("Movie assigned successfully!");
    } catch (error) {
      console.error("Error assigning movie:", error);
      alert("Failed to assign movie!");
    }
  }

  return (
    <div className='container p-5 mx-auto'>
      <form onSubmit={handleSubmit(submit)} className='shadow-lg p-5'>
        <select className='form-select border-2 w-full mb-3' {...register("movie", { required: true })}>
          <option value=''>Select Movie</option>
          {movies.map(movie => (
            <option key={movie._id} value={movie._id}>{movie.moviename}</option>
          ))}
        </select>
        {errors.movie && <p className="text-red-500">Please select a movie.</p>}

        <select className='form-select border-2 w-full mb-3' {...register("theatre", { required: true })}>
          <option value=''>Select Theatre</option>
          {theatres.map(theatre => (
            <option key={theatre._id} value={theatre._id}>{theatre.name}</option>
          ))}
        </select>
        {errors.theatre && <p className="text-red-500">Please select a theatre.</p>}

        <select className='form-select border-2 w-full mb-3' {...register("screen", { required: true })}>
          <option value=''>Select Screen</option>
          {screens.length > 0 ? (
            screens.map((screen) => (
              <option key={screen.screen_id} value={screen.screen_id}>
                {screen.name} (Seats: {screen.seat_capacity})
              </option>
            ))
          ) : (
            <option disabled>No screens available</option>
          )}
        </select>
        {errors.screen && <p className="text-red-500">Please select a screen.</p>}

        <input type='number' placeholder='Ticket Price' className='form-control mb-3' {...register("ticket_price", { required: true })} />
        {errors.ticket_price && <p className="text-red-500">Enter a valid ticket price.</p>}

        <input type='time' placeholder='Show Time' className='form-control mb-3' {...register("show_time", { required: true })} />
        {errors.show_time && <p className="text-red-500">Enter a valid show time.</p>}

        <button type='submit' className='btn btn-success d-flex mx-auto p-2'>ADD</button>
      </form>
    </div>
  );
}

export default AssignMovie;

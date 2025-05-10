  import React, { useEffect, useState } from "react";
  import { useForm, Controller } from "react-hook-form";
  import axios from "axios";
  import Select from 'react-select'

  const AssignTheatre = () => {

      let manager,theatre;
      let {
          register,
          handleSubmit,
          setValue,
          getValues,
          control,
          formState:{errors}

      }=useForm();
    const [theatres,setTheatres]=useState([]);
    const [managers,setManagers]=useState([]);


      useEffect(()=>{
          const fetchData= async ()=>{
              const res=await axios.get('/admin-api/theatres');
              console.log(res);
              setTheatres(res.data.payload);
              console.log(theatres);

              const res1=await axios.get('/admin-api/managers');
              console.log(res1);
              setManagers(res1.data.payload);
              console.log(managers);

          }
          fetchData();
      },[])

      const handleTheatreChange = (e) => {
          const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
          setValue("theatre_id", selectedOptions); // Update the form value
        };

    const handleAssign = async(obj) => {
      console.log(obj);
      obj.theatre_id = obj.theatre_id.map(option => option.value); // Convert to array of IDs
      console.log("Submitting:", obj);
      let msg=await axios.put('/admin-api/assign-theatre',obj);
      console.log("response is",msg);
    };

    return (
      <div className="p-4 max-w-md mx-auto mt-10 border rounded-lg shadow-lg">
    <h2 className="text-xl font-bold mb-4">Assign Theatre</h2>
    <form onSubmit={handleSubmit(handleAssign)}>
    <Controller
            name="theatre_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={theatres.map(theatre => ({
                  value: theatre._id,
                  label: theatre.name,
                }))}
                isMulti
                placeholder="Select Theatres"
                className="w-full"
              />
            )}
          />
    
      
    <select className="w-full border p-2 rounded mt-4 form-select" {...register("manager_id")}>
      <option disabled>Select Manager</option>
      
      {
          managers.map((mgr)=>(
              <option key={mgr._id} value={mgr._id}>{mgr.username}</option>
          ))
      }
    </select>
    <button className=" d-block mx-auto mt-4 w-full bg-info text-white py-2 rounded" type="submit">Assign</button>
    </form>
  </div>

    );
  };

  export default AssignTheatre;

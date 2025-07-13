import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

function AddTheatre() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      screens: [{ screen_id: '', name: '', seat_capacity: '', movies: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'screens',
  });

  async function onSubmit(data) {
    const theatreData = {
      name: data.name,
      location: {
        city: data.city,
        address: data.address,
      },
      screens: data.screens.map((screen, index) => ({
        ...screen,
        screen_id: `screen_${index + 1}`,
        movies: [],
      })),
      status: true,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin-api/theatre`, theatreData);
      console.log('Theatre added:', res.data);
    } catch (error) {
      console.error('Error adding theatre:', error);
    }
  }

  return (
    <div className="container d-flex justify-content-center vh-100 align-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto shadow-lg rounded-3 p-4">
        <h3 className="text-center">Add Theatre</h3>

        {/* Theatre Name */}
        <input
          type="text"
          placeholder="Theatre Name"
          className="form-control mt-3"
          {...register('name', { required: true })}
        />
        {errors.name && <p className="text-danger">Theatre name is required</p>}

        {/* City */}
        <input
          type="text"
          placeholder="City"
          className="form-control mt-3"
          {...register('city', { required: true })}
        />
        {errors.city && <p className="text-danger">City is required</p>}

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          className="form-control mt-3"
          {...register('address', { required: true })}
        />
        {errors.address && <p className="text-danger">Address is required</p>}

        <h5 className="mt-4">Screens</h5>
        {fields.map((screen, index) => (
          <div key={screen.id} className="border p-3 mt-2 rounded">
            <input
              type="text"
              placeholder="Screen Name"
              className="form-control mb-2"
              {...register(`screens.${index}.name`, { required: true })}
            />
            {errors.screens?.[index]?.name && <p className="text-danger">Screen name is required</p>}

            <input
              type="number"
              placeholder="Seat Capacity"
              className="form-control mb-2"
              {...register(`screens.${index}.seat_capacity`, { required: true })}
            />
            {errors.screens?.[index]?.seat_capacity && (
              <p className="text-danger">Seat capacity is required</p>
            )}

            <button type="button" className="btn btn-danger btn-sm" onClick={() => remove(index)}>
              Remove Screen
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-success mt-3"
          onClick={() => append({ screen_id: '', name: '', seat_capacity: '', movies: [] })}
        >
          Add Screen
        </button>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-4 w-100">
          Add Theatre
        </button>
      </form>
    </div>
  );
}

export default AddTheatre;

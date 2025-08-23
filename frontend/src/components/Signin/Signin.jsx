import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoginContext } from '../context/LoginContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, setLogin, user, setUser, role, setRole } = useContext(LoginContext);

  const [err, setErr] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Updated Login status: ", login);
    console.log("Updated User is: ", user);
  }, [login]);

  async function onSubmit(userObj) {
    console.log(userObj);

    if (userObj.role === 'user' || userObj.role === 'manager') {
      let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user-api/login`, userObj);

      if (res.data.message === 'login success') {
        setLogin(true);
        setUser(res.data.user.username);

        localStorage.setItem("token", res.data.token);

        if (userObj.role === 'user') {
          setRole('user');
          alert("Login successful!");
          navigate('/userprofile');
        } else {
          alert("Login successful!");
          navigate('/managerprofile');
        }
      }
    } else {
      let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin-api/login`, userObj);

      if (res.data.message === 'login success') {
        setLogin(true);
        setUser(res.data.user.username);
        localStorage.setItem("token", res.data.token);
        navigate('/adminprofile');
      } else {
        alert(res.data.message);
      }
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-12 col-sm-10 col-md-8 col-lg-6 shadow-lg rounded-3 p-4 bg-white"
      >
        {/* Radio buttons */}
        <div className="mb-3">
          <label className="form-label d-block">Login as</label>
          <div className=" m-2 d-flex flex-wrap gap-3">
            <div className="form-check">
              <input type="radio" className="form-check-input" id="user" value="user" {...register("role")} />
              <label htmlFor="user" className="form-check-label">User</label>
            </div>

            <div className="form-check">
              <input type="radio" className="form-check-input" id="manager" value="manager" {...register("role")} />
              <label htmlFor="manager" className="form-check-label">Manager</label>
            </div>

            <div className="form-check">
              <input type="radio" className="form-check-input" id="admin" value="admin" {...register("role")} />
              <label htmlFor="admin" className="form-check-label">Admin</label>
            </div>
          </div>
        </div>

        {/* Username */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            {...register("username", { required: true })}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            {...register("email")}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password")}
          />
        </div>

        {/* Submit */}
        <div className='w-25 mx-auto'>
        <button type="submit" className="btn btn-success ">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
}

export default Signin;

// src/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null = loading

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsValid(false);
        return;
      }
      console.log(import.meta.env.VITE_BACKEND_URL);

      try {
        const res = await axios.get(
  `${import.meta.env.VITE_BACKEND_URL}/api/verify`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


        if (res.status === 200) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        setIsValid(false);
      }
    };

    verifyToken();
  }, []);

  if (isValid === null) return <div>Loading...</div>;
  if (!isValid) return <Navigate to="/signin" replace />;

  return children;
};

export default ProtectedRoute;

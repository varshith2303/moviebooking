import React, { useEffect } from "react";
import axios from "axios";
import socket from "../socket";
import { useNavigate } from "react-router-dom";


const RazorpayButton = ({ amount ,selectedSeats,screenId,selectedShowTime,theatreId,movieId}) => {
  const navigate=useNavigate();
  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleBookingSuccess = async (bookingDetails) => {
    
    const { _id, movieName, theatreName, seatNumbers, showTime } = bookingDetails;
    console.log("movie name",movieName);
  
    
    navigate(`/ticket/${_id}`, { state:{bookingDetails} });
  };
  const handlePayment = async () => {
    try {
                const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/user-api/create-order`,
                    {
                      amount, // amount in rupees
                    }
    );


      const { orderId, amount: orderAmount, currency } = res.data;

      const options = {
        key: "rzp_test_0MWZbw0hKBVjZ0", 
        amount: orderAmount,
        currency: currency,
        order_id: orderId,
        name: "Your Company Name",
        description: "Test Transaction",
        handler: async function (response) {
            try{
                console.log(selectedSeats);
                const res=await axios.post('/user-api/book-seats',{
                        theatreId,
                        screenId,
                        selectedSeats:selectedSeats,
                        showTime: selectedShowTime
                })
                console.log(" booking response ",res.message);
                socket.emit("seat-booked", {
                    seatNumbers: Object.keys(selectedSeats),
                    screenId: screenId,
                  });

                  const token=localStorage.getItem('token');
                  console.log("token",token);

                  const re=await axios.post('/user-api/book-tickets',{
                    theatreId,
                    screenId,
                    selectedSeats: Object.values(selectedSeats).map(s=>s.seat_number),
                    showTime:selectedShowTime,
                    amountPaid:amount,
                    movieId
                  },
                {
                  headers:{
                    Authorization:`Bearer ${token}`
                  }
                })

                console.log("Tickets",re.data.booking);
                handleBookingSuccess(re.data.booking)
      
                  alert("Seats successfully booked!");
            }
          catch(err){
              console.log("Error",err);
          }
          
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Your Company Address",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: "10px 20px",
        background: "#3399cc",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton;

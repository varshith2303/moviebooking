Live Demo Link : https://cinemabooking-varshith.vercel.app

# 🎬 Movie Booking Application

A full-stack web application for seamless movie ticket booking.
It provides role-based dashboards for **Admin**, **Theatre Manager**, and **Users**, with **real-time seat booking** and **Razorpay integration** for payments.

---

## 🚀 Features

### 🔹 User

* Browse theatres **based on location**.
* View available movies and show timings.
* Select seats with **real-time updates** (Socket.IO).
* Secure payments via **Razorpay**.
* Instant booking confirmation.

### 🔹 Theatre Manager

* Add movies for their assigned theatre.
* Configure **show timings** and **ticket prices**.
* Manage available shows easily.

### 🔹 Admin

* Add movies, theatres, and managers.
* Assign theatres to managers.
* Manage users and overall system.

---

## 🛠️ Tech Stack

**Frontend:** React, TailwindCSS
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose)
**Real-time:** Socket.IO
**Payment Gateway:** Razorpay

---

## 📸 Screenshots


* Homepage (with theatres by location)
* Seat booking page (with real-time updates)
* Admin dashboard
* Payment flow)

---

## ⚙️ Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/movie-booking-app.git
cd movie-booking-app
```

2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

3. Setup environment variables
   Create a `.env` file in `backend` with:

```
PORT=5000
MONGO_URI=your_mongo_db_uri
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
JWT_SECRET=your_jwt_secret
```

4. Run the app

```bash
# Start backend
cd backend
npm run dev  

# Start frontend
cd ../frontend
npm start
```

---

## 📊 Future Improvements

* Add monitoring of bookings for managers.
* Implement QR code tickets.
* Email/SMS notifications for booking confirmation.
* Recommendation system for movies.
* Multi-language support.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License

This project is licensed under the MIT License.

---



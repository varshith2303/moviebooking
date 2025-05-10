const cors = require("cors");
const exp = require('express');
const app = exp();
require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;
const path = require('path');
const http = require('http'); // Add this
const { Server } = require('socket.io'); // Socket.IO server

const server = http.createServer(app); 

// Create HTTP server

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // your frontend URL
    methods: ['GET', 'POST'],
  },
});

app.use(exp.json());

app.set("io", io);

// MongoDB connection
mongoClient.connect(process.env.DB_URL)
  .then(client => {
    const book = client.db('book');
    const userscollection = book.collection('userscollection');
    const moviescollection = book.collection('moviescollection');
    const theatrescollection = book.collection('theatrescollection');
    const admincollection = book.collection('admincollection');
    const bookingscollection=book.collection('bookingscollection')

    app.set('userscollection', userscollection);
    app.set('moviescollection', moviescollection);
    app.set('theatrescollection', theatrescollection);
    app.set('admincollection', admincollection);
    app.set('bookingscollection',bookingscollection)

    console.log('DB connection success');
  })
  .catch(err => console.log("Error in connection of MongoDB", err));

// APIs
const userApp = require('./APIs/user-api');
const managerApp = require('./APIs/manager-api');
const adminApp = require('./APIs/admin-api');

app.use('/user-api', userApp);
app.use('/admin-api', adminApp);
app.use('/manager-api', managerApp);

// Error handling
app.use((err, req, res, next) => {
  res.send({ message: "error", payload: err.message });
});

// ✅ Socket.IO setup
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('seat-booked', ({ seatNumbers, screenId }) => {
    // Notify all clients to mark seats as booked
    io.emit('seat-update', {
      seatNumbers,
      screen: screenId,
    });
    
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Web server on port ${port}`));

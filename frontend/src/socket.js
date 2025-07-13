// socket.js
import { io } from "socket.io-client";


const socket = io(import.meta.env.VITE_BACKEND_URL, {
  transports: ['websocket'],
});
 // replace with your backend URL

export default socket;

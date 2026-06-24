import { io } from "socket.io-client";

const socket = io("https://sante-backend-l81v.onrender.com", {
  autoConnect: false
});

export default socket;

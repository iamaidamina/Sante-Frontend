import { io } from "socket.io-client";

const socket = io("https://sante-backend-production-a693.up.railway.app", {
  autoConnect: false
});

export default socket;

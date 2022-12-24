import { io } from "socket.io-client";
import { backendApi } from "../variables";
const socket = io(backendApi, {
  transports: ["websocket"],
});

export default socket;

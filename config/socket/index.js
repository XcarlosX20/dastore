import { io } from "socket.io-client";
import { SOCKET_ENDPOINT } from "../variables";
const socket = io(SOCKET_ENDPOINT, {
  transports: ["websocket"],
});
socket.open();

export default socket;

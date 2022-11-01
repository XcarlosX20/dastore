import { io } from "socket.io-client";
const socket = io(process.env.NEXT_PUBLIC_SOCKET_ENDPOINT, {
  reconnectionDelayMax: 10000,
});
socket.open();

export default socket;

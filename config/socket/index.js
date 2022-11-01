import { io } from "socket.io-client";
const backendApi = new URL(
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_MYAPP_BACKEND
    : process.env.NEXT_PUBLIC_MYAPP_BACKEND_LOCAL
);
const socket = io(backendApi.origin + ":" + NEXT_PUBLIC_SOCKET_PORT, {
  reconnectionDelayMax: 10000,
});
socket.open();

export default socket;

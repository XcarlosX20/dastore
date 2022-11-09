import { io } from 'socket.io-client'
const socket = io(process.env.NEXT_PUBLIC_SOCKET_ENDPOINT, {
  transports: ['websocket']
})
socket.open()

export default socket

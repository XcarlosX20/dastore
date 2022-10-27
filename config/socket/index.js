import { io } from 'socket.io-client'
const backendApi = new URL(
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_MYAPP_BACKEND
    : process.env.NEXT_PUBLIC_MYAPP_BACKEND_LOCAL
)
const socket = io('http://localhost:4001', {
  reconnectionDelayMax: 10000
})
socket.open()

export default socket

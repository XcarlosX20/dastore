const modeEnv = process.env.NODE_ENV === 'development'
export const SOCKET_ENDPOINT = modeEnv
  ? process.env.NEXT_PUBLIC_SOCKET_ENDPOINT_LOCAL
  : process.env.NEXT_PUBLIC_SOCKET_ENDPOINT
export const backendApi = new URL(
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_MYAPP_BACKEND_LOCAL
    : process.env.NEXT_PUBLIC_MYAPP_BACKEND_LOCAL
).origin

const developmentMode = process.env.NODE_ENV !== "production"
const modeEnv = { production: process.env.NEXT_PUBLIC_MYAPP_BACKEND, development:process.env.NEXT_PUBLIC_MYAPP_BACKEND_LOCAL}
export const SOCKET_ENDPOINT = modeEnv
  ? process.env.NEXT_PUBLIC_SOCKET_ENDPOINT
  : process.env.NEXT_PUBLIC_SOCKET_ENDPOINT_LOCAL;

export const backendApi = new URL(
  developmentMode
    ? modeEnv.development
    : modeEnv.production
).origin;
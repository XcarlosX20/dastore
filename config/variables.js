const modeEnv = process.env.NODE_ENV === "production";
export const SOCKET_ENDPOINT = modeEnv
  ? process.env.NEXT_PUBLIC_SOCKET_ENDPOINT
  : process.env.NEXT_PUBLIC_SOCKET_ENDPOINT_LOCAL;

export const backendApi = new URL(
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_MYAPP_BACKEND
    : process.env.NEXT_PUBLIC_MYAPP_BACKEND_LOCAL
).origin;

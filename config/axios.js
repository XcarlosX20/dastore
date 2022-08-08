import axios from "axios";
const backendApi = new URL(
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_MYAPP_BACKEND
    : process.env.NEXT_PUBLIC_MYAPP_BACKEND_LOCAL
);
console.log(backendApi.origin);
export const axiosClient = axios.create({
  baseURL: backendApi.origin,
});
export const tokenAuth = (token) => {
  if (token) {
    axiosClient.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axiosClient.defaults.headers.common["x-auth-token"];
  }
};

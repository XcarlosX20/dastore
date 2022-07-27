import axios from "axios";
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MYAPP_BACKEND_LOCAL,
});
export const tokenAuth = (token) => {
  if (token) {
    axiosClient.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axiosClient.defaults.headers.common["x-auth-token"];
  }
};

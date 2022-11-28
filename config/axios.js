import axios from "axios";
import { backendApi } from "./variables";
export const axiosClient = axios.create({
  baseURL: backendApi,
});
export const tokenAuth = (token) => {
  if (token) {
    axiosClient.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axiosClient.defaults.headers.common["x-auth-token"];
  }
};
 
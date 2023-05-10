import axios from "axios";
import Displang from "./HEADERS";

const request = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

request.interceptors.request.use((config) => {
  config.headers["x-auth-token"] = localStorage.getItem("authToken");
  config.headers["accept-language"] = Displang ? "ar" : "en";
  return config;
});

export default request;

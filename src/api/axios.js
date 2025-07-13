import axios from "axios";
//import { API_URL } from "../config";

const API_URL = "http://localhost:4000/api";
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor to include the auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

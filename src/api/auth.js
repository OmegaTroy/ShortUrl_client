import axios from "./axios";

export const registerRequest = (user) => axios.post("/register", user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const logoutRequest = () => axios.post(`/logout`);
export const tokenVerify = () => axios.get(`/verify`);

export const updateProfileRequest = (userData) => axios.put(`/profile`, userData);
export const deleteAccountRequest = () => axios.delete(`/profile`);

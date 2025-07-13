import axios from "./axios";

export const registerRequest = (user) => axios.post("/api/register", user);
export const loginRequest = (user) => axios.post(`/api/login`, user);
export const logoutRequest = () => axios.post(`/api/logout`);
export const tokenVerify = () => axios.get(`/api/verify`);

export const updateProfileRequest = (userData) => axios.put(`/api/profile`, userData);
export const deleteAccountRequest = () => axios.delete(`/api/profile`);

import axios from "./axios";

export const getShortUrlRequest = () => axios.get("/shortUrl");
export const getShortUrlRequestById = (id) => axios.get(`/shortUrl/${id}`);
export const addShortUrlRequest = (url) => axios.post("/shortUrl", url);
export const updateShortUrlRequest = (id, data) =>
  axios.put(`/shortUrl/${id}`, data);

export const deleteShortUrlRequest = (id) => axios.delete(`/shortUrl/${id}`);

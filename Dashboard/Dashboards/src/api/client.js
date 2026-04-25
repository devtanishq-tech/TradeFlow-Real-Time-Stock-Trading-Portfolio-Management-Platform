import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL; // Backend Port
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
//=======================Used to Handle the response ========================
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err?.response?.data || err.message);
    return Promise.reject(err);
  },
);
export default api;

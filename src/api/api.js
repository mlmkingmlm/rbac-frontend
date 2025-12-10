import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,   // MUST LOOK EXACTLY LIKE THIS
  withCredentials: false,
});

export default api;

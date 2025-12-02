// src/lib/api.js
import axios from "axios";

// Axios instance tunggal untuk memanggil backend API
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
  withCredentials: false,
});

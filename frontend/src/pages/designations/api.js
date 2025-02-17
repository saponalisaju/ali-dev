import axios from "axios";
import apiUrl from "../../secret";

const api = axios.create({
  baseURL: `${apiUrl}/api/designation`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;

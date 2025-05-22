import axios from "axios";

const api = axios.create({
  baseURL: "https://orbilearn.com/api",
  withCredentials: true, // to include cookies in requests
  headers: {
    "Content-Type": "application/json",
  },
});



export default api;

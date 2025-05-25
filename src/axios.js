// src/axios.js
import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://orbilearn.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiInstance;

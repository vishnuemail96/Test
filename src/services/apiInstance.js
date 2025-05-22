import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://orbilearn.com/api/",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

export default apiInstance;

// src/services/apiInstance.js
import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://orbilearn.com/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach CSRF token if available in cookies
apiInstance.interceptors.request.use(config => {
  const csrfToken = getCookie('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default apiInstance;

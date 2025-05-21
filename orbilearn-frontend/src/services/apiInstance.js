import axios from 'axios';

function getCookie(name) {
  const cookies = document.cookie ? document.cookie.split(';') : [];
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

const apiInstance = axios.create({
  baseURL: 'https://orbilearn.com/api/',
  withCredentials: true, // <--- important to send cookies cross-domain
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add CSRF token header automatically on each request
apiInstance.interceptors.request.use(config => {
  const csrfToken = getCookie('csrftoken');
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken; // must match exactly case-sensitive header name
  }
  return config;
});

export default apiInstance;

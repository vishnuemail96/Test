// src/services/authService.js
import api from './apiInstance';

export const loginUser = (data) => api.post('/api/auth/login/', data);
export const verifyOtp = (data) => api.post('/api/auth/verify-otp/', data);

// authService.js
import axios from 'axios';

export const registerUser = (data) => {
  return axios.post('https://orbilearn.com/api/auth/register/', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

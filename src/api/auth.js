// src/api/auth.js
import api from "./axios";

export const login = (email) =>
  api.post("/api/auth/login/", { email });

export const verifyOtp = (email, otp) =>
  api.post(`/api/auth/verify-otp/?email=${email}`, { otp });

export const register = (payload) =>
  api.post("/api/auth/register/", payload);

export const logout = (refresh) =>
  api.post("/api/auth/logout/", { refresh });

export const profile = () => api.get("/api/auth/profile/");

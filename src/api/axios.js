// src/api/axios.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { loadRefresh, saveRefresh, clearRefresh } from "../utils/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 8000,
});

export const attachInterceptors = (getAuth, setAuth) => {
  api.interceptors.request.use((config) => {
    const { access } = getAuth();
    if (access) config.headers.Authorization = `Bearer ${access}`;
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (err) => {
      const original = err.config;
      if (
        err.response?.status === 401 &&
        !original._retry &&
        loadRefresh()
      ) {
        original._retry = true;
        try {
          const r = await api.post("/api/token/refresh/", {
            refresh: loadRefresh(),
          });
          const newAccess = r.data.access;
          setAuth((prev) => ({ ...prev, access: newAccess }));
          original.headers.Authorization = `Bearer ${newAccess}`;
          return api(original);
        } catch {
          clearRefresh();
          setAuth({ user: null, access: null, refresh: null });
        }
      }
      throw err;
    }
  );
};

export default api;

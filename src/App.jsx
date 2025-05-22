// ─────────────────────────── src/App.jsx ───────────────────────────
import { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import api from './services/apiInstance';

/* ────────── Pages & Components ────────── */
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import VerifyOTP from './components/VerifyOTP';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Resources from './pages/Resources';
import Services from './pages/Services';

/* ────────── Axios Global Settings ────────── */
axios.defaults.withCredentials = true;

/* ────────── Auth Context ────────── */
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    api
      .get('/auth/login/')
      .then(() => console.log('CSRF and session cookies initialised'))
      .catch(err => console.warn('CSRF init failed:', err));
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('registrationEmail');
    setIsAuthenticated(false);
    delete axios.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ────────── App ────────── */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ─── Public routes ─── */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/services" element={<Services />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          {/* ─── Catch-all ─── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

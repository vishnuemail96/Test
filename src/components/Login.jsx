import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/logo1.png";

// Set default to send cookies on all axios requests
axios.defaults.withCredentials = true;

function Login({ onEmailSubmitted, onSessionData }) {
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      // Step 1: GET CSRF Token from response headers
      const response = await axios.get("https://orbilearn.com/api/auth/login/");
      const csrfToken =
        response.headers["x-csrftoken"] || response.headers["x-xsrf-token"];

      if (!csrfToken) {
        alert("Failed to get CSRF token from response. Please try again.");
        return;
      }

      // Step 2: POST email to request OTP
      await axios.post(
        "https://orbilearn.com/api/auth/login/",
        { email },
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
        }
      );

      // Optional: Send CSRF token back to parent component
      if (onSessionData) {
        onSessionData({ csrfToken });
      }

      alert("OTP sent to your email");

      if (onEmailSubmitted) {
        onEmailSubmitted(email);
      }

      // Redirect to OTP page
      window.location.href = "https://orbilearn.com/api/auth/verify-otp/";
    } catch (error) {
      if (error.response?.status === 401) {
        alert("Unauthorized. Please check your credentials.");
      } else {
        alert("Login failed. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md">
        {/* Logo and Welcome */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Orbilearn Logo" className="h-16 sm:h-20 mb-2" />
          <h2 className="text-xl font-semibold text-center text-gray-800">
            Welcome to <span className="text-yellow-500">Orbilearn</span>
          </h2>
        </div>

        <p className="text-gray-600 text-sm mb-4 text-center">
          Enter your email to receive a One-Time Password (OTP)
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
          required
        />

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Send OTP
        </button>

        <div className="text-center mt-4 space-y-2">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
          <Link to="/" className="text-sm text-blue-600 hover:underline block">
            ← Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

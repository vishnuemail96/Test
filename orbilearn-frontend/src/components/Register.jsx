import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "/logo1.png";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return "";
}

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Step 1: GET request to obtain CSRF + session
      await axios.get("https://orbilearn.com/api/auth/register/", {
        withCredentials: true,
      });

      // Step 2: Read CSRF token from cookie
      const csrfToken = getCookie("csrftoken");

      // Step 3: POST registration details
      await axios.post(
        "https://orbilearn.com/api/auth/register/",
        {
          full_name: name,
          phone_number: phone,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );

      // Step 4: Redirect to OTP verification
      navigate("/verify-otp");
    } catch (err) {
      const msg =
        err?.response?.data?.email?.[0] ||
        err?.response?.data?.phone_number?.[0] ||
        err?.response?.data?.full_name?.[0] ||
        "Registration failed. Please try again.";
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Orbilearn Logo" className="h-16 sm:h-20 mb-2" />
          <p className="text-sm text-gray-500 text-center">
            Learn Full Stack, AI/ML, Cloud & More
          </p>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Free Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            ← Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

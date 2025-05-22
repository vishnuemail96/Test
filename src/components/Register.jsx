import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/apiInstance"; // pre-configured axios instance
import logo from "/logo1.png";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Update any field by name
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Step 1: Prime csrf token & session cookies
      await api.get("auth/register/");

      // Step 2: Post registration details
      await api.post("auth/register/", {
        full_name: formData.name,
        phone_number: formData.phone,
        email: formData.email,
      });

      // Step 3: Navigate to OTP verify page
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
            Learn Full Stack, AI/ML, Cloud &amp; More
          </p>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Free Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {loading ? "Registering…" : "Register"}
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

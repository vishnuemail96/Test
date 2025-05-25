import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as authApi from "../../api/auth";
import logo from "/logo1.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authApi.login(email);
      toast.success("OTP sent to your email");
      navigate(`/verify-otp?email=${email}`);
    } catch (err) {
      toast.error(err.response?.data?.detail ?? "Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
      >
        <div className="flex flex-col items-center mb-2">
          <img src={logo} alt="Orbilearn Logo" className="h-16 sm:h-20 mb-2" />
          <h2
            className="text-3xl font-extrabold mt-2 mb-8 text-center tracking-tight"
            style={{ color: "#1e3a8a" }}
          >
            Login
          </h2>
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-gray-700 tracking-wide"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}

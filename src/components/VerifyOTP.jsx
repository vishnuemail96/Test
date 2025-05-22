import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/apiInstance"; // ⬅️  use the shared Axios instance

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Axios automatically puts X-CSRFToken on the request
      await api.post("auth/verify-otp/", { otp });

      // success → go wherever you like
      navigate("/");
    } catch (err) {
      const msg =
        err?.response?.data?.otp?.[0] ??
        err?.response?.data?.detail ??
        "OTP verification failed. Please try again.";
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify <span className="text-yellow-500">OTP</span>
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="text-gray-600 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {loading ? "Verifying…" : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

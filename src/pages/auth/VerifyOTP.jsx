import { useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as authApi from "../../api/auth";
import { AuthContext } from "../../context/AuthContext.jsx";
import { saveRefresh } from "../../utils/token";

export default function VerifyOtp() {
  const [params] = useSearchParams();
  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 4 || !/^[0-9]{4}$/.test(otp)) {
      toast.error("Enter a valid 4-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const { data } = await authApi.verifyOtp(email, Number(otp));
      saveRefresh(data.refresh);
      setAuth({ user: data.user, access: data.access, refresh: data.refresh });
      toast.success("Logged in successfully");
      navigate("/profile", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.detail || "Invalid OTP, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-2 text-center text-yellow-500">Verify OTP</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          An OTP has been sent to <span className="font-medium">{email}</span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Enter 4-digit OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              inputMode="numeric"
              pattern="[0-9]{4}"
              maxLength={4}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              className="text-gray-800  mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest text-center text-lg letter-spacing-widest"
              placeholder="0000"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white font-semibold ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Verifying..." : "Verify & Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

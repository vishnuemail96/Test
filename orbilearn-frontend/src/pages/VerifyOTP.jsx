import { useState } from 'react';
import { verifyOtp } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const OtpVerify = () => {
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const email = localStorage.getItem('registrationEmail');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp({ email, otp });
      login(res.token); // set token and auth
      setMsg({ type: 'success', text: 'OTP Verified! Redirecting...' });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setMsg({
        type: 'error',
        text: err?.response?.data?.message || 'Invalid OTP.',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 card bg-base-100 shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
      {msg.text && (
        <div
          className={`alert ${
            msg.type === 'success' ? 'alert-success' : 'alert-error'
          } mb-4`}
        >
          {msg.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-control space-y-3">
        <input
          type="text"
          placeholder="Enter OTP"
          className="input input-bordered"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button className="btn btn-accent">Verify</button>
      </form>
    </div>
  );
};

export default OtpVerify;

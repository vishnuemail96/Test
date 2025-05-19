import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem('token', res.token); // optional
      localStorage.setItem('email', formData.email); // for OTP
      setMsg({ type: 'success', text: 'Login successful! Redirecting to OTP...' });
      setTimeout(() => navigate('/verify-otp'), 1500);
    } catch (err) {
      setMsg({ type: 'error', text: err?.response?.data?.message || 'Login failed.' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 card bg-base-100 shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {msg.text && (
        <div className={`alert ${msg.type === 'success' ? 'alert-success' : 'alert-error'} mb-4`}>
          {msg.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-control space-y-3">
        <input type="email" name="email" placeholder="Email" className="input input-bordered" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="input input-bordered" onChange={handleChange} />
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
};

export default Login;

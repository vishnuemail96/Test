import { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure phone starts with +
      const payload = {
        ...formData,
        phone: formData.phone.startsWith('+') ? formData.phone : `+${formData.phone}`,
      };
      await registerUser(payload);
      localStorage.setItem('registrationEmail', formData.email);
      setMsg({ type: 'success', text: 'OTP sent! Redirecting to verify...' });
      setTimeout(() => navigate('/verify-otp'), 1000);
    } catch (err) {
      setMsg({
        type: 'error',
        text: err?.response?.data?.message || 'Signup failed.',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 card bg-base-100 shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
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
          name="name"
          placeholder="Name"
          className="input input-bordered"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number (with country code)"
          className="input input-bordered"
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Signup;

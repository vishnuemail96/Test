import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios"; // custom axios hook if you're using one

const PaymentVerify = () => {
  const { batch_id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();

  const [status, setStatus] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.post(`/api/payments/verify/${batch_id}/`);
        if (res.data.success) {
          setStatus("✅ Payment verified successfully! Redirecting to your courses...");
          setTimeout(() => navigate("/enrolled-courses"), 3000);
        } else {
          setStatus("❌ Payment verification failed. Please try again or contact support.");
        }
      } catch (err) {
        setStatus("❌ An error occurred during verification. Please try again later.");
        console.error(err);
      }
    };

    verifyPayment();
  }, [batch_id, axios, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Payment Status</h2>
        <p className="text-gray-700">{status}</p>
      </div>
    </div>
  );
};

export default PaymentVerify;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as payApi from "../api/payments";
import toast from "react-hot-toast";
import React from "react";


export default function StartPayment() {
  const { batch_id } = useParams();
  const navigate = useNavigate();

  const handlePay = async () => {
    try {
      const { data } = await payApi.startPayment(batch_id);
      const options = {
        key: data.razorpay_key_id,
        amount: data.amount,
        currency: "INR",
        name: data.course_name,
        order_id: data.order_id,
        handler: async (response) => {
          await payApi.verifyPayment(batch_id, {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          toast.success("Payment successful");
          navigate(`/videos/${batch_id}`, { replace: true });
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Payment failed to start");
    }
  };

  useEffect(handlePay, []); // auto-runs when page opens

  return null; // or spinner
}

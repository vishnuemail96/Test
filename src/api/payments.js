// src/api/payments.js
import api from "./axios";

export const startPayment = (batchId) =>
  api.post(`/payment/start-payment/${batchId}/`);

export const verifyPayment = (batchId, body) =>
  api.post(`/payment/payment-verify/${batchId}/`, body);

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order_id');

    async function verifyPayment() {
      try {
        // Call backend to verify payment & update donations and campaigns
        await axios.post('http://localhost:5002/api/cashfree/verify-payment', { orderId });

        // After successful verification, redirect to dashboard
        navigate('/dashboard');
      } catch (err) {
        console.error('Payment verification failed', err);
        alert('Payment verification failed. Please contact support.');
      }
    }

    if (orderId) {
      verifyPayment();
    } else {
      navigate('/dashboard');
    }
  }, [location, navigate]);

  return <p>Verifying payment, please wait...</p>;
}

export default PaymentSuccess;

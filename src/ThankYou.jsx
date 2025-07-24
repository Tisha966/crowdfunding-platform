import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ThankYou() {
  const location = useLocation();
  const hasPosted = useRef(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order_id');

    const alreadyPosted = sessionStorage.getItem(`verified-${orderId}`);

    if (orderId && !hasPosted.current && !alreadyPosted) {
      hasPosted.current = true;

      const timer = setTimeout(() => {
        axios.post('https://cf-backend-57jj.onrender.com/api/cashfree/verify-payment', { orderId })
          .then(res => {
            console.log("✅", res.data.message);
            sessionStorage.setItem(`verified-${orderId}`, 'true');
          })
          .catch(err => console.error("❌", err.response?.data || err.message));
      }, 6000);

      return () => clearTimeout(timer); // Cleanup in case component unmounts quickly
    }
  }, [location.search]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🎉 Thank you for your donation!</h2>
      <p>Your payment has been successfully processed.</p>
    </div>
  );
}

export default ThankYou;

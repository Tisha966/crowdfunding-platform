import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ThankYou() {
  const location = useLocation();
  const hasPosted = useRef(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order_id');

    setTimeout(() => {
      if (orderId && !hasPosted.current) {
        hasPosted.current = true;

        axios.post('http://localhost:5002/api/cashfree/verify-payment', { orderId })
          .then(res => console.log("✅", res.data.message))
          .catch(err => console.error("❌", err.response?.data || err.message));
      }
    }, 6000); // Wait 6 seconds
  }, [location]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🎉 Thank you for your donation!</h2>
      <p>Your payment has been successfully processed.</p>
    </div>
  );
}

export default ThankYou;

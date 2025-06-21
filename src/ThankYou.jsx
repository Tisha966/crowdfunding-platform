import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ThankYou() {
  const location = useLocation();
  const hasPosted = useRef(false);

useEffect(() => {
  setTimeout(() => {
    if (orderId && !hasPosted.current) {
      hasPosted.current = true;
      axios.post('http://localhost:5002/api/cashfree/verify-payment', { orderId })
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    }
  }, 3000); // ⏱️ Wait 3 seconds
}, [location]);


  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🎉 Thank you for your donation!</h2>
      <p>Your payment has been successfully processed.</p>
    </div>
  );
}

export default ThankYou;

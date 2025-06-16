import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ThankYou() {
  const location = useLocation();
  const hasPosted = useRef(false); // 🧠 prevent double post

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order_id');

    const donationData = JSON.parse(localStorage.getItem('donationDetails'));

    if (orderId && donationData && !hasPosted.current) {
      hasPosted.current = true;

      axios.post('http://localhost:5002/api/cashfree/verify-and-save', {
        order_id: orderId,
        campaignId: donationData.campaignId,
        userId: donationData.userId,
        donor: donationData.donorEmail,
        name: donationData.donorName,
        amount: donationData.amount,
      })
      .then(res => {
        console.log("✅ Donation saved:", res.data);
      })
      .catch(err => {
        console.error("❌ Failed to save donation:", err);
      });
    }
  }, [location]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🎉 Thank you for your donation!</h2>
      <p>Your payment has been successfully processed.</p>
    </div>
  );
}

export default ThankYou;

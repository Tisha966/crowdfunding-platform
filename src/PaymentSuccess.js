import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order_id');

    async function verifyPayment() {
      if (verifying) return; // ✅ Prevent duplicate call
      setVerifying(true);

      // ✅ Avoid re-verifying same order from localStorage
      const verified = localStorage.getItem(`verified_${orderId}`);
      if (verified) {
        console.log('✅ Payment already verified for', orderId);
        navigate('/dashboard');
        return;
      }

      try {
        await axios.post('https://cf-backend-57jj.onrender.com/api/cashfree/verify-payment', {
          orderId,
        });

        // ✅ Save that this order is already verified
        localStorage.setItem(`verified_${orderId}`, 'true');
        localStorage.removeItem('donationDetails');
        navigate('/dashboard');
      } catch (err) {
        console.error('❌ Payment verification failed:', err);
        alert('Payment verification failed. Please contact support.');
      }
    }

    if (orderId) {
      verifyPayment();
    } else {
      navigate('/dashboard');
    }
  }, [location, navigate, verifying]);

  return <p style={{ textAlign: 'center', marginTop: '60px' }}>✅ Verifying payment, please wait...</p>;
}

export default PaymentSuccess;

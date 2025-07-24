// VerifyDonation.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyDonation = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying your donation...');

  useEffect(() => {
    const donationDetails = JSON.parse(localStorage.getItem('donationDetails'));
    const alreadySubmitted = localStorage.getItem('donationSubmitted');

    if (!donationDetails) {
      setStatus('No donation data found.');
      return;
    }

    if (alreadySubmitted === 'true') {
      setStatus('Donation already verified.');
      return;
    }
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const verifyDonation = async () => {
      try {
        await axios.post(`${API_BASE_URL}/api/donations/donate`, {
          ...donationDetails,
        });

        // ✅ Set flag to prevent resubmission
        localStorage.setItem('donationSubmitted', 'true');
        localStorage.removeItem('donationDetails');
        setStatus('✅ Donation Verified Successfully!');
        // Optionally navigate after a delay
        setTimeout(() => navigate('/dashboard'), 2000);
      } catch (error) {
        console.error("Verification error:", error);
        setStatus('❌ Verification Failed.');
      }
    };

    verifyDonation();
  }, [navigate]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'Segoe UI' }}>
      <h2>{status}</h2>
    </div>
  );
};

export default VerifyDonation;

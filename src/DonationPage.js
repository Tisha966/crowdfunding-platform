import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DonationPage() {
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [campaignName, setCampaignName] = useState('Loading...');
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  // Load Cashfree v3 SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ Cashfree v3 SDK loaded");
      setSdkReady(true);
    };

    script.onerror = () => {
      console.error("❌ Failed to load Cashfree SDK");
      alert("⚠️ Cashfree SDK not loaded properly. Please refresh.");
    };

    document.body.appendChild(script);
  }, []);

  // Fetch campaign title
  useEffect(() => {
    axios.get(`http://localhost:5002/api/campaigns/${campaignId}`)
      .then(res => setCampaignName(res.data.title || 'Unknown Campaign'))
      .catch(() => setCampaignName('Unknown Campaign'));
  }, [campaignId]);

 const handleDonate = async () => {
  if (!sdkReady || !window.Cashfree) {
    alert("⚠️ Payment gateway not ready. Please wait.");
    return;
  }

  if (!donorName || !donorEmail || !amount) {
    alert("❗ Please fill in all fields.");
    return;
  }

  setLoading(true);

  try {
    const res = await axios.post('http://localhost:5002/api/cashfree/create-order', {
      amount,
      donorEmail,
      donorName,
      campaignId,
    });

    const { payment_session_id, order_id } = res.data;

    if (!payment_session_id || !order_id) {
      alert("❌ No session ID or Order ID received.");
      setLoading(false);
      return;
    }

    const cf = window.Cashfree({ mode: 'sandbox' });

   // ✅ Save donation details
localStorage.setItem('donationDetails', JSON.stringify({
  donorEmail,
  donorName,
  campaignId,
  amount,
  userId: user?._id,
}));

// ✅ Launch Cashfree checkout
await cf.checkout({
  paymentSessionId: payment_session_id,
  redirectTarget: 'self',
});

    // ❌ Do NOT call verify-and-save here — payment isn't completed yet
  } catch (err) {
    console.error("❌ Error during Cashfree payment:", err);
    alert("Payment failed. Check console.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{
      padding: '30px',
      maxWidth: '450px',
      margin: '40px auto',
      backgroundColor: '#283044',
      color: '#eee',
      borderRadius: '8px',
      boxShadow: '0 8px 15px rgba(0,0,0,0.3)',
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
        Donate to <strong>{campaignName}</strong>
      </h2>
      <p style={{
        textAlign: 'center',
        color: '#bbb',
        marginBottom: '25px',
        fontSize: '1.1rem',
        fontWeight: '500'
      }}>
        Ready to donate? Proceed to pay securely.
      </p>

      <input
        type="text"
        value={donorName}
        onChange={e => setDonorName(e.target.value)}
        placeholder="Your Name"
        style={{
          display: 'block',
          width: '100%',
          marginBottom: '15px',
          padding: '12px',
          borderRadius: '4px',
          border: '1px solid #555',
          backgroundColor: '#39475f',
          color: '#eee',
          fontSize: '1rem'
        }}
      />
      <input
        type="email"
        value={donorEmail}
        onChange={e => setDonorEmail(e.target.value)}
        placeholder="Your Email"
        style={{
          display: 'block',
          width: '100%',
          marginBottom: '15px',
          padding: '12px',
          borderRadius: '4px',
          border: '1px solid #555',
          backgroundColor: '#39475f',
          color: '#eee',
          fontSize: '1rem'
        }}
      />
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount (₹)"
        style={{
          display: 'block',
          width: '100%',
          marginBottom: '20px',
          padding: '12px',
          borderRadius: '4px',
          border: '1px solid #555',
          backgroundColor: '#39475f',
          color: '#eee',
          fontSize: '1rem'
        }}
      />

      <button
        onClick={handleDonate}
        disabled={loading || !sdkReady}
        style={{
          backgroundColor: '#238044',
          color: 'white',
          border: 'none',
          padding: '14px',
          cursor: loading || !sdkReady ? 'not-allowed' : 'pointer',
          width: '100%',
          fontSize: '18px',
          fontWeight: '600',
          borderRadius: '5px',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={e => {
          if (!loading && sdkReady) e.currentTarget.style.backgroundColor = '#1d6c36';
        }}
        onMouseOut={e => {
          if (!loading && sdkReady) e.currentTarget.style.backgroundColor = '#238044';
        }}
      >
        {loading ? "Loading Payment..." : "Donate"}
      </button>
    </div>
  );
}

export default DonationPage;

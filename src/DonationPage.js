import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DonationPage() {
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [campaignName, setCampaignName] = useState('Loading...');
  const { campaignId } = useParams();

  // ✅ Load Cashfree v3 SDK
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

  // ✅ Fetch campaign title
  useEffect(() => {
    axios.get(`http://localhost:5002/api/campaigns/${campaignId}`)
      .then(res => setCampaignName(res.data.title || 'Unknown Campaign'))
      .catch(() => setCampaignName('Unknown Campaign'));
  }, [campaignId]);

  // ✅ Handle donation
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

      const { payment_session_id } = res.data;
      if (!payment_session_id) {
        alert("❌ No session ID received.");
        return;
      }

      const cf = window.Cashfree({ mode: 'sandbox' }); // Use 'production' in live mode

      await cf.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: '_self', // Use "_blank" if you want to open in new tab
      });

    } catch (err) {
      console.error("❌ Error during Cashfree payment:", err);
      alert("Payment failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Donate to <strong>{campaignName}</strong></h2>

      <input
        type="text"
        value={donorName}
        onChange={e => setDonorName(e.target.value)}
        placeholder="Your Name"
        style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
      />
      <input
        type="email"
        value={donorEmail}
        onChange={e => setDonorEmail(e.target.value)}
        placeholder="Your Email"
        style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
      />
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount (₹)"
        style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }}
      />

      <button
        onClick={handleDonate}
        disabled={loading || !sdkReady}
        style={{
          backgroundColor: '#238044',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          cursor: loading || !sdkReady ? 'not-allowed' : 'pointer',
          width: '100%',
          fontSize: '16px'
        }}
      >
        {loading ? "Loading Payment..." : "Donate"}
      </button>

      <div id="payment-form" style={{ marginTop: '20px' }}></div>
    </div>
  );
}

export default DonationPage;

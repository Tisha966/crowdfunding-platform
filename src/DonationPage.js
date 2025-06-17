// DonationPage.js
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
  const user = JSON.parse(localStorage.getItem('user'));

  // Load Cashfree SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => alert("Cashfree SDK failed to load.");
    document.body.appendChild(script);
  }, []);

  // Fetch campaign title
  useEffect(() => {
    axios.get(`http://localhost:5002/api/campaigns/${campaignId}`)
      .then(res => setCampaignName(res.data.title || 'Unknown Campaign'))
      .catch(() => setCampaignName('Unknown Campaign'));
  }, [campaignId]);

  const handleDonate = async () => {
    if (loading || !sdkReady || !window.Cashfree) return;
    if (!donorName || !donorEmail || !amount) {
      return alert("Please fill all fields.");
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
      if (!payment_session_id) throw new Error("No session ID returned");

      // Store details locally
      localStorage.setItem('donationDetails', JSON.stringify({
        donorEmail,
        donorName,
        campaignId,
        amount,
        userId: user?._id,
        orderId: order_id,
      }));

      const cf = window.Cashfree({ mode: 'sandbox' });
      await cf.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: 'self'
      });

    } catch (err) {
      console.error("Donation error:", err);
      alert("Something went wrong during donation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '450px', margin: '40px auto', backgroundColor: '#283044', color: '#eee', borderRadius: '8px' }}>
      <h2>Donate to <strong>{campaignName}</strong></h2>
      <input value={donorName} onChange={e => setDonorName(e.target.value)} placeholder="Your Name" />
      <input value={donorEmail} onChange={e => setDonorEmail(e.target.value)} placeholder="Your Email" type="email" />
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (₹)" type="number" />
      <button disabled={loading || !sdkReady} onClick={handleDonate}>
        {loading ? "Processing..." : "Donate"}
      </button>
    </div>
  );
}

export default DonationPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './donationPage.css';

function DonationPage() {
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [campaign, setCampaign] = useState(null);
  const { campaignId } = useParams();

  const user = JSON.parse(localStorage.getItem('user'));

  // ✅ Autofill name and email from user
  useEffect(() => {
    if (user) {
      setDonorName(user.name || '');
      setDonorEmail(user.email || '');
    }
  }, [user]);

  // ✅ Load Cashfree SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => alert("Cashfree SDK failed to load.");
    document.body.appendChild(script);
  }, []);

  // ✅ Fetch campaign details
  useEffect(() => {
    axios.get(`http://localhost:5002/api/campaigns/${campaignId}`)
      .then(res => setCampaign(res.data))
      .catch(() => setCampaign(null));
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

  if (!campaign) return <p className="loading">Loading campaign...</p>;

  const imageUrl = `http://localhost:5002/${campaign.imagePath?.replace(/\\/g, '/')}`;

  return (
    <div className="donation-page">
      <h1 className="donation-title">Donate to <span>{campaign.title}</span></h1>

      <img
        className="donation-image"
        src={imageUrl}
        alt={campaign.title}
        onError={(e) => { e.target.src = '/fallback.jpg' }}
      />

      <p className="campaign-description">{campaign.description}</p>

      <form className="donation-form">
        <input
          value={donorName}
          onChange={e => setDonorName(e.target.value)}
          placeholder="Your Name"
        />
        <input
          value={donorEmail}
          onChange={e => setDonorEmail(e.target.value)}
          placeholder="Your Email"
          type="email"
        />
        <input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount (₹)"
          type="number"
        />
        <button
          disabled={loading || !sdkReady}
          onClick={handleDonate}
          type="button"
        >
          {loading ? "Processing..." : "Donate Now"}
        </button>
      </form>
    </div>
  );
}

export default DonationPage;

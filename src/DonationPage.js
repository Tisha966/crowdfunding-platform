import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './donationPage.css';

const DonationPage = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const sanitizedId = encodeURIComponent(campaignId.trim());
        const res = await axios.get(`http://localhost:5002/api/campaigns/${sanitizedId}`);

        if (res.status === 200) {
          setCampaign(res.data);
        } else {
          setError('Campaign not found');
        }
      } catch (error) {
        console.error('Error fetching campaign details:', error);
        setError('Failed to fetch campaign details');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();

    // Get user info from localStorage if logged in
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setDonorName(user.name || '');
      setDonorEmail(user.email || '');
    }
  }, [campaignId]);

  const handleDonation = async (e) => {
    e.preventDefault();

    if (!donorName || !donorEmail || !amount) {
      setMessage('Please fill in all fields');
      return;
    }

    if (Number(amount) <= 0) {
      setMessage('Please enter a valid donation amount greater than zero.');
      return;
    }

    // Check if user is logged in (just by presence of user in localStorage)
    const userString = localStorage.getItem('user');
    if (!userString) {
      alert('You must be logged in to donate');
      navigate('/login');
      return;
    }

    // Send donation data WITHOUT userId, only donorEmail and donorName
    const donationData = {
      campaignId: campaignId.trim(),
      amount: Number(amount),
      donorEmail: donorEmail,
      donorName: donorName,
    };

    try {
      const response = await axios.post('http://localhost:5002/api/donations', donationData);

      if (response.status === 201) {
        setMessage('Donation successful! 🎉');
        setTimeout(() => {
          navigate('/explore', { state: { message: 'Donation successful! 🎉' } });
        }, 2000);
      } else {
        setMessage('Failed to donate. Please try again.');
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      setMessage('Error: Unable to process donation.');
    }
  };

  if (loading) return <p>Loading campaign details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="donation-page">
      <h1>{campaign?.title}</h1>
      <p><strong>Amount Raised:</strong> ₹{campaign?.amountRaised}</p>

      <img
        src={`http://localhost:5002/${campaign?.imagePath}`}
        alt={campaign?.title}
        className="campaign-image"
      />

      <p>{campaign?.description}</p>

      <form onSubmit={handleDonation}>
        <input
          type="text"
          placeholder="Your Name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Donate</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default DonationPage;

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

    // Prefill donor info from logged-in user in localStorage
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

    // Get user from localStorage and parse JSON
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (!user) {
      alert("You must be logged in to donate");
      navigate('/login');
      return;
    }

    // Prepare donation data dynamically with current logged-in user id
    const donationData = {
      userId:"683494fd9a0e6657e6c9333f",               // Dynamic per logged-in user
      campaignId: campaignId.trim(),
      amount: Number(amount),
      donor: donorEmail,
      name: donorName
    };

    try {
      console.log('Sending donation data:', donationData);
      console.log('User from localStorage:', user);
      console.log('user._id:', user?._id);
      console.log('Donation data to send:', donationData);

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
        style={{ 
          width: '50%',
          maxHeight: '300px',
          display: 'block',
          margin: '0 auto',
          borderRadius: '10px'
        }} 
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

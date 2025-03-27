import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';  
import './explore.css';

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const message = location.state?.message;   // ✅ Get the donation success message
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch campaigns from backend
  const fetchCampaigns = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/campaigns');
      console.log('Fetched campaigns:', res.data);
      setCampaigns(res.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Refetch campaigns on page load & after donation
  useEffect(() => {
    fetchCampaigns();      // Fetch on page load

    // ✅ Refetch if donation message is received
    if (message) {
      fetchCampaigns();
    }
  }, [message]);            // ✅ Dependency on message

  // ✅ Navigate to the Donation page
  const handleDonate = (campaignId) => {
    const cleanId = campaignId.trim();  
    navigate(`/donate/${cleanId}`);
  };

  return (
    <div className="explore-container">
      <h1>Explore Campaigns</h1>

      {message && <p className="success-message">{message}</p>}  {/* ✅ Display donation message */}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="campaign-grid">
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <div key={campaign._id} className="campaign-card">
                <img
                  src={`http://localhost:5001/${campaign.imagePath}`} 
                  alt={campaign.title} 
                  className="campaign-image"
                />
                <h2>{campaign.title}</h2>
                <p>{campaign.description}</p>

                {/* ✅ Display dynamically updated amountRaised */}
                <p style={{ color: "teal" }}>₹{campaign.amountRaised} raised</p>
                <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>{campaign.daysLeft} Days Left</p>

                <button onClick={() => handleDonate(campaign._id)}>Donate</button>
              </div>
            ))
          ) : (
            <p>No campaigns available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;

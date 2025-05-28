import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';  
import './explore.css';

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Donation success message, passed from previous page
  const message = location.state?.message; 

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch campaigns from backend API
  const fetchCampaigns = async () => {
    try {
      const res = await axios.get('http://localhost:5002/api/campaigns');
      console.log('Fetched campaigns:', res.data);
      setCampaigns(res.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch campaigns on component mount and when 'message' changes
  useEffect(() => {
    fetchCampaigns();

    if (message) {
      fetchCampaigns();
    }
  }, [message]);

  // Navigate to donation page for a selected campaign
  const handleDonate = (campaignId) => {
    const cleanId = campaignId.trim();
    navigate(`/donate/${cleanId}`);
  };

  return (
    <div className="explore-container">
      <h1>Explore Campaigns</h1>

      {/* Show donation success message if exists */}
      {message && <p className="success-message">{message}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="campaign-grid">
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => {
              // Debug: log the image path to verify it's valid
              console.log('Campaign image path:', campaign.imagePath);

              // Construct image URL:
              // Assumes your backend serves static files under '/uploads'
              // Adjust if needed based on how your backend serves images
              const imageUrl = `http://localhost:5001/uploads/${campaign.imagePath}`;

              return (
                <div key={campaign._id} className="campaign-card">
                  <img
                    src={imageUrl}
                    alt={campaign.title}
                    className="campaign-image"
                    onError={(e) => {
                      // Optional: Fallback image if loading fails
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                  <h2>{campaign.title}</h2>
                  <p>{campaign.description}</p>
                  <p style={{ color: "teal" }}>₹{campaign.amountRaised} raised</p>
                  <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>{campaign.daysLeft} Days Left</p>
                  <button onClick={() => handleDonate(campaign._id)}>Donate</button>
                </div>
              );
            })
          ) : (
            <p>No campaigns available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;

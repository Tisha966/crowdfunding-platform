import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import { useLocation } from 'react-router-dom';
import './explore.css';

const Explore = () => {
  const location = useLocation();
  const message = location.state?.message;
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/campaigns');
        console.log('Fetched campaigns:', res.data);
        setCampaigns(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleDonate = (campaignId) => {
    const cleanId = campaignId.trim();  // ✅ Trim the ID to avoid newline issues
    navigate(`/donate/${cleanId}`);
  };

  return (
    <div className="explore-container">
      <h1>Explore Campaigns</h1>

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
                <p style={{ color: "teal" }}>₹{campaign.numSupporters} raised</p>
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

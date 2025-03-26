import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './explore.css';

const Explore = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/campaigns');  // Fetch all campaigns
        setCampaigns(res.data);  // Store campaigns in state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleDonate = async (campaignId) => {
    try {
      const donationData = {
        amount: 100,                
        campaignId: campaignId,    
        donor: "test@example.com"  
      };

      const response = await axios.post('http://localhost:5001/api/donations', donationData);

      if (response.status === 201) {
        alert('Donation successful!');
        console.log('Donation data:', response.data);
      } else {
        alert(response.data.error || 'Failed to donate');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to donate');
    }
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
                <p>₹{campaign.numSupporters} raised</p>
                <p>{campaign.daysLeft} Days Left</p>
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

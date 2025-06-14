import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './explore.css';

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Check if user is logged in
  const isUserLoggedIn = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token'); // if you use JWT or any auth token
  return userId && token; // both must exist
};

  // Fetch campaigns from backend
  const fetchCampaigns = async () => {
    try {
      const res = await axios.get('http://localhost:5002/api/campaigns');
      setCampaigns(res.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [message]);

  // Handle Donate button click
const handleDonate = (campaignId) => {
  if (!isUserLoggedIn()) {
    alert('You must be logged in to donate!');
    navigate('/login');
    return;
  }

  navigate(`/donate/${campaignId.trim()}`);
};

  // Urgent campaigns (10 days or less)
  const urgentCampaigns = campaigns.filter(c => c.daysLeft <= 10);

  // Search filter
  const filteredCampaigns = campaigns.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore-container">
      <h1 style={{ color: "#f16a38" }}>Explore Campaigns</h1>

      {/* Search bar */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search campaigns"
        />
        <span className="search-icon" aria-hidden="true">&#128269;</span>
      </div>

      {/* Urgent campaigns */}
      {urgentCampaigns.length > 0 && (
        <div className="urgent-ticker">
          <marquee behavior="scroll" direction="left" scrollamount="8">
            {urgentCampaigns.map((c, index) => (
              <span
                key={c._id}
                onClick={() => handleDonate(c._id)}
                style={{
                  cursor: 'pointer',
                  marginRight: index === urgentCampaigns.length - 1 ? '0' : '2rem',
                  textDecoration: 'underline'
                }}
                title={`Donate to ${c.title}`}
              >
                {c.title} - Only {c.daysLeft} day{c.daysLeft > 1 ? 's' : ''} left!
              </span>
            ))}
          </marquee>
        </div>
      )}

      {message && <p className="success-message">{message}</p>}

      {/* Campaign list */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="campaign-grid">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign) => {
              const imageUrl = `http://localhost:5002/${campaign.imagePath.replace(/\\/g, '/')}`;

              return (
                <div key={campaign._id} className="campaign-card">
                  <img
                    src={imageUrl}
                    alt={campaign.title}
                    className="campaign-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/fallback.jpg';
                    }}
                  />
                  <h2>{campaign.title}</h2>
                  <p>{campaign.description}</p>
                  <p style={{ color: "teal" }}>₹{campaign.amountRaised} raised</p>
                  <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>{campaign.daysLeft} Days Left</p>

                  {/* Donate Button with conditional disabling */}
                 <button
  onClick={() => handleDonate(campaign._id)}
  disabled={!isUserLoggedIn()}
  style={{
    backgroundColor: !isUserLoggedIn() ? '#ccc' : '',
    cursor: !isUserLoggedIn() ? 'not-allowed' : 'pointer',
  }}
>
  Donate
</button>

                </div>
              );
            })
          ) : (
            <p>No campaigns found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;

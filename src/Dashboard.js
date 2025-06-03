import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);

  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [donationSearch, setDonationSearch] = useState('');

  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [campaignSearch, setCampaignSearch] = useState('');

  const [loadingCampaigns, setLoadingCampaigns] = useState(true);

  const fetchUserAndDonations = async (uid) => {
    try {
      const userRes = await fetch(`http://localhost:5002/api/auth/user/${uid}`);
      const userData = await userRes.json();
      setUserName(userData.name || 'User');

      const donationRes = await fetch(`http://localhost:5002/api/donations?userId=${uid}`);
      const donationData = await donationRes.json();

      const sortedDonations = Array.isArray(donationData)
        ? donationData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

      setDonations(sortedDonations);
      setFilteredDonations(sortedDonations);
    } catch (err) {
      console.error('Error fetching user or donations:', err);
      setUserName('User');
      setDonations([]);
    }
  };

  const fetchCampaigns = async (uid) => {
    try {
      const res = await fetch(`http://localhost:5002/api/campaigns/byCreator/${uid}`);
      const data = await res.json();
      setCampaigns(data);
      setFilteredCampaigns(data);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setCampaigns([]);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?._id) {
      setUserId(user._id);
      fetchUserAndDonations(user._id);
      fetchCampaigns(user._id);
    }
  }, []);

  useEffect(() => {
    const filtered = donations.filter((d) =>
      d.title?.toLowerCase().includes(donationSearch.toLowerCase())
    );
    setFilteredDonations(filtered);
  }, [donationSearch, donations]);

  useEffect(() => {
    const filtered = campaigns.filter((c) =>
      c.title?.toLowerCase().includes(campaignSearch.toLowerCase())
    );
    setFilteredCampaigns(filtered);
  }, [campaignSearch, campaigns]);

  const totalDonated = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const totalCampaigns = campaigns.length;
  const totalRaised = campaigns.reduce((sum, c) => sum + (c.amountRaised || 0), 0);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome, {userName}</h1>

        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Donations</h3>
            <p>₹ {donations.length}</p>
          </div>
          <div className="summary-card">
            <h3>Total Amount Donated</h3>
            <p>₹ {totalDonated.toLocaleString()}</p>
          </div>
          <div className="summary-card">
            <h3>My Campaigns</h3>
            <p>{totalCampaigns}</p>
          </div>
          <div className="summary-card">
            <h3>Total Raised</h3>
            <p>₹ {totalRaised.toLocaleString()}</p>
          </div>
        </div>

        {/* My Contributions Section */}
        <div className="section-header">
          <h2 className="donation-heading">My Contributions</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search donations..."
              value={donationSearch}
              onChange={(e) => setDonationSearch(e.target.value)}
            />
          </div>
        </div>

        {filteredDonations.length === 0 ? (
          <p className="no-donations">No donations found.</p>
        ) : (
          <div className="donation-list">
            {filteredDonations.map((donation) => (
              <div className="donation-card" key={donation._id}>
                <h3 className="campaign-name">{donation.title}</h3>
                <p className="donation-amount">₹ {donation.amount}</p>
                {donation.createdAt && (
                  <p className="donation-date">
                    Donated on: {new Date(donation.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* My Campaigns Section */}
        <div className="section-header" style={{ marginTop: '50px' }}>
          <h2 className="fundraiser-heading">My Created Campaigns</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={campaignSearch}
              onChange={(e) => setCampaignSearch(e.target.value)}
            />
          </div>
        </div>

        {loadingCampaigns ? (
          <p>Loading your campaigns...</p>
        ) : filteredCampaigns.length === 0 ? (
          <p className="no-campaigns">No campaigns created yet.</p>
        ) : (
          <div className="campaign-list">
            {filteredCampaigns.map((campaign) => (
              <div className="campaign-card" key={campaign._id}>
                <h3 className="campaign-title">{campaign.title}</h3>
                <p>{campaign.description}</p>
                <p>Days Left: {campaign.daysLeft}</p>
                <p>Supporters: {campaign.supporters}</p>
                <p>Amount Raised: ₹ {campaign.amountRaised}</p>
                <div className="button-group">
                  <button onClick={() => alert(`Viewing ${campaign.title}`)}>View Details</button>
                  <button onClick={() => alert(`Editing ${campaign.title}`)}>Edit Campaign</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

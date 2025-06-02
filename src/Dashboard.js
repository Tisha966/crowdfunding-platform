import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [donationSearch, setDonationSearch] = useState('');

  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [campaignSearch, setCampaignSearch] = useState('');

  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);

  const fetchUserAndDonations = async (uid) => {
    try {
      const userResponse = await fetch(`http://localhost:5002/api/auth/user/${uid}`);
      const userData = await userResponse.json();
      setUserName(userData.name || 'User');

      const donationResponse = await fetch(`http://localhost:5002/api/donations?userId=${uid}`);
      const donationData = await donationResponse.json();

      const sorted = Array.isArray(donationData)
        ? donationData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

      setDonations(sorted);
      setFilteredDonations(sorted);
    } catch (error) {
      console.error('Error fetching user or donations:', error);
      setUserName('User');
      setDonations([]);
    }
  };

  const fetchCampaignsByCreator = async (uid) => {
    try {
      const res = await fetch(`http://localhost:5002/api/campaigns/byCreator/${uid}`);
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data);
        setFilteredCampaigns(data);
      } else {
        setCampaigns([]);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setCampaigns([]);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user = JSON.parse(userString);
    if (!user || !user._id) return;

    setUserId(user._id);
    fetchUserAndDonations(user._id);
    fetchCampaignsByCreator(user._id);
  }, []);

  // Search filter logic
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

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {userName}</h1>

      <div className="section-header">
        <h2 className="donation-heading">My Contributions</h2>
        <div className="search-box">
          <FaSearch className="search-icon" />
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

      <div className="section-header">
        <h2 className="fundraiser-heading">My Created Campaigns</h2>
        <div className="search-box">
          <FaSearch className="search-icon" />
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

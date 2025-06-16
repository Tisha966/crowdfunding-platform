import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { FaHandsHelping, FaPlusCircle, FaCog } from 'react-icons/fa';


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

  const contributionsRef = useRef(null);
  const campaignsRef = useRef(null);

  const scrollToContributions = () => {
    contributionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCampaigns = () => {
    campaignsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?._id) {
      setUserId(user._id);
      fetchUserAndDonations(user._id);
      fetchCampaigns(user._id);
    }
  }, []);

  const fetchUserAndDonations = async (uid) => {
    try {
      const userRes = await fetch(`http://localhost:5002/api/auth/user/${uid}`);
      const userData = await userRes.json();
      setUserName(userData.name || 'User');

      const donationRes = await fetch(`http://localhost:5002/api/donations?userId=${uid}`);
      const donationData = await donationRes.json();
      const sorted = Array.isArray(donationData)
        ? donationData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];
      setDonations(sorted);
      setFilteredDonations(sorted);
    } catch (err) {
      console.error('Error fetching user or donations:', err);
    }
  };

  const fetchCampaigns = async (uid) => {
    try {
      const res = await fetch(`http://localhost:5002/api/campaigns/byCreator/${uid}`);
      const data = await res.json();
      const safeData = Array.isArray(data) ? data : [];
      setCampaigns(safeData);
      setFilteredCampaigns(safeData);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  useEffect(() => {
    setFilteredDonations(
      donations.filter((d) => d.title?.toLowerCase().includes(donationSearch.toLowerCase()))
    );
  }, [donationSearch, donations]);

  useEffect(() => {
    setFilteredCampaigns(
      campaigns.filter((c) => c.title?.toLowerCase().includes(campaignSearch.toLowerCase()))
    );
  }, [campaignSearch, campaigns]);

  return (
    <div className="dashboard-layout">
     <aside className="sidebar">
  <h2 className="sidebar-title">Dashboard</h2>
  <ul>
    <li>
      <Link to="/campaigndetails/:id" className="sidebar-btn">
        <FaPlusCircle className="sidebar-icon" />
        Raise Fund Campaign
      </Link>
    </li>
    <li>
      <Link to="/explore" className="sidebar-btn">
        <FaHandsHelping className="sidebar-icon" />
        Donate to Campaign
      </Link>
    </li>
    <li>
      <Link to="/settings" className="sidebar-btn">
        <FaCog className="sidebar-icon" />
        Settings
      </Link>
    </li>
  </ul>
</aside>

      <div className="dashboard-wrapper">
  <h2 style={{
  fontSize: '2.2rem',
  fontWeight: '700',
  color: '#4b5563', // Cool gray tone
  marginBottom: '2rem',
  borderBottom: '2px solid #9ca3af', // Soft gray underline
  paddingBottom: '0.6rem',
  fontFamily: `'Poppins', 'Segoe UI', sans-serif`,
  letterSpacing: '0.7px',
  textAlign: 'center',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)', // subtle shadow for depth
  textTransform: 'capitalize'
}}>
  Welcome, {userName}!
</h2>


      

        <div ref={contributionsRef} className="section-header">
    <h2 style={{
  fontSize: '2rem',
  fontWeight: '700',
  color: '#0d9488', // Teal shade
  marginBottom: '1.5rem',
  borderBottom: '2px solid #a7f3d0', // light teal
  paddingBottom: '0.5rem',
  fontFamily: `'Poppins', 'Segoe UI', sans-serif`,
  letterSpacing: '0.5px',
  textAlign: 'center'
}}>
  My Contributions
</h2>


          <input
            type="text"
            placeholder="Search donations..."
            value={donationSearch}
            onChange={(e) => setDonationSearch(e.target.value)}
          />
        </div>

        {filteredDonations.length === 0 ? (
          <p className="no-donations">No donations found.</p>
        ) : (
          <div className="donation-list">
            {filteredDonations.map((d) => (
              <div className="donation-card" key={d._id}>
                <h3>{d.title}</h3>
                <p>₹ {d.amount}</p>
                <p>{new Date(d.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}

        <div ref={campaignsRef} className="section-header" style={{ marginTop: '40px' }}>
             <h2 style={{
  fontSize: '2rem',
  fontWeight: '700',
  color: '#0d9488', // Teal shade
  marginBottom: '1.5rem',
  borderBottom: '2px solid #a7f3d0', // light teal
  paddingBottom: '0.5rem',
  fontFamily: `'Poppins', 'Segoe UI', sans-serif`,
  letterSpacing: '0.5px',
  textAlign: 'center'
}}>
  My Created Campaigns
</h2>

          <input
            type="text"
            placeholder="Search campaigns..."
            value={campaignSearch}
            onChange={(e) => setCampaignSearch(e.target.value)}
          />
        </div>

        {loadingCampaigns ? (
          <p>Loading campaigns...</p>
        ) : filteredCampaigns.length === 0 ? (
          <p className="no-campaigns">No campaigns created yet.</p>
        ) : (
          <div className="campaign-list">
            {filteredCampaigns.map((c) => (
              <div className="campaign-card" key={c._id}>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <p>Days Left: {c.daysLeft}</p>
                <p>Supporters: {c.supporters}</p>
             <p>Amount Raised: ₹ {c.amountRaised.toLocaleString('en-IN')}</p>


              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState, useMemo } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
// Removed import of react-tooltip since we use custom tooltip now
// import { Tooltip } from 'react-tooltip';
// import 'react-tooltip/dist/react-tooltip.css';

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

  // Tooltip state for custom tooltip
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

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
      donations.filter((d) =>
        d.title?.toLowerCase().includes(donationSearch.toLowerCase())
      )
    );
  }, [donationSearch, donations]);

  useEffect(() => {
    setFilteredCampaigns(
      campaigns.filter((c) =>
        c.title?.toLowerCase().includes(campaignSearch.toLowerCase())
      )
    );
  }, [campaignSearch, campaigns]);

  const totalDonated = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const totalCampaigns = campaigns.length;
  const totalRaised = campaigns.reduce((sum, c) => sum + (c.amountRaised || 0), 0);

  const donationGraphData = useMemo(() => {
    const donationCounts = {};
    donations.forEach((d) => {
      if (!d.createdAt) return;
      const dateObj = new Date(d.createdAt);
      if (isNaN(dateObj.getTime())) return;
      const date = dateObj.toISOString().split('T')[0];
      donationCounts[date] = (donationCounts[date] || 0) + 1;
    });

    const campaignCounts = {};
    campaigns.forEach((c) => {
      if (!c.createdAt) return;
      const dateObj = new Date(c.createdAt);
      if (isNaN(dateObj.getTime())) return;
      const date = dateObj.toISOString().split('T')[0];
      campaignCounts[date] = (campaignCounts[date] || 0) + 1;
    });

    const allDates = new Set([...Object.keys(donationCounts), ...Object.keys(campaignCounts)]);

    if (allDates.size === 0) {
      const today = new Date();
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const date = d.toISOString().split('T')[0];
        return {
          date,
          donationCount: i % 3,
          campaignCount: (i + 1) % 2,
          count: (i % 3) + ((i + 1) % 2),
        };
      });
    }

    return Array.from(allDates).map((date) => ({
      date,
      donationCount: donationCounts[date] || 0,
      campaignCount: campaignCounts[date] || 0,
      count: (donationCounts[date] || 0) + (campaignCounts[date] || 0),
    }));
  }, [donations, campaigns]);

  // Custom tooltip handlers
  const handleMouseOver = (event, val) => {
    if (val && val.date) {
      setTooltipContent(
        `${val.donationCount} donation${val.donationCount !== 1 ? 's' : ''} & ${val.campaignCount} campaign${val.campaignCount !== 1 ? 's' : ''} on ${new Date(val.date).toLocaleDateString()}`
      );
      setTooltipPos({ x: event.clientX, y: event.clientY });
      setTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <h1> Welcome, {userName} ! </h1>

        {/* USER ACTIVITY GRAPH */}
        <div className="hero-section">
          <div className="hero-graph">
            <h3>My Activity Graph</h3>
            <CalendarHeatmap
              startDate={new Date(new Date().getFullYear(), 0, 1)}
              endDate={new Date(new Date().getFullYear(), 11, 31)}
              values={donationGraphData}
              classForValue={(val) => {
                if (!val || val.count === 0) return 'color-empty';
                if (val.count >= 8) return 'color-github-4';
                if (val.count >= 5) return 'color-github-3';
                if (val.count >= 3) return 'color-github-2';
                return 'color-github-1';
              }}
              showWeekdayLabels
              onMouseOver={(event, val) => handleMouseOver(event, val)}
              onMouseLeave={handleMouseLeave}
            />
            {tooltipVisible && (
              <div
                style={{
                  position: 'fixed',
                  top: tooltipPos.y + 10,
                  left: tooltipPos.x + 10,
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  pointerEvents: 'none',
                  zIndex: 9999,
                  whiteSpace: 'nowrap',
                  fontSize: '0.85rem',
                }}
              >
                {tooltipContent}
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="summary-cards">
          <div className="summary-card"><h3>Total Donations</h3><p>{donations.length}</p></div>
          <div className="summary-card"><h3>Total Amount Donated</h3><p>₹ {totalDonated.toLocaleString()}</p></div>
          <div className="summary-card"><h3>My Campaigns</h3><p>{totalCampaigns}</p></div>
          <div className="summary-card"><h3>Total Raised</h3><p>₹ {totalRaised.toLocaleString()}</p></div>
        </div>

        {/* DONATION LIST */}
        <div className="section-header">
          <h2>My Contributions</h2>
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

        {/* CAMPAIGN LIST */}
        <div className="section-header" style={{ marginTop: '40px' }}>
          <h2>My Created Campaigns</h2>
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
                <p>Amount Raised: ₹ {c.amountRaised}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

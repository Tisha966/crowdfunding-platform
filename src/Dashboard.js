import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [donations, setDonations] = useState([]);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);

  // Fetch user info and donations
  const fetchUserAndDonations = async (uid) => {
    try {
      // Fetch username
      const userResponse = await fetch(`http://localhost:5002/api/auth/user/${uid}`);
      const userData = await userResponse.json();
      setUserName(userData.name || 'User');

      // Fetch donations for this user
      const donationResponse = await fetch(`http://localhost:5002/api/donations?userId=${uid}`);
      const donationData = await donationResponse.json();
      setDonations(Array.isArray(donationData) ? donationData : []);
    } catch (error) {
      console.error('Error fetching user or donations:', error);
      setUserName('User');
      setDonations([]);
    }
  };

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user = JSON.parse(userString);
    if (!user || !user._id) {
      console.error('User not logged in');
      return;
    }

    setUserId(user._id);
    fetchUserAndDonations(user._id);
  }, []);

  // Optional: function to manually refresh donations (call this after donation success)
  const refreshDonations = () => {
    if (userId) {
      fetchUserAndDonations(userId);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {userName}</h1>
      <h2 className="donation-heading">Your Contributions</h2>

      {donations.length === 0 ? (
        <p className="no-donations">No donations found.</p>
      ) : (
        <div className="donation-list">
          {donations.map((donation) => (
            <div className="donation-card" key={donation._id || donation.id}>
              <h3 className="campaign-name">{donation.title}</h3>
              <p className="donation-amount">₹ {donation.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [donations, setDonations] = useState([]);
  const [userName, setUserName] = useState('');
  const userId = '683494fd9a0e6657e6c9333f'; // your actual user ID

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`http://localhost:5002/api/auth/user/${userId}`);
        const data = await response.json();
        setUserName(data.name || 'User');  // fallback if no name
      } catch (err) {
        console.error('Error fetching user name:', err);
        setUserName('User');
      }
    };

    const fetchDonations = async () => {
      try {
        const response = await fetch(`http://localhost:5002/api/donations?userId=${userId}`);
        const data = await response.json();
        setDonations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching donations:', err);
        setDonations([]);
      }
    };

    fetchUserName();
    fetchDonations();
    
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {userName}</h1>
      <h2 className="donation-heading">Your Contributions</h2>
      {donations.length === 0 ? (
        <p className="no-donations">No donations found.</p>
      ) : (
        <div className="donation-list">
          {donations.map((donation, index) => (
            <div className="donation-card" key={index}>
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

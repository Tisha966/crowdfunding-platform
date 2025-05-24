import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    fetch(`http://localhost:5002/api/user/dashboard?userId=${user._id}`)
      .then(res => res.json())
      .then(data => setDonations(data.donations))
      .catch(err => console.log('Error:', err));
  }, []);

  return (
    <div>
      <h2>Your Donations</h2>
      {donations.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
        <ul>
          {donations.map((donation) => (
            <li key={donation._id}>
              Donated ₹{donation.amount} to Campaign ID: {donation.campaignId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;

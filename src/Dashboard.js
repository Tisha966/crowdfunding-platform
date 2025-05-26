import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    try {
      const user = storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;

      if (!user) return;

      fetch(`http://localhost:5002/api/donations?userId=${user._id}`)
        .then(res => res.json())
        .then(data => {
          console.log('Fetched donations:', data);
          setDonations(data.donations || []); // <-- FIX HERE
        })
        .catch(err => console.log('Error:', err));
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
    }
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

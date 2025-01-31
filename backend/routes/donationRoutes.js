const express = require('express');
const router = express.Router();
const Donation = require('../models/donation'); // Your donation model

// Donation route
app.post('/donate', async (req, res) => {
  console.log('Received donation request:', req.body); // Debugging: Log received request

  const { donorName, donationAmount } = req.body;

  if (!donorName || !donationAmount) {
    console.log('Invalid donation:', req.body);
    return res.status(400).json({ message: 'Invalid donation' });
  }

  try {
    // Save donation to the database
    const donation = new Donation({ name: donorName, amount: donationAmount });
    await donation.save();
    
    console.log('Donation saved:', donation); // Debugging: Log the saved donation
    res.status(200).json({ message: 'Donation successful', donation });
  } catch (error) {
    console.error('Database Save Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

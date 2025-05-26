const express = require('express');
const router = express.Router();
const Donation = require('../models/donationModel'); // Import your Donation model
const authenticateToken = require('../middleware/authenticateToken'); // Optional if you use auth
const mongoose = require('mongoose');

// Route: GET /api/donations?userId=...  (without token authentication)
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log('Fetching donations for userId:', userId);

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const donations = await Donation.find({ userId });
    console.log('Donations found:', donations);

    return res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return res.status(500).json({ message: 'Failed to fetch donations', error: error.message });
  }
});

// Optional: Secure route using token authentication
router.get('/dashboard-secure', authenticateToken, async (req, res) => {
  try {
    
    const userId = req.user._id;
    console.log('Fetching donations for authenticated userId:', userId);

    const donations = await Donation.find({ userId });
    return res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching secure donations:', error);
    return res.status(500).json({ message: 'Failed to fetch donations', error: error.message });
  }
});

module.exports = router;

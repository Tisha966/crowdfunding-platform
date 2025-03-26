const express = require('express');
const Donation = require('../models/donation');
const Campaign = require('../models/campaignModel');

const router = express.Router();

// POST request to handle donations
router.post('/', async (req, res) => {
  try {
    console.log('🔹 Donation API hit:', req.body);

    const { name, email, amount, campaign } = req.body;
    if (!name || !email || !amount || !campaign) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if campaign exists
    const campaignExists = await Campaign.findOne({ title: campaign });
    if (!campaignExists) {
      console.log('❌ Campaign not found:', campaign);
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Save donation
    const newDonation = new Donation({
      name,
      email,
      amount,
      campaign: campaignExists._id, // Store campaign reference
    });

    await newDonation.save();
    res.status(201).json({ message: 'Donation successful!', donation: newDonation });
  } catch (err) {
    console.error('❌ Error processing donation:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

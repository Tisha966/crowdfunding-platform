const express = require('express');
const Donation = require('../models/donation');
const Campaign = require('../models/campaign'); // Import Campaign model

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, amount, campaign } = req.body;

  // Validate input
  if (!name || !email || typeof amount !== 'number' || amount <= 0 || !campaign) {
    return res.status(400).json({ error: 'Invalid donation data' });
  }

  try {
    // Check if the campaign exists
    const campaignExists = await Campaign.findById(campaign);
    if (!campaignExists) {
      return res.status(400).json({ error: 'Campaign not found' });
    }

    // Create new donation with campaign reference
    const newDonation = new Donation({ name, email, amount, campaign });
    await newDonation.save();

    // Fetch donation with populated campaign details
    const donationWithCampaign = await Donation.findById(newDonation._id).populate('campaign');

    res.status(201).json({
      message: 'Donation successful!',
      donation: donationWithCampaign, // Now includes campaign details
    });
  } catch (err) {
    console.error('Error saving donation:', err);
    res.status(500).json({ error: 'Server error while saving donation' });
  }
});

module.exports = router;

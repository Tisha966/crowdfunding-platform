const express = require('express');
const router = express.Router();
const Donation = require('../models/donationModel');
const Campaign = require('../models/campaignModel');

// ✅ POST: Save donation and update campaign
router.post('/', async (req, res) => {
  const { campaignId, donor, name, amount } = req.body;

  if (!campaignId || !donor || !name || !amount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Save donation
    const newDonation = new Donation({ campaignId, donor, name, amount });
    await newDonation.save();

    // Update campaign with new amount raised and supporters
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Update amount and supporters dynamically
    campaign.amountRaised += Number(amount);
    campaign.supporters += 1;
    await campaign.save();

    res.status(201).json({ message: 'Donation successful', donation: newDonation });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

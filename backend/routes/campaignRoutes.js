const express = require('express');
const router = express.Router();
const Campaign = require('./campaignModel');

// Create a new campaign
router.post('/create', async (req, res) => {
  const { title, description, image, daysLeft, votingLimit } = req.body;

  try {
    const newCampaign = new Campaign({
      title,
      description,
      image,
      daysLeft,
      votingLimit
    });

    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully!', campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

// Get all campaigns (for the Explore page)
router.get('/all', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

module.exports = router;

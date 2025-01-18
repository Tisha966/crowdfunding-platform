const express = require('express');
const Campaign = require('../models/campaignModel'); // Import the campaign model
const router = express.Router();

// POST request to create a new campaign
router.post('/create', async (req, res) => {
  try {
    const { title, description, image, daysLeft, numSupporters } = req.body;

    // Ensure required fields are provided
    if (!title || !description || !image || !daysLeft) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Create a new campaign object
    const newCampaign = new Campaign({
      title,
      description,
      image,
      daysLeft,
      numSupporters: numSupporters || 0,  // Default numSupporters to 0 if not provided
    });

    // Save the campaign to the database
    await newCampaign.save();

    res.status(201).json({
      message: 'Campaign created successfully',
      campaign: newCampaign,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

// GET request to fetch all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns); // Send all campaigns
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

module.exports = router;

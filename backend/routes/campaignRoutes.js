const express = require('express');
const Campaign = require('../models/CampaignModel'); // Adjust the path
const router = express.Router();

// Create Campaign Route
router.post('/', async (req, res) => {
  const { title, description, targetAmount, creator } = req.body;

  const newCampaign = new Campaign({
    title,
    description,
    targetAmount,
    creator,
  });

  try {
    const savedCampaign = await newCampaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign' });
  }
});

// Get All Campaigns Route
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns' });
  }
});

module.exports = router;

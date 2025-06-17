const express = require('express');
const multer = require('multer');
const Campaign = require('../models/campaignModel');
const router = express.Router();
const mongoose = require('mongoose');

// ✅ Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// ✅ POST: Create new campaign
router.post('/create', upload.single('image'), async (req, res) => {
  console.log('Received form data:', req.body);
  console.log('Uploaded file:', req.file);

  if (!req.file) {
    return res.status(400).json({ error: 'Image upload failed' });
  }

  try {
    const { title, description, daysLeft, numSupporters, creatorId } = req.body;

    if (!title || !description || !daysLeft || !numSupporters || !creatorId) {
      return res.status(400).json({ error: 'Missing required fields including creatorId' });
    }

    if (!mongoose.Types.ObjectId.isValid(creatorId)) {
      return res.status(400).json({ error: 'Invalid creatorId' });
    }

    const imagePath = req.file.path;

    const newCampaign = new Campaign({
      title,
      description,
      imagePath,
      daysLeft: parseInt(daysLeft),
      supporters: parseInt(numSupporters),
      amountRaised: 0,
      creatorId,
    });

    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });

  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ GET: Campaigns by creator ID
router.get('/byCreator/:creatorId', async (req, res) => {
  try {
    const campaigns = await Campaign.find({ creatorId: req.params.creatorId });
    if (!campaigns || campaigns.length === 0) {
      return res.status(404).json({ message: 'No campaigns found for this creator' });
    }
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns by creator:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET: All campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find({});
    if (!campaigns || campaigns.length === 0) {
      return res.status(404).json({ message: 'No campaigns available' });
    }
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ GET: Single campaign by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id.trim();
  console.log('Received ID:', id);

  try {
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const multer = require('multer');
const Campaign = require('../models/campaignModel');
const router = express.Router();

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

router.post('/create', upload.single('image'), async (req, res) => {
  console.log('Received form data:', req.body);
  console.log('Uploaded file:', req.file);

  if (!req.file) {
    return res.status(400).json({ error: 'Image upload failed' });
  }

  try {
    const { title, description, daysLeft, numSupporters } = req.body;

    // Ensure the request has all necessary fields
    if (!title || !description || !daysLeft || !numSupporters) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const imagePath = req.file.path;

    const newCampaign = new Campaign({
      title,
      description,
      imagePath,
      daysLeft: parseInt(daysLeft),
      numSupporters: parseInt(numSupporters)
    });

    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });

  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

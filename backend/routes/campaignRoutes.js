const express = require('express');
const multer = require('multer');
const Campaign = require('../models/campaignModel');
const Donation = require('../models/donationModel');  // Import Donation model
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


// ✅ POST: Create a new campaign
router.post('/create', upload.single('image'), async (req, res) => {
  console.log('Received form data:', req.body);
  console.log('Uploaded file:', req.file);

  if (!req.file) {
    return res.status(400).json({ error: 'Image upload failed' });
  }

  try {
    const { title, description, daysLeft, numSupporters } = req.body;

    if (!title || !description || !daysLeft || !numSupporters) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const imagePath = req.file.path;

    const newCampaign = new Campaign({
      title,
      description,
      imagePath,
      daysLeft: parseInt(daysLeft),
      supporters: parseInt(numSupporters),
      amountRaised: 0   // ✅ Initialize amount raised to 0
    });

    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });

  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ✅ GET: Fetch all campaigns
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


// ✅ GET: Fetch a single campaign by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id.trim();  // ✅ Trim whitespace
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



// ✅ POST: Add donation and update campaign
router.post('/donate', async (req, res) => {
  const { campaignId, donor, name, amount, userId } = req.body; // <-- include userId

  if (!campaignId || !donor || !name || !amount || !userId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newDonation = new Donation({
      campaignId,
      donor,
      name,
      amount: Number(amount),
      userId                     // <-- save the userId
    });

    await newDonation.save();

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    campaign.amountRaised += Number(amount);
    campaign.supporters += 1;
    await campaign.save();

    res.status(201).json({
      message: 'Donation successful',
      donation: newDonation,
      updatedCampaign: campaign
    });

  } catch (error) {
    console.error('Error processing donation:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
// ✅ GET: Fetch donations made by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.params.userId }).populate('campaignId');
    res.status(200).json(donations);
  } catch (err) {
    console.error('Error fetching user donations:', err);
    res.status(500).json({ error: 'Failed to fetch user donations' });
  }
});


module.exports = router;

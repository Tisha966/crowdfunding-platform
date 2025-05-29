const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Donation = require('../models/donationModel');
const Campaign = require('../models/campaignModel');
const User = require('../models/userModel'); // Adjust if needed

// POST: Create a donation and update the campaign's amountRaised
router.post('/', async (req, res) => {
  try {
    console.log('Donation request body:', req.body);

    const { campaignId, amount, donorEmail, donorName } = req.body;

    // Validate required fields
    if (!campaignId || !amount || !donorEmail || !donorName) {
      return res.status(400).json({ message: 'Missing required donation fields' });
    }

    // Validate campaignId format
    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({ message: 'Invalid campaignId' });
    }

    // Validate amount is a positive number
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Donation amount must be a positive number' });
    }

    // Find the user by donorEmail
    const user = await User.findOne({ email: donorEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found with provided donor email' });
    }

    // Verify campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Create new donation
    const donation = new Donation({
      userId: user._id,
      campaignId,
      amount,
      donor: donorEmail,
      name: donorName,
    });

    await donation.save();

    // Update campaign amountRaised atomically
    campaign.amountRaised += amount;
    await campaign.save();

    return res.status(201).json({ message: 'Donation successful', donation });
  } catch (error) {
    console.error('Donation processing error:', error);
    return res.status(500).json({ message: 'Donation failed', error: error.message });
  }
});

// GET: Fetch donations by donor email or userId
router.get('/', async (req, res) => {
  const { donor, userId } = req.query;

  if (!donor && !userId) {
    return res.status(400).json({ error: 'Donor email or userId is required' });
  }

  try {
    const filter = {};
    if (userId) {
      filter.userId = userId;
    } else {
      filter.donor = donor;
    }

    const donations = await Donation.find(filter).populate('campaignId', 'title');

    const formattedDonations = donations.map(donation => ({
      title: donation.campaignId?.title || 'Untitled Campaign',
      amount: donation.amount,
    }));

    return res.status(200).json(formattedDonations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

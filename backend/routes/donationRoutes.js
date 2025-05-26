const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');  // <-- Add this line
const Donation = require('../models/donationModel');
const Campaign = require('../models/campaignModel');

// POST: Save donation and update campaign
router.post('/', async (req, res) => {
  try {
    console.log('Donation request body:', req.body);

    const { userId, campaignId, amount, donor, name } = req.body;

    // Check all required fields present
    if (!userId || !campaignId || !amount || !donor || !name) {
      return res.status(400).json({ message: 'Missing required donation fields' });
    }

    // Validate userId and campaignId are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({ message: 'Invalid campaignId' });
    }

    const donation = new Donation({
      userId,
      campaignId,
      amount,
      donor,
      name,
    });

    await donation.save();

    await Campaign.findByIdAndUpdate(
      campaignId,
      { $inc: { amountRaised: amount } },
      { new: true }
    );

    res.status(201).json(donation);
  } catch (error) {
    console.error('Donation processing error:', error);
    res.status(500).json({ message: 'Donation failed', error: error.message });
  }
});

// ✅ GET: Fetch all donations made by a specific donor
router.get('/', async (req, res) => {
  const { donor, userId } = req.query;

  if (!donor && !userId) {
    return res.status(400).json({ error: 'Donor email or userId is required' });
  }

  try {
    let filter = {};
    if (userId) {
      filter.userId = userId;
    } else if (donor) {
      filter.donor = donor;
    }

    const donations = await Donation.find(filter).populate('campaignId', 'title');

    const formattedDonations = donations.map(donation => ({
      title: donation.campaignId?.title || 'Untitled Campaign',
      amount: donation.amount
    }));

    res.status(200).json(formattedDonations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;

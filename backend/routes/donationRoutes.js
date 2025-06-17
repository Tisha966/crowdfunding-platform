const express = require('express');
const router = express.Router();
const Donation = require('../models/donationModel');
const Campaign = require('../models/campaignModel');
const User = require('../models/userModel');

// POST: Add donation and update campaign
router.post('/donate', async (req, res) => {
  const { campaignId, donorEmail, donorName, amount, userId, orderId } = req.body;

  if (!campaignId || !donorEmail || !donorName || !amount || !userId || !orderId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Prevent duplicate order
    const existing = await Donation.findOne({ orderId });
    if (existing) {
      return res.status(200).json({ message: 'Donation already recorded' });
    }

    const donation = new Donation({
      campaignId,
      donor: donorEmail,
      name: donorName,
      amount: Number(amount),
      userId,
      orderId
    });

    await donation.save();

    const campaign = await Campaign.findById(campaignId);
    if (campaign) {
      campaign.amountRaised += Number(amount);
      campaign.supporters += 1;
      await campaign.save();
    }

    res.status(201).json({ message: 'Donation recorded', donation });
  } catch (err) {
    console.error('Error recording donation:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Donations made by specific user (userId)
router.get('/user/:userId', async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.params.userId }).populate('campaignId');
    res.status(200).json(donations);
  } catch (err) {
    console.error('Error fetching user donations:', err);
    res.status(500).json({ error: 'Failed to fetch user donations' });
  }
});

// GET: Donations by userId or donor email
router.get('/', async (req, res) => {
  const { userId, donor } = req.query;

  if (!userId && !donor) {
    return res.status(400).json({ error: 'Missing userId or donor email' });
  }

  try {
    const filter = {};
    if (userId) filter.userId = userId;
    if (donor) filter.donor = donor;

    const donations = await Donation.find(filter)
      .populate('campaignId', 'title')
      .sort({ createdAt: -1 });

    const formatted = donations.map((d) => ({
      _id: d._id,
      title: d.campaignId?.title || 'Untitled Campaign',
      amount: d.amount,
      createdAt: d.createdAt,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Donation GET error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Donation = require('../models/donationModel');
const Campaign = require('../models/campaignModel');
const User = require('../models/userModel');

// ✅ POST: Create a donation (typically called from payment callback or testing)
router.post('/', async (req, res) => {
  try {
    const { campaignId, amount, donorEmail, donorName } = req.body;

    if (!campaignId || !amount || !donorEmail || !donorName) {
      return res.status(400).json({ message: 'Missing donation details' });
    }

    const user = await User.findOne({ email: donorEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    const donation = new Donation({
      userId: user._id,
      campaignId,
      amount,
      donor: donorEmail,
      name: donorName,
    });

    await donation.save();

    // Update campaign's total amount raised
    const parsedAmount = parseFloat(amount);
if (isNaN(parsedAmount) || parsedAmount <= 0) {
  return res.status(400).json({ message: 'Invalid donation amount' });
}

campaign.amountRaised += parsedAmount;
campaign.supporters += 1;
await campaign.save();

    
    return res.status(201).json({ message: 'Donation successful', donation });
  } catch (error) {
    console.error('Donation POST error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET: Fetch donations by userId or donor email
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

    return res.status(200).json(formatted);
  } catch (error) {
    console.error('Donation GET error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

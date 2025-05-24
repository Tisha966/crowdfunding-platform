const express = require('express');
const router = express.Router();
const Donation = require('../models/donationModel');
const Campaign = require('../models/campaignModel');

// ✅ POST: Save donation and update campaign
router.post('/', async (req, res) => {
  try {
    const { userId, campaignId, amount, donor, name } = req.body;

    const donation = new Donation({
      userId,      // ✅ Make sure this gets saved
      campaignId,
      amount,
      donor,       // optional: email
      name,        // optional: donor name
    });

    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Donation failed', error });
  }
});


// ✅ GET: Fetch all donations made by a specific donor
router.get('/', async (req, res) => {
  const { donor } = req.query;

  if (!donor) {
    return res.status(400).json({ error: 'Donor email is required' });
  }

  try {
    // Find all donations for the donor
    const donations = await Donation.find({ donor }).populate('campaignId', 'title');
    
    // Format the response with campaign title and donation amount
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

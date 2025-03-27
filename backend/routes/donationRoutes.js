const express = require('express');
const router = express.Router();
const Donation = require('../models/donationModel');
const Campaign = require('../models/campaignModel');

// ✅ POST: Save donation and update campaign
// ✅ POST: Add donation and update campaign amountRaised dynamically
router.post('/donate', async (req, res) => {
  const { campaignId, donor, name, amount } = req.body;

  if (!campaignId || !donor || !name || !amount) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // ✅ Save the donation
    const newDonation = new Donation({
      campaignId,
      donor,
      name,
      amount: Number(amount)
    });

    await newDonation.save();

    // ✅ Find the related campaign
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // ✅ Increment amountRaised and supporters count
    campaign.amountRaised += Number(amount);
    campaign.supporters += 1;

    await campaign.save();

    // ✅ Send updated campaign data
    res.status(201).json({
      message: 'Donation successful',
      donation: newDonation,
      updatedCampaign: campaign   // ✅ Send the updated campaign data
    });

  } catch (error) {
    console.error('Error processing donation:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;

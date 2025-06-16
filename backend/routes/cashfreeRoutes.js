// ✅ routes/cashfreeRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Campaign = require('../models/campaignModel');
const User = require('../models/userModel');
const Donation = require('../models/donationModel');

// ✅ Load Cashfree credentials from environment variables
const APP_ID = process.env.CASHFREE_APP_ID;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;

// ✅ Route to create an order
router.post('/create-order', async (req, res) => {
  const { amount, donorEmail, donorName, campaignId } = req.body;

  // Validate required fields
  if (!amount || !donorEmail || !donorName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const orderId = `order_${Date.now()}`;

  try {
    const response = await axios.post(
      'https://sandbox.cashfree.com/pg/orders',
      {
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: donorEmail.replace(/[^a-zA-Z0-9]/g, ''),
          customer_email: donorEmail,
          customer_name: donorName,
          customer_phone: '9999999999',
        },
        order_meta: {
          return_url: 'http://localhost:3000/thankyou?order_id={order_id}',
        },
      },
      {
        headers: {
          'x-client-id': APP_ID,
          'x-client-secret': SECRET_KEY,
          'Content-Type': 'application/json',
          'x-api-version': '2022-09-01',
        },
      }
    );

    const payment_session_id = response.data.payment_session_id;
    res.status(200).json({ order_id: orderId, payment_session_id });
  } catch (error) {
    console.error('❌ Cashfree Create Order Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create order with Cashfree' });
  }
});

// ✅ Route to verify payment and save donation
router.post('/verify-and-save', async (req, res) => {
  const { order_id, campaignId, userId, donor, name, amount } = req.body;

  // Basic validation
  if (!order_id || !campaignId || !userId || !donor || !name || !amount) {
    return res.status(400).json({ error: 'Missing required donation details' });
  }

  try {
    // ✅ Verify payment from Cashfree API
    const response = await axios.get(
      `https://sandbox.cashfree.com/pg/orders/${order_id}`,
      {
        headers: {
          'x-client-id': APP_ID,
          'x-client-secret': SECRET_KEY,
          'x-api-version': '2022-09-01',
        },
      }
    );

    if (response.data.order_status !== 'PAID') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    // ✅ Save donation record
    const donation = new Donation({ campaignId, userId, donor, name, amount });
    await donation.save();

    // ✅ Update user with contributed campaign
    await User.findByIdAndUpdate(userId, {
      $push: {
        contributedCampaigns: {
          campaignId,
          amount,
          date: new Date(),
        },
      },
    });

    // ✅ Update campaign raised amount
    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { raised: parseFloat(amount) },
    });

    res.status(200).json({ message: '✅ Donation recorded successfully' });
  } catch (err) {
    console.error('❌ Verification/Save Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to verify or save donation' });
  }
});

module.exports = router;

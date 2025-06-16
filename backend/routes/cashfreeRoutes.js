const express = require('express');
const router = express.Router();
const axios = require('axios');
const Campaign = require('../models/campaignModel');
const User = require('../models/userModel');
const Donation = require('../models/donationModel');

const APP_ID = process.env.CASHFREE_APP_ID;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;

// ✅ Create a new order
router.post('/create-order', async (req, res) => {
  const { amount, donorEmail, donorName, campaignId } = req.body;

  if (!amount || !donorEmail || !donorName || !campaignId) {
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
        order_tags: {
          campaignId,
          donorEmail,
          donorName,
          amount: amount.toString(),
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

// ✅ Verify and save donation (prevent duplicates)
router.post('/verify-and-save', async (req, res) => {
  const { order_id } = req.body;

  if (!order_id) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  try {
    // ✅ Check if donation with this order_id already exists
    const existingDonation = await Donation.findOne({ orderId: order_id });
    if (existingDonation) {
      return res.status(200).json({ message: '⚠️ Donation already recorded' });
    }

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

    const order = response.data;
    if (order.order_status !== 'PAID') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    const { order_tags, customer_details } = order;
    const campaignId = order_tags.campaignId;
    const donor = customer_details.customer_email;
    const name = customer_details.customer_name;
    const amount = parseFloat(order_tags.amount);

    const user = await User.findOne({ email: donor });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ✅ Save donation with orderId
    const donation = new Donation({
      campaignId,
      userId: user._id,
      donor,
      name,
      amount,
      orderId: order_id, // ✅ Important to track and prevent duplicates
    });
    await donation.save();

    await User.findByIdAndUpdate(user._id, {
      $push: {
        contributedCampaigns: {
          campaignId,
          amount,
          date: new Date(),
        },
      },
    });

    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { raised: amount },
    });

    res.status(200).json({ message: '✅ Donation recorded successfully' });
  } catch (err) {
    console.error('❌ Verification/Save Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to verify or save donation' });
  }
});

module.exports = router;

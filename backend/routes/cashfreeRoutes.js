const express = require('express');
const axios = require('axios');
const Campaign = require('../models/campaignModel'); // ✅ Required to fetch campaign
const router = express.Router();

const APP_ID = process.env.CASHFREE_APP_ID;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;


// ✅ Create Cashfree Order
router.post('/create-order', async (req, res) => {
  const { amount, donorEmail, donorName, campaignId } = req.body;

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
          return_url: 'http://localhost:3000/thankyou',
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
    console.error('❌ Cashfree Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create order with Cashfree' });
  }
});

// ✅ Get Specific Campaign Details
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
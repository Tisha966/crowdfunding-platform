const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true }, // Reference to the Campaign model
});

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;

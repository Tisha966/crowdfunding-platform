const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;

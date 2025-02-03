const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  // Remove or leave out the message field if you no longer need it
  // message: { type: String, required: false },
});

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;

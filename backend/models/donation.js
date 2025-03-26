const mongoose = require('mongoose');

// Define the donation schema
const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ }, // Basic email validation
  amount: { type: Number, required: true, min: 1 }, // Ensure donation is at least 1
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true,
    validate: {
      validator: function (v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: 'Invalid campaign ID',
    },
  },
}, { timestamps: true }); // Add timestamps for createdAt & updatedAt

// Create and export the Donation model
const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;

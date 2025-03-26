const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
  daysLeft: { type: Number, required: true },
  numSupporters: { type: Number, default: 0 }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
